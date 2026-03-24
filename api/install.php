<?php
/**
 * Script de instalación - Crear tablas en MySQL
 * 
 * Ejecutar UNA SOLA VEZ visitando: tudominio.com/api/install.php
 * Después de ejecutar, se recomienda eliminar o renombrar este archivo.
 */

require_once __DIR__ . '/config.php';

$tables = [];
$errors = [];

// Tabla: posts
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(20) PRIMARY KEY,
        title TEXT,
        slug VARCHAR(255),
        excerpt TEXT,
        content LONGTEXT,
        image TEXT,
        color VARCHAR(50),
        date VARCHAR(50),
        author VARCHAR(255),
        createdAt VARCHAR(50),
        INDEX idx_slug (slug),
        INDEX idx_createdAt (createdAt)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $tables[] = 'posts';
} catch (PDOException $e) {
    $errors[] = 'posts: ' . $e->getMessage();
}

// Tabla: settings
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
        id VARCHAR(50) PRIMARY KEY,
        paypalLink TEXT,
        bizumNumber VARCHAR(50),
        bizumConcept VARCHAR(255),
        updatedAt VARCHAR(50)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $tables[] = 'settings';
} catch (PDOException $e) {
    $errors[] = 'settings: ' . $e->getMessage();
}

// Tabla: mapas
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS mapas (
        id VARCHAR(20) PRIMARY KEY,
        title TEXT,
        mid VARCHAR(255),
        description TEXT,
        icon VARCHAR(100),
        `order` INT DEFAULT 0,
        createdAt VARCHAR(50),
        INDEX idx_order (`order`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $tables[] = 'mapas';
} catch (PDOException $e) {
    $errors[] = 'mapas: ' . $e->getMessage();
}

// Resultado
header('Content-Type: text/html; charset=utf-8');

echo '<!DOCTYPE html><html><head><title>Instalación DOGCAT</title>';
echo '<style>body{font-family:sans-serif;max-width:600px;margin:50px auto;padding:20px}';
echo '.ok{color:green}.err{color:red}h1{color:#333}</style></head><body>';
echo '<h1>🐾 Instalación DOGCAT Madrid</h1>';

if (count($errors) === 0) {
    echo '<p class="ok">✅ Todas las tablas creadas correctamente:</p>';
    echo '<ul>';
    foreach ($tables as $t) {
        echo "<li class='ok'>✅ $t</li>";
    }
    echo '</ul>';
    echo '<p><strong>¡Listo!</strong> Ya puedes usar la web. Se recomienda eliminar este archivo (install.php) por seguridad.</p>';
} else {
    echo '<p class="err">⚠️ Hubo errores:</p>';
    echo '<ul>';
    foreach ($errors as $e) {
        echo "<li class='err'>❌ $e</li>";
    }
    echo '</ul>';
    if (count($tables) > 0) {
        echo '<p class="ok">Tablas creadas correctamente: ' . implode(', ', $tables) . '</p>';
    }
}

echo '</body></html>';
