<?php
/**
 * Configuración de base de datos MySQL para Hostinger
 * 
 * INSTRUCCIONES: Cambia estos valores por los de tu base de datos en Hostinger.
 * Los encontrarás en: Panel Hostinger → Bases de datos → MySQL
 */

// ===== CONFIGURAR ESTOS VALORES =====
define('DB_HOST', 'localhost');
define('DB_NAME', 'u352304367_dogcatmadrid');      // Ejemplo: u123456789_dogcat
define('DB_USER', 'u352304367_dogcatmadrid');             // Ejemplo: u123456789_admin
define('DB_PASS', '0$XoK5A|');          // La contraseña que elegiste
// =====================================

// Conexión PDO
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
    exit;
}

// Headers comunes para API JSON y evitar caché en Hostinger (LiteSpeed)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('X-LiteSpeed-Cache-Control: no-cache');

// Manejar preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
