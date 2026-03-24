<?php
/**
 * API de Ajustes de Donaciones
 * 
 * GET  /api/settings.php   → Leer ajustes de donaciones
 * POST /api/settings.php   → Guardar ajustes de donaciones
 */

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->prepare("SELECT * FROM settings WHERE id = 'donations'");
        $stmt->execute();
        $row = $stmt->fetch();
        
        if ($row) {
            echo json_encode($row);
        } else {
            echo json_encode([
                'paypalLink' => '',
                'bizumNumber' => '',
                'bizumConcept' => 'Donativo DOGCAT'
            ]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos']);
            break;
        }
        
        $updatedAt = $data['updatedAt'] ?? date('c');
        
        // Comprobar si existe
        $stmt = $pdo->prepare("SELECT id FROM settings WHERE id = 'donations'");
        $stmt->execute();
        $existing = $stmt->fetch();
        
        if ($existing) {
            $stmt = $pdo->prepare("UPDATE settings SET paypalLink=?, bizumNumber=?, bizumConcept=?, updatedAt=? WHERE id='donations'");
            $stmt->execute([
                $data['paypalLink'] ?? '',
                $data['bizumNumber'] ?? '',
                $data['bizumConcept'] ?? 'Donativo DOGCAT',
                $updatedAt
            ]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO settings (id, paypalLink, bizumNumber, bizumConcept, updatedAt) VALUES ('donations', ?, ?, ?, ?)");
            $stmt->execute([
                $data['paypalLink'] ?? '',
                $data['bizumNumber'] ?? '',
                $data['bizumConcept'] ?? 'Donativo DOGCAT',
                $updatedAt
            ]);
        }
        
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
