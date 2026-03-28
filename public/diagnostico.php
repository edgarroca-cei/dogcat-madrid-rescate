<?php
/**
 * Script de diagnóstico para Hostinger
 * Sube este archivo a la raíz de tu hosting y accede a él por URL
 * Ejemplo: https://tudominio.com/diagnostico.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', '1');

$results = [
    'timestamp' => date('c'),
    'php_version' => PHP_VERSION,
    'tests' => []
];

// Test 1: Verificar extensiones PHP
$results['tests']['pdo'] = extension_loaded('pdo');
$results['tests']['pdo_mysql'] = extension_loaded('pdo_mysql');
$results['tests']['json'] = extension_loaded('json');

// Test 2: Verificar archivos de API
$apiFiles = ['posts.php', 'config.php', 'site-content.php', 'settings.php', 'mapas.php', 'upload.php', 'media.php'];
$apiDir = __DIR__ . '/api/';
$results['api_files'] = [];

foreach ($apiFiles as $file) {
    $path = $apiDir . $file;
    $results['api_files'][$file] = [
        'exists' => file_exists($path),
        'readable' => is_readable($path),
        'size' => file_exists($path) ? filesize($path) : 0
    ];
}

// Test 3: Intentar conexión a base de datos (si config.php existe)
if (file_exists($apiDir . 'config.php')) {
    try {
        ob_start();
        require_once $apiDir . 'config.php';
        ob_end_clean();
        
        if (isset($pdo)) {
            $results['tests']['db_connection'] = true;
            $results['tests']['db_tables'] = [];
            
            try {
                $tables = $pdo->query("SHOW TABLES");
                $tableList = $tables->fetchAll(PDO::FETCH_COLUMN);
                $results['tests']['db_tables'] = $tableList;
                
                if (in_array('posts', $tableList)) {
                    $columns = $pdo->query("SHOW COLUMNS FROM posts");
                    $results['posts_columns'] = $columns->fetchAll(PDO::FETCH_COLUMN);
                }
            } catch (Exception $e) {
                $results['tests']['db_tables_error'] = $e->getMessage();
            }
        } else {
            $results['tests']['db_connection'] = false;
            $results['tests']['db_error'] = 'Variable $pdo no definida';
        }
    } catch (Exception $e) {
        $results['tests']['db_connection'] = false;
        $results['tests']['db_error'] = $e->getMessage();
    } catch (Error $e) {
        $results['tests']['db_connection'] = false;
        $results['tests']['db_error'] = $e->getMessage();
    }
} else {
    $results['tests']['db_connection'] = false;
    $results['tests']['db_error'] = 'config.php no encontrado';
}

echo json_encode($results, JSON_PRETTY_PRINT);
