const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 80;
const SIZES = [400, 800, 1200];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const name = path.basename(filePath, ext);
  
  try {
    // Generate WebP
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(path.join(dir, `${name}.webp`));
    
    // Generate responsive sizes
    for (const size of SIZES) {
      await sharp(filePath)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: QUALITY })
        .toFile(path.join(dir, `${name}-${size}w.jpg`));
    }
    
    console.log(`✅ Optimized: ${name}`);
  } catch (error) {
    console.error(`❌ Error: ${name} - ${error.message}`);
  }
}

async function scanAndOptimize(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await scanAndOptimize(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file) && !/-\d+w\.jpg$/.test(file)) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🖼️  Optimizing images...\n');
scanAndOptimize(IMAGES_DIR).then(() => {
  console.log('\n✅ Image optimization complete!');
});
