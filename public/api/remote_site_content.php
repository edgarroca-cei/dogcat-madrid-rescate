<?php
/**
 * API de Contenido del Sitio
 * 
 * GET    /api/site-content.php          → Listar todos los contenidos
 * GET    /api/site-content.php?id=X     → Obtener contenido por ID
 * POST   /api/site-content.php          → Crear o actualizar contenido
 */

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // MIGRATION TRIGGER (Bypasses LiteSpeed 404 on new files)
        if (isset($_GET['migrate']) && $_GET['migrate'] === 'true') {
            try {
                $pdo->exec("ALTER TABLE site_content MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
                $pdo->exec("ALTER TABLE site_content MODIFY COLUMN content LONGTEXT");
                $pdo->exec("ALTER TABLE settings MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
                $pdo->exec("ALTER TABLE settings MODIFY COLUMN paypalLink TEXT");
                $pdo->exec("ALTER TABLE mapas MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
                $pdo->exec("ALTER TABLE mapas MODIFY COLUMN description TEXT");
                echo json_encode(['success' => true, 'message' => 'Migration completed']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            }
            break;
        }

        if (isset($_GET['id'])) {
            // Obtener contenido por ID
            $stmt = $pdo->prepare('SELECT * FROM site_content WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $row = $stmt->fetch();
            
            if ($row) {
                // Intentar decodificar JSON si es un objeto
                $content = json_decode($row['content'], true);
                echo json_encode($content !== null ? $content : $row['content']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Contenido no encontrado']);
            }
        } else {
            // Listar todos los contenidos
            $stmt = $pdo->query('SELECT * FROM site_content');
            $rows = $stmt->fetchAll();
            $content = [];
            foreach ($rows as $row) {
                $decoded = json_decode($row['content'], true);
                $content[$row['id']] = ($decoded !== null ? $decoded : $row['content']);
            }
            echo json_encode($content);
        }
        break;

    case 'POST':
        $rawInput = file_get_contents('php://input');
        $data = json_decode($rawInput, true);
        
        if (!$data || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos o ID faltante', 'raw' => substr($rawInput, 0, 100)]);
            break;
        }
        
        $id = $data['id'];
        $contentObj = $data['content'];
        $contentStr = is_array($contentObj) ? json_encode($contentObj, JSON_UNESCAPED_UNICODE) : $contentObj;
        
        if ($contentStr === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al codificar JSON: ' . json_last_error_msg()]);
            break;
        }

        $updatedAt = date('c');
        
        try {
            // Upsert logic
            $stmt = $pdo->prepare('INSERT INTO site_content (id, content, updatedAt) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE content = VALUES(content), updatedAt = VALUES(updatedAt)');
            $stmt->execute([$id, $contentStr, $updatedAt]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
