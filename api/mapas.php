<?php
/**
 * API de Mapas
 * 
 * GET    /api/mapas.php          → Listar todos los mapas
 * POST   /api/mapas.php          → Crear o actualizar mapa
 * DELETE /api/mapas.php?id=X     → Eliminar mapa
 */

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM mapas ORDER BY `order` ASC');
        $mapas = $stmt->fetchAll();
        echo json_encode($mapas);
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
            $stmt = $pdo->prepare('SELECT id FROM mapas WHERE id = ?');
            $stmt->execute([$id]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                $stmt = $pdo->prepare('UPDATE mapas SET title=?, mid=?, description=?, icon=?, `order`=?, createdAt=? WHERE id=?');
                $stmt->execute([
                    $data['title'] ?? '', $data['mid'] ?? '', $data['description'] ?? '',
                    $data['icon'] ?? '', $data['order'] ?? 0,
                    $data['createdAt'] ?? $createdAt, $id
                ]);
            } else {
                $stmt = $pdo->prepare('INSERT INTO mapas (id, title, mid, description, icon, `order`, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)');
                $stmt->execute([
                    $id, $data['title'] ?? '', $data['mid'] ?? '', $data['description'] ?? '',
                    $data['icon'] ?? '', $data['order'] ?? 0, $createdAt
                ]);
            }
        } else {
            $stmt = $pdo->prepare('INSERT INTO mapas (id, title, mid, description, icon, `order`, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $id, $data['title'] ?? '', $data['mid'] ?? '', $data['description'] ?? '',
                $data['icon'] ?? '', $data['order'] ?? 0, $createdAt
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
        $stmt = $pdo->prepare('DELETE FROM mapas WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
