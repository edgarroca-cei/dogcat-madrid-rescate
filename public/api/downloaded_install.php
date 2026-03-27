<?php
require_once __DIR__ . '/config.php';

echo "<h2>Database Migration</h2>";

try {
    // 1. Ensure site_content has enough space
    echo "Updating site_content table...<br>";
    $pdo->exec("ALTER TABLE site_content MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
    $pdo->exec("ALTER TABLE site_content MODIFY COLUMN content LONGTEXT");
    echo "Table site_content updated successfully.<br>";

    // 2. Ensure settings has enough space
    echo "Updating settings table...<br>";
    $pdo->exec("ALTER TABLE settings MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
    $pdo->exec("ALTER TABLE settings MODIFY COLUMN paypalLink TEXT");
    $pdo->exec("ALTER TABLE settings MODIFY COLUMN bizumNumber VARCHAR(50)");
    $pdo->exec("ALTER TABLE settings MODIFY COLUMN bizumConcept TEXT");
    echo "Table settings updated successfully.<br>";

    // 3. Ensure mapas has enough space
    echo "Updating mapas table...<br>";
    $pdo->exec("ALTER TABLE mapas MODIFY COLUMN id VARCHAR(100) PRIMARY KEY");
    $pdo->exec("ALTER TABLE mapas MODIFY COLUMN description TEXT");
    echo "Table mapas updated successfully.<br>";

    echo "<h3>All migrations completed successfully!</h3>";

} catch (Exception $e) {
    echo "<p style='color:red;'>Error during migration: " . $e->getMessage() . "</p>";
}
