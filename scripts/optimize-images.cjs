#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SOURCE_ROOT = path.join(ROOT, 'public', 'images');
const OPTIMIZED_ROOT = path.join(ROOT, 'public', 'optimized-images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'imageManifest.json');
const MAX_DIMENSION = 1400;
const JPEG_QUALITY = '72';
const SOURCE_GROUPS = ['Oversized Tshirts', 'Hoodies'];
const TARGET_FORMATS = new Set(['.jpg', '.jpeg', '.png']);
const publicRoot = path.join(ROOT, 'public');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walk(dirPath, entries = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, entries);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!TARGET_FORMATS.has(ext)) continue;
    entries.push(fullPath);
  }

  return entries;
}

function toOptimizedOutput(sourcePath) {
  const relativeToImages = path.relative(SOURCE_ROOT, sourcePath);
  const parsed = path.parse(relativeToImages);
  return path.join(OPTIMIZED_ROOT, parsed.dir, `${parsed.name}.jpg`);
}

function buildPublicPath(filePath, publicRoot) {
  return `/${path.relative(publicRoot, filePath).replace(/\\/g, '/')}`;
}

function shouldRegenerate(sourcePath, outputPath) {
  if (!fs.existsSync(outputPath)) return true;
  const sourceStat = fs.statSync(sourcePath);
  const outputStat = fs.statSync(outputPath);
  return sourceStat.mtimeMs > outputStat.mtimeMs;
}

function optimizeImage(sourcePath, outputPath) {
  ensureDir(path.dirname(outputPath));
  execFileSync(
    'sips',
    ['-s', 'format', 'jpeg', '-s', 'formatOptions', JPEG_QUALITY, '-Z', String(MAX_DIMENSION), sourcePath, '--out', outputPath],
    { stdio: 'ignore' },
  );
}

function canUseSips() {
  if (process.env.MODSOULS_DISABLE_SIPS === '1') {
    return false;
  }

  try {
    execFileSync('sips', ['--help'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function main() {
  ensureDir(OPTIMIZED_ROOT);
  const manifest = {};
  let optimizedCount = 0;
  let reusedCount = 0;
  let fallbackCount = 0;
  const sipsAvailable = canUseSips();

  if (!sipsAvailable) {
    console.warn('Image optimization skipped: "sips" is unavailable. Reusing committed optimized assets when possible.');
  }

  for (const group of SOURCE_GROUPS) {
    const groupDir = path.join(SOURCE_ROOT, group);
    if (!fs.existsSync(groupDir)) continue;

    for (const sourcePath of walk(groupDir)) {
      const outputPath = toOptimizedOutput(sourcePath);

      if (sipsAvailable && shouldRegenerate(sourcePath, outputPath)) {
        optimizeImage(sourcePath, outputPath);
        optimizedCount += 1;
      } else if (fs.existsSync(outputPath)) {
        reusedCount += 1;
      } else {
        fallbackCount += 1;
      }

      const sourcePublicPath = buildPublicPath(sourcePath, publicRoot);
      const optimizedPublicPath = buildPublicPath(outputPath, publicRoot);
      manifest[sourcePublicPath] = fs.existsSync(outputPath) ? optimizedPublicPath : sourcePublicPath;
    }
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Optimized images generated: ${optimizedCount}`);
  console.log(`Optimized images reused: ${reusedCount}`);
  console.log(`Images using original source: ${fallbackCount}`);
  console.log(`Image manifest entries: ${Object.keys(manifest).length}`);
}

main();
