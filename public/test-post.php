<?php
/**
 * Test específico para crear un post
 * Accede a: https://tudominio.com/test-post.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', '1');

$results = [
    'timestamp' => date('c'),
    'test' => 'POST to posts.php',
    'steps' => []
];

// Test 1: Verificar que podemos incluir config.php
$apiDir = __DIR__ . '/api/';
try {
    ob_start();
    require_once $apiDir . 'config.php';
    ob_end_clean();
    $results['steps']['config_loaded'] = true;
} catch (Exception $e) {
    $results['steps']['config_loaded'] = false;
    $results['steps']['config_error'] = $e->getMessage();
    echo json_encode($results);
    exit;
}

// Test 2: Simular datos de un post nuevo (igual que el frontend)
$testData = [
    'id' => '',  // Vacío = nuevo post
    'title' => 'Test Post ' . date('Y-m-d H:i:s'),
    'slug' => 'test-post-' . time(),
    'excerpt' => 'Este es un post de prueba para diagnosticar el error',
    'content' => '<p>Contenido de prueba del post</p>',
    'image' => 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200',
    'color' => 'bg-brand-cream text-brand-dark',
    'date' => date('Y-m-d'),
    'author' => 'Test',
    'isExternal' => false,
    'externalUrl' => null,
    'sourceName' => null,
    'fontSize' => 'normal'
];

$results['steps']['test_data'] = $testData;

// Test 3: Intentar insertar directamente en la base de datos
try {
    $id = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 9);
    $createdAt = date('c');
    
    $stmt = $pdo->prepare('INSERT INTO posts 
        (id, title, slug, excerpt, content, image, color, date, author, createdAt, isExternal, externalUrl, sourceName, fontSize)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    
    $stmt->execute([
        $id,
        $testData['title'],
        $testData['slug'],
        $testData['excerpt'],
        $testData['content'],
        $testData['image'],
        $testData['color'],
        $testData['date'],
        $testData['author'],
        $createdAt,
        0,  // isExternal
        null,  // externalUrl
        null,  // sourceName
        'normal'  // fontSize
    ]);
    
    $results['steps']['direct_insert'] = true;
    $results['steps']['inserted_id'] = $id;
    
    // Limpiar - borrar el post de prueba
    $stmt = $pdo->prepare('DELETE FROM posts WHERE id = ?');
    $stmt->execute([$id]);
    $results['steps']['cleanup'] = true;
    
} catch (Exception $e) {
    $results['steps']['direct_insert'] = false;
    $results['steps']['insert_error'] = $e->getMessage();
    $results['steps']['insert_trace'] = $e->getTraceAsString();
}

// Test 4: Simular petición POST al archivo posts.php usando cURL
if (function_exists('curl_init')) {
    $ch = curl_init();
    $url = 'https://' . $_SERVER['HTTP_HOST'] . '/api/posts.php';
    
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
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    $results['steps']['curl_test'] = [
        'url' => $url,
        'http_code' => $httpCode,
        'curl_error' => $curlError,
        'response' => $response,
        'response_parsed' => json_decode($response, true)
    ];
} else {
    $results['steps']['curl_test'] = 'cURL no disponible';
}

echo json_encode($results, JSON_PRETTY_PRINT);
