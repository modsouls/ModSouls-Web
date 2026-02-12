#!/usr/bin/env node
/**
 * Normalize product image names for Hoodie and Oversized Tshirts folders.
 * Renames images to FolderName_1.ext ... FolderName_n.ext and updates
 * src/data/products.js paths accordingly.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PRODUCTS_FILE = path.join(ROOT, 'src', 'data', 'products.json');

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;
const CATEGORIES = ['Hoodie', 'Oversized Tshirts'];

function listImages(folderPath) {
  return fs.readdirSync(folderPath)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b));
}

function renameImages(folderPath, folderName) {
  const images = listImages(folderPath);
  const mapping = {};
  images.forEach((name, idx) => {
    const ext = path.extname(name);
    const newName = `${folderName}_${idx + 1}${ext}`;
    if (name !== newName) {
      fs.renameSync(path.join(folderPath, name), path.join(folderPath, newName));
      mapping[name] = newName;
    }
  });
  return mapping;
}

function main() {
  const mapping = {};

  for (const category of CATEGORIES) {
    const categoryPath = path.join(IMAGES_DIR, category);
    if (!fs.existsSync(categoryPath)) continue;

    const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter((f) => f.isDirectory());

    for (const folder of folders) {
      const folderPath = path.join(categoryPath, folder.name);
      const renamed = renameImages(folderPath, folder.name);
      for (const [oldName, newName] of Object.entries(renamed)) {
        const oldPath = `/images/${category}/${folder.name}/${oldName}`;
        const newPath = `/images/${category}/${folder.name}/${newName}`;
        mapping[oldPath] = newPath;
      }
    }
  }

  if (Object.keys(mapping).length === 0) {
    console.log('No image renames needed. All product images already normalized.');
    return;
  }

  const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const products = JSON.parse(raw);
  const updatedProducts = products.map((p) => {
    if (!Array.isArray(p.images)) return p;
    const images = p.images.map((img) => mapping[img] || img);
    return { ...p, images };
  });
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2), 'utf8');

  console.log(`Renamed ${Object.keys(mapping).length} image(s) and updated products.js`);
}

main();
