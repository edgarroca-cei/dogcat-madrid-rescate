<?php
/**
 * API de Multimedia (Galería)
 * 
 * GET    /api/media.php              → Listar archivos en uploads/
 * DELETE /api/media.php?filename=X   → Eliminar archivo de uploads/
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('X-LiteSpeed-Cache-Control: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadsDir = __DIR__ . '/../uploads';

// Asegurar que la carpeta existe
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $files = scandir($uploadsDir);
            $media = [];
            
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') continue;
                
                $filePath = $uploadsDir . '/' . $file;
                if (is_file($filePath)) {
                    $stats = stat($filePath);
                    $media[] = [
                        'filename' => $file,
                        'url' => '/uploads/' . $file,
                        'size' => $stats['size'],
                        'mtime' => $stats['mtime']
                    ];
                }
            }
            
            // Ordenar por fecha de modificación (más reciente primero)
            usort($media, function($a, $b) {
                return $b['mtime'] - $a['mtime'];
            });
            
            echo json_encode($media);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['filename'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Nombre de archivo no proporcionado']);
            break;
        }
        
        $filename = $_GET['filename'];
        
        // Seguridad: Evitar path traversal
        if (strpos($filename, '..') !== false || strpos($filename, '/') !== false || strpos($filename, '\\') !== false) {
            http_response_code(400);
            echo json_encode(['error' => 'Nombre de archivo no válido']);
            break;
        }
        
        $filePath = $uploadsDir . '/' . $filename;
        
        if (file_exists($filePath)) {
            if (unlink($filePath)) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'No se pudo eliminar el archivo']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Archivo no encontrado']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
