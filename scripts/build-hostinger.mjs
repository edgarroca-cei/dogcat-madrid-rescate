import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const deployDir = path.join(rootDir, 'deploy');

const publicRootExcludes = new Set(['.DS_Store', 'index.html']);

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function resetDir(dirPath) {
  rmSync(dirPath, { recursive: true, force: true });
  mkdirSync(dirPath, { recursive: true });
}

function copyRootPublicFiles() {
  const entries = readdirSync(publicDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (publicRootExcludes.has(entry.name)) continue;

    cpSync(
      path.join(publicDir, entry.name),
      path.join(deployDir, entry.name),
      { force: true }
    );
  }
}

function buildTimestamp() {
  return new Date().toISOString();
}

function extractBuildInfo(indexHtml) {
  const jsMatch = indexHtml.match(/\/assets\/([^"]+\.js)/);
  const cssMatch = indexHtml.match(/\/assets\/([^"]+\.css)/);

  return {
    jsBundle: jsMatch ? jsMatch[1] : 'unknown',
    cssBundle: cssMatch ? cssMatch[1] : 'unknown',
  };
}

function injectBuildMarker(indexPath) {
  const originalHtml = readFileSync(indexPath, 'utf8');
  const timestamp = buildTimestamp();
  const { jsBundle, cssBundle } = extractBuildInfo(originalHtml);
  const markerTag = `    <meta name="x-build-id" content="${jsBundle}|${timestamp}" />`;
  const markerComment = `    <!-- build: js=${jsBundle} css=${cssBundle} generated=${timestamp} -->`;

  const htmlWithMarker = originalHtml.replace(
    '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    `${markerTag}\n${markerComment}\n    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
  );

  writeFileSync(indexPath, htmlWithMarker, 'utf8');

  return { timestamp, jsBundle, cssBundle };
}

function writeBuildInfoFile(buildInfo) {
  const lines = [
    `generated=${buildInfo.timestamp}`,
    `js_bundle=${buildInfo.jsBundle}`,
    `css_bundle=${buildInfo.cssBundle}`,
    'check_view_source=https://dogcatmadrid.org/',
    `expected_script=/assets/${buildInfo.jsBundle}`,
    `expected_css=/assets/${buildInfo.cssBundle}`,
  ];

  writeFileSync(path.join(deployDir, 'build-info.txt'), `${lines.join('\n')}\n`, 'utf8');
}

resetDir(distDir);
resetDir(deployDir);

run('npx', ['vite', 'build']);

if (!existsSync(distDir)) {
  console.error('No se ha generado la carpeta dist.');
  process.exit(1);
}

cpSync(distDir, deployDir, { recursive: true, force: true });
cpSync(path.join(publicDir, 'api'), path.join(deployDir, 'api'), { recursive: true, force: true });
copyRootPublicFiles();

const buildInfo = injectBuildMarker(path.join(deployDir, 'index.html'));
writeBuildInfoFile(buildInfo);

console.log('Deploy preparado en ./deploy sin copiar public/uploads.');
console.log(`Build actual: /assets/${buildInfo.jsBundle}`);
