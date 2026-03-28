<?php
/**
 * Test específico para diagnosticar el error "Backend not found" al guardar posts
 * Accede a: https://tudominio.com/test-save-post.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', '1');

$results = [
    'timestamp' => date('c'),
    'test' => 'Diagnóstico completo de guardado de posts',
    'steps' => []
];

// Test 1: Verificar que config.php existe y carga correctamente
$configPath = __DIR__ . '/api/config.php';
$results['steps']['config_path'] = $configPath;
$results['steps']['config_exists'] = file_exists($configPath);

if (file_exists($configPath)) {
    try {
        ob_start();
        require_once $configPath;
        $output = ob_get_clean();
        $results['steps']['config_loaded'] = true;
        $results['steps']['config_output'] = $output ?: '(sin output)';
    } catch (Exception $e) {
        $results['steps']['config_loaded'] = false;
        $results['steps']['config_error'] = $e->getMessage();
        echo json_encode($results, JSON_PRETTY_PRINT);
        exit;
    }
} else {
    $results['steps']['config_loaded'] = false;
    $results['steps']['config_error'] = 'Archivo no encontrado';
    echo json_encode($results, JSON_PRETTY_PRINT);
    exit;
}

// Test 2: Verificar conexión a la base de datos
try {
    $stmt = $pdo->query('SELECT 1');
    $results['steps']['db_connection'] = true;
} catch (Exception $e) {
    $results['steps']['db_connection'] = false;
    $results['steps']['db_error'] = $e->getMessage();
    echo json_encode($results, JSON_PRETTY_PRINT);
    exit;
}

// Test 3: Verificar que la tabla posts existe
try {
    $stmt = $pdo->query('DESCRIBE posts');
    $columns = $stmt->fetchAll();
    $results['steps']['posts_table_exists'] = true;
    $results['steps']['posts_columns'] = array_column($columns, 'Field');
} catch (Exception $e) {
    $results['steps']['posts_table_exists'] = false;
    $results['steps']['posts_table_error'] = $e->getMessage();
}

// Test 4: Verificar que posts.php existe
$postsPath = __DIR__ . '/api/posts.php';
$results['steps']['posts_php_path'] = $postsPath;
$results['steps']['posts_php_exists'] = file_exists($postsPath);

// Test 5: Simular petición POST exacta como la haría el frontend
$testData = [
    'id' => '',
    'title' => 'Test Post Diagnóstico ' . date('Y-m-d H:i:s'),
    'slug' => 'test-post-diagnostico-' . time(),
    'excerpt' => 'Este es un post de prueba para diagnosticar el error',
    'content' => '<p>Contenido de prueba del post</p>',
    'image' => '',
    'color' => 'bg-brand-cream text-brand-dark',
    'date' => date('Y-m-d'),
    'author' => 'Test',
    'isExternal' => false,
    'externalUrl' => null,
    'sourceName' => null,
    'fontSize' => 'normal'
];

if (function_exists('curl_init')) {
    $ch = curl_init();
    
    // Construir URL correctamente
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $url = $protocol . '://' . $host . '/api/posts.php';
    
    $results['steps']['curl_url'] = $url;
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    $curlInfo = curl_getinfo($ch);
    curl_close($ch);
    
    $results['steps']['curl_response'] = [
        'http_code' => $httpCode,
        'curl_error' => $curlError ?: '(sin error)',
        'response_raw' => $response,
        'response_parsed' => json_decode($response, true),
        'effective_url' => $curlInfo['url'] ?? null
    ];
    
    // Si el HTTP code no es 200, mostrar más detalles
    if ($httpCode != 200) {
        $results['steps']['curl_response']['status_text'] = 'HTTP ' . $httpCode . ' - Esto explica el error "Backend not found"';
    }
} else {
    $results['steps']['curl_test'] = 'cURL no disponible en el servidor';
}

// Test 6: Verificar permisos de escritura
$uploadDir = __DIR__ . '/uploads';
$results['steps']['uploads_dir'] = $uploadDir;
$results['steps']['uploads_exists'] = is_dir($uploadDir);
$results['steps']['uploads_writable'] = is_writable($uploadDir);

echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
