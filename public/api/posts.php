<?php
/**
 * API de Posts del Blog
 * 
 * GET    /api/posts.php          → Listar todos los posts
 * GET    /api/posts.php?id=X     → Obtener post por ID o slug
 * POST   /api/posts.php          → Crear o actualizar post
 * DELETE /api/posts.php?id=X     → Eliminar post
 */

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

function slugify_for_id($value) {
    $value = trim((string)$value);
    if ($value === '') {
        return '';
    }

    $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    $value = trim($value, '-');

    return $value;
}

function build_unique_post_id($pdo, $baseId, $excludeId = null) {
    $candidate = $baseId !== '' ? $baseId : substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 9);
    $suffix = 1;

    while (true) {
        if ($excludeId !== null) {
            $stmt = $pdo->prepare('SELECT id FROM posts WHERE id = ? AND id <> ? LIMIT 1');
            $stmt->execute([$candidate, $excludeId]);
        } else {
            $stmt = $pdo->prepare('SELECT id FROM posts WHERE id = ? LIMIT 1');
            $stmt->execute([$candidate]);
        }

        if (!$stmt->fetch()) {
            return $candidate;
        }

        $candidate = $baseId . '-' . $suffix;
        $suffix++;
    }
}

function ensure_post_has_id($pdo, $post) {
    if (!$post || !empty($post['id'])) {
        return $post;
    }

    $baseId = slugify_for_id($post['slug'] ?? '') ?: 'post';
    $newId = build_unique_post_id($pdo, $baseId);

    $stmt = $pdo->prepare('UPDATE posts SET id = ? WHERE (id = "" OR id IS NULL) AND slug = ? LIMIT 1');
    $stmt->execute([$newId, $post['slug'] ?? '']);
    $post['id'] = $newId;

    return $post;
}
// --- AUTO-MIGRACIÓN ---
// Aseguramos que las nuevas columnas existan en la tabla 'posts'
try {
    // Verificar si las columnas ya existen para evitar errores
    $checkCols = $pdo->query("SHOW COLUMNS FROM posts LIKE 'isExternal'")->fetch();
    if (!$checkCols) {
        $pdo->exec("ALTER TABLE posts ADD COLUMN isExternal TINYINT(1) DEFAULT 0");
        $pdo->exec("ALTER TABLE posts ADD COLUMN externalUrl TEXT DEFAULT NULL");
        $pdo->exec("ALTER TABLE posts ADD COLUMN sourceName VARCHAR(100) DEFAULT NULL");
        $pdo->exec("ALTER TABLE posts ADD COLUMN fontSize VARCHAR(50) DEFAULT 'normal'");
    }
} catch (Exception $e) {
    // Silencioso si falla (quizás por permisos), el log de errores de PHP lo capturará
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener un post por ID o slug
            $id = $_GET['id'];
            $stmt = $pdo->prepare('SELECT * FROM posts WHERE id = ? OR slug = ?');
            $stmt->execute([$id, $id]);
            $post = $stmt->fetch();
            $post = ensure_post_has_id($pdo, $post);
            echo json_encode($post ?: null);
        } else {
            // Listar todos los posts
            $stmt = $pdo->query('SELECT * FROM posts ORDER BY createdAt DESC');
            $posts = $stmt->fetchAll();
            $posts = array_map(function ($post) use ($pdo) {
                return ensure_post_has_id($pdo, $post);
            }, $posts);
            echo json_encode($posts);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos']);
            break;
        }
        
        $incomingId = trim((string)($data['id'] ?? ''));
        $slug = trim((string)($data['slug'] ?? ''));
        $baseId = slugify_for_id($slug) ?: 'post';
        $isEditing = $incomingId !== '';
        $id = $isEditing ? $incomingId : build_unique_post_id($pdo, $baseId);
        $createdAt = $data['createdAt'] ?? date('c');
        
        if ($isEditing) {
            // Comprobar si existe por ID o por slug (cubre entradas antiguas con ID vacío)
            $stmt = $pdo->prepare('SELECT id FROM posts WHERE id = ? OR slug = ? LIMIT 1');
            $stmt->execute([$id, $slug]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                $resolvedId = !empty($existing['id']) ? $existing['id'] : build_unique_post_id($pdo, $baseId, $id);
                $stmt = $pdo->prepare('UPDATE posts SET 
                    id=?, title=?, slug=?, excerpt=?, content=?, image=?, color=?, date=?, author=?, createdAt=?,
                    isExternal=?, externalUrl=?, sourceName=?, fontSize=?
                    WHERE id = ? OR slug = ?');
                $stmt->execute([
                    $resolvedId,
                    $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                    $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                    $data['date'] ?? '', $data['author'] ?? '',
                    $data['createdAt'] ?? $createdAt,
                    isset($data['isExternal']) ? ($data['isExternal'] ? 1 : 0) : 0,
                    $data['externalUrl'] ?? null,
                    $data['sourceName'] ?? null,
                    $data['fontSize'] ?? 'normal',
                    $id,
                    $slug
                ]);
                $id = $resolvedId;
            } else {
                $id = build_unique_post_id($pdo, $baseId);
            $stmt = $pdo->prepare('INSERT INTO posts 
                    (id, title, slug, excerpt, content, image, color, date, author, createdAt, isExternal, externalUrl, sourceName, fontSize)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                $stmt->execute([
                    $id, 
                    $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                    $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                    $data['date'] ?? '', $data['author'] ?? '', 
                    $createdAt,
                    isset($data['isExternal']) ? ($data['isExternal'] ? 1 : 0) : 0,
                    $data['externalUrl'] ?? null,
                    $data['sourceName'] ?? null,
                    $data['fontSize'] ?? 'normal'
                ]);
            }
        } else {
            $stmt = $pdo->prepare('INSERT INTO posts 
                (id, title, slug, excerpt, content, image, color, date, author, createdAt, isExternal, externalUrl, sourceName, fontSize)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $id, 
                $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                $data['date'] ?? '', $data['author'] ?? '', 
                $createdAt,
                isset($data['isExternal']) ? ($data['isExternal'] ? 1 : 0) : 0,
                $data['externalUrl'] ?? null,
                $data['sourceName'] ?? null,
                $data['fontSize'] ?? 'normal'
            ]);
        }
        
        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Se requiere ID']);
            break;
        }
        $stmt = $pdo->prepare('DELETE FROM posts WHERE id = ? OR slug = ?');
        $stmt->execute([$_GET['id'], $_GET['id']]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
