#!/usr/bin/env node
/**
 * Add new products for any folder in public/images/Hoodie or public/images/Oversized Tshirts
 * that doesn't already have a product. Safe to run multiple times; only adds missing folders.
 * Does not remove or modify existing products.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PRODUCTS_FILE = path.join(ROOT, 'src', 'data', 'products.js');

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const PRICING = { tee: { mrp: 699, price: 599 }, hoodie: { mrp: 1399, price: 1099 } };
const SERIES = { tee: 'On The Go Series', hoodie: 'On The Hood Series' };

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

function getExistingFolderKeys(content) {
  const keys = new Set();
  const re = /\/images\/(Hoodie|Oversized Tshirts)\/([^/]+)\//g;
  let m;
  while ((m = re.exec(content)) !== null) {
    keys.add(`${m[1]}/${m[2]}`);
  }
  return keys;
}

function collectImages(dir, basePath, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.join(basePath, e.name);
    if (e.isDirectory()) {
      collectImages(full, rel, files);
    } else if (IMAGE_EXT.test(e.name)) {
      files.push('/images/' + rel.replace(/\\/g, '/'));
    }
  }
  return files;
}

function folderToSlug(folderName) {
  return folderName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function formatProduct(p, type) {
  const slug = folderToSlug(p.folderName);
  const id = type === 'hoodie' ? `hoodie-${slug}` : `tee-${slug}`;
  const imagesStr = p.images.map((i) => `      "${i}"`).join(',\n');
  return `  {
    id: "${id}",
    type: "${type}",
    name: "${p.folderName.replace(/"/g, '\\"')}",
    slug: "${slug}",
    tag: "${(p.tag || p.folderName).replace(/"/g, '\\"')}",
    series: "${SERIES[type]}",
    images: [
${imagesStr}
    ],
    mrp: ${PRICING[type].mrp},
    price: ${PRICING[type].price},
    sizes: SIZES,
    category: "${type}"
  }`;
}

function main() {
  let content;
  try {
    content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  } catch (e) {
    console.error('Could not read', PRODUCTS_FILE, e.message);
    process.exit(1);
  }

  const existing = getExistingFolderKeys(content);

  const toAdd = [];

  for (const category of ['Hoodie', 'Oversized Tshirts']) {
    const dir = path.join(IMAGES_DIR, category);
    if (!fs.existsSync(dir)) continue;
    const type = category === 'Hoodie' ? 'hoodie' : 'tee';
    const folders = fs.readdirSync(dir, { withFileTypes: true }).filter((f) => f.isDirectory());
    for (const f of folders) {
      const folderKey = `${category}/${f.name}`;
      if (existing.has(folderKey)) continue;
      const folderPath = path.join(dir, f.name);
      const images = collectImages(folderPath, folderKey);
      if (images.length === 0) {
        console.warn('  Skipping (no images):', folderKey);
        continue;
      }
      toAdd.push({
        folderName: f.name,
        folderKey,
        type,
        images,
        tag: f.name,
      });
      existing.add(folderKey);
    }
  }

  if (toAdd.length === 0) {
    console.log('No new folders to add. All product folders already have entries.');
    return;
  }

  const newBlocks = toAdd.map((p) => formatProduct(p, p.type));
  const insert = ',\n' + newBlocks.join(',\n');

  const marker = '];\n\nexport const brandInfo';
  const idx = content.indexOf(marker);
  if (idx === -1) {
    console.error('Could not find products array end (]; before brandInfo) in', PRODUCTS_FILE);
    process.exit(1);
  }
  const newContent = content.slice(0, idx) + insert + '\n' + content.slice(idx);

  fs.writeFileSync(PRODUCTS_FILE, newContent, 'utf8');
  console.log('Added', toAdd.length, 'new product(s):');
  toAdd.forEach((p) => console.log('  -', p.folderKey));
  console.log('Run "npm run build" to verify.');
}

main();
