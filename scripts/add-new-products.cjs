#!/usr/bin/env node
/**
 * Add new products for any folder in public/images/Hoodie or public/images/Oversized Tshirts
 * that doesn't already have a product. Safe to run multiple times; only adds missing folders.
 * Does not remove or modify existing products.
 *
 * Behavior:
 * - If a new folder is found, images are renamed to FolderName_1.ext ... FolderName_n.ext
 * - If product.json exists inside the folder, its fields override defaults:
 *   { name, tag, featured, price, mrp, sizes, series }
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PRODUCTS_FILE = path.join(ROOT, 'src', 'data', 'products.json');

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const PRICING = { tee: { mrp: 699, price: 599 }, hoodie: { mrp: 1399, price: 1099 } };
const SERIES = { tee: 'On The Go Series', hoodie: 'On The Hood Series' };

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

function getExistingFolderKeys(products) {
  const keys = new Set();
  products.forEach((p) => {
    if (!Array.isArray(p.images)) return;
    p.images.forEach((img) => {
      const m = img.match(/\/images\/(Hoodie|Oversized Tshirts)\/([^/]+)\//);
      if (m) keys.add(`${m[1]}/${m[2]}`);
    });
  });
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

function renameImagesInFolder(folderPath, folderName) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  const images = entries.filter((e) => e.isFile() && IMAGE_EXT.test(e.name));
  images.sort((a, b) => a.name.localeCompare(b.name));
  images.forEach((img, index) => {
    const ext = path.extname(img.name);
    const newName = `${folderName}_${index + 1}${ext}`;
    if (img.name !== newName) {
      fs.renameSync(path.join(folderPath, img.name), path.join(folderPath, newName));
    }
  });
}

function readProductJson(folderPath) {
  const jsonPath = path.join(folderPath, 'product.json');
  if (!fs.existsSync(jsonPath)) return null;
  try {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.warn('  Skipping invalid product.json:', jsonPath, e.message);
    return null;
  }
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
  const series = p.series || SERIES[type];
  const price = Number.isFinite(p.price) ? p.price : PRICING[type].price;
  const mrp = Number.isFinite(p.mrp) ? p.mrp : PRICING[type].mrp;
  return {
    id,
    type,
    name: p.name || p.folderName,
    slug,
    tag: p.tag || p.folderName,
    series,
    images: p.images,
    mrp,
    price,
    sizes: p.sizes && p.sizes.length ? p.sizes : SIZES,
    category: type,
    ...(p.featured ? { featured: true } : {}),
  };
}

function main() {
  let products;
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    products = JSON.parse(raw);
    if (!Array.isArray(products)) throw new Error('products.json must be an array');
  } catch (e) {
    console.error('Could not read', PRODUCTS_FILE, e.message);
    process.exit(1);
  }

  const existing = getExistingFolderKeys(products);

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
      renameImagesInFolder(folderPath, f.name);
      const meta = readProductJson(folderPath) || {};
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
        tag: meta.tag || f.name,
        name: meta.name,
        featured: meta.featured === true,
        price: meta.price,
        mrp: meta.mrp,
        sizes: meta.sizes,
        series: meta.series,
      });
      existing.add(folderKey);
    }
  }

  if (toAdd.length === 0) {
    console.log('No new folders to add. All product folders already have entries.');
    return;
  }

  const newItems = toAdd.map((p) => formatProduct(p, p.type));
  const updated = products.concat(newItems);
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Added', toAdd.length, 'new product(s):');
  toAdd.forEach((p) => console.log('  -', p.folderKey));
  console.log('Run "npm run build" to verify.');
}

main();
