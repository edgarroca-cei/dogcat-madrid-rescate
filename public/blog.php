<?php
require_once __DIR__ . '/api/config.php';

function escape_html($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function build_absolute_url($path) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'dogcatmadrid.org';

    if (!$path) {
        return $scheme . '://' . $host . '/dog_cat_hero.png';
    }

    if (preg_match('/^https?:\/\//i', $path)) {
        return $path;
    }

    $normalizedPath = (string)$path;
    if ($normalizedPath !== '' && $normalizedPath[0] !== '/') {
        $normalizedPath = '/' . $normalizedPath;
    }

    return $scheme . '://' . $host . $normalizedPath;
}

function get_frontend_assets() {
    $indexPath = __DIR__ . '/index.html';
    $indexHtml = file_exists($indexPath) ? file_get_contents($indexPath) : '';

    $scriptSrc = '/assets/index-BEFXuf1B.js';
    $styleHref = '/assets/index-C99-OPcW.css';

    if ($indexHtml) {
        if (preg_match('/<script[^>]+src="([^"]+)"/i', $indexHtml, $scriptMatch)) {
            $scriptSrc = $scriptMatch[1];
        }
        if (preg_match('/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i', $indexHtml, $styleMatch)) {
            $styleHref = $styleMatch[1];
        }
    }

    return [$scriptSrc, $styleHref];
}

$slug = trim((string)($_GET['slug'] ?? ''));
$currentUrl = build_absolute_url($_SERVER['REQUEST_URI'] ?? '/blog');

$defaultTitle = 'DOGCAT Madrid | Rescate Animal';
$defaultDescription = 'ONG de rescate animal en Madrid. Trabajamos en la gestion de colonias felinas a traves del metodo CER, rescate de emergencias y concienciacion sobre el bienestar animal.';
$defaultImage = build_absolute_url('/dog_cat_hero.png');

$pageTitle = $defaultTitle;
$pageDescription = $defaultDescription;
$pageImage = $defaultImage;
$pageType = 'website';

if ($slug !== '') {
    $stmt = $pdo->prepare('SELECT * FROM posts WHERE slug = ? OR id = ? LIMIT 1');
    $stmt->execute([$slug, $slug]);
    $post = $stmt->fetch();

    if ($post) {
        $pageTitle = trim(($post['title'] ?? '') . ' | DOGCAT Madrid');
        $pageDescription = trim((string)($post['excerpt'] ?? '')) ?: $defaultDescription;
        $pageImage = build_absolute_url($post['image'] ?? '');
        $pageType = 'article';
    }
}

[$scriptSrc, $styleHref] = get_frontend_assets();
?>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= escape_html($pageTitle) ?></title>
    <meta name="description" content="<?= escape_html($pageDescription) ?>" />

    <meta property="og:type" content="<?= escape_html($pageType) ?>" />
    <meta property="og:site_name" content="DOGCAT Madrid" />
    <meta property="og:title" content="<?= escape_html($pageTitle) ?>" />
    <meta property="og:description" content="<?= escape_html($pageDescription) ?>" />
    <meta property="og:image" content="<?= escape_html($pageImage) ?>" />
    <meta property="og:url" content="<?= escape_html($currentUrl) ?>" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= escape_html($pageTitle) ?>" />
    <meta name="twitter:description" content="<?= escape_html($pageDescription) ?>" />
    <meta name="twitter:image" content="<?= escape_html($pageImage) ?>" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script type="module" crossorigin src="<?= escape_html($scriptSrc) ?>"></script>
    <link rel="stylesheet" crossorigin href="<?= escape_html($styleHref) ?>">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
