<?php
/**
 * API de Subida de Imágenes
 * 
 * POST /api/upload.php   → Subir imagen (multipart/form-data)
 * Devuelve: { "url": "/uploads/portada-xxxxx.ext" }
 */

// Headers CORS (sin incluir config.php porque no necesitamos BD)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('X-LiteSpeed-Cache-Control: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Verificar que se envió un archivo
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No se ha subido ningún archivo']);
    exit;
}

$file = $_FILES['image'];

// Validar tipo de archivo (solo imágenes)
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tipo de archivo no permitido. Solo se permiten imágenes.']);
    exit;
}

// Limitar tamaño (10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'El archivo es demasiado grande. Máximo 10MB.']);
    exit;
}

// Crear carpeta uploads si no existe
$uploadsDir = __DIR__ . '/../uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Generar nombre único
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$uniqueName = 'portada-' . time() . '-' . mt_rand(100000000, 999999999) . '.' . $ext;
$destPath = $uploadsDir . '/' . $uniqueName;

// Mover archivo
if (move_uploaded_file($file['tmp_name'], $destPath)) {
    echo json_encode(['url' => '/uploads/' . $uniqueName]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar el archivo']);
}
