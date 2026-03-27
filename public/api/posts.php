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

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener un post por ID o slug
            $id = $_GET['id'];
            $stmt = $pdo->prepare('SELECT * FROM posts WHERE id = ? OR slug = ?');
            $stmt->execute([$id, $id]);
            $post = $stmt->fetch();
            echo json_encode($post ?: null);
        } else {
            // Listar todos los posts
            $stmt = $pdo->query('SELECT * FROM posts ORDER BY createdAt DESC');
            $posts = $stmt->fetchAll();
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
        
        $isEditing = !empty($data['id']);
        $id = $data['id'] ?? substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 9);
        $createdAt = $data['createdAt'] ?? date('c');
        
        if ($isEditing) {
            // Comprobar si existe
            $stmt = $pdo->prepare('SELECT id FROM posts WHERE id = ?');
            $stmt->execute([$id]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                $stmt = $pdo->prepare('UPDATE posts SET 
                    title=?, slug=?, excerpt=?, content=?, image=?, color=?, date=?, author=?, createdAt=?
                    WHERE id=?');
                $stmt->execute([
                    $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                    $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                    $data['date'] ?? '', $data['author'] ?? '',
                    $data['createdAt'] ?? $createdAt, $id
                ]);
            } else {
                $stmt = $pdo->prepare('INSERT INTO posts 
                    (id, title, slug, excerpt, content, image, color, date, author, createdAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                $stmt->execute([
                    $id, $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                    $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                    $data['date'] ?? '', $data['author'] ?? '', $createdAt
                ]);
            }
        } else {
            $stmt = $pdo->prepare('INSERT INTO posts 
                (id, title, slug, excerpt, content, image, color, date, author, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $id, $data['title'] ?? '', $data['slug'] ?? '', $data['excerpt'] ?? '',
                $data['content'] ?? '', $data['image'] ?? '', $data['color'] ?? '',
                $data['date'] ?? '', $data['author'] ?? '', $createdAt
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
        $stmt = $pdo->prepare('DELETE FROM posts WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
