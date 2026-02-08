const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

function validateProducts() {
  const issues = [];
  let totalProducts = 0;

  ['Oversized Tshirts', 'Premium Hoodies'].forEach(category => {
    const dir = path.join(IMAGES_DIR, category);
    if (!fs.existsSync(dir)) return;

    const folders = fs.readdirSync(dir).filter(f => 
      fs.statSync(path.join(dir, f)).isDirectory()
    );

    folders.forEach(folder => {
      totalProducts++;
      const folderPath = path.join(dir, folder);
      const files = fs.readdirSync(folderPath);
      
      // Check for images
      const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      if (images.length === 0) {
        issues.push(`❌ ${folder}: No images found`);
      } else if (images.length < 2) {
        issues.push(`⚠️  ${folder}: Only 1 image (recommended: 2-3)`);
      }

      // Check product.json if exists
      const configPath = path.join(folderPath, 'product.json');
      if (fs.existsSync(configPath)) {
        try {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          if (!config.name && !config.tag) {
            issues.push(`⚠️  ${folder}: product.json exists but empty`);
          }
        } catch (e) {
          issues.push(`❌ ${folder}: Invalid product.json - ${e.message}`);
        }
      }

      // Check folder naming
      if (folder.includes('  ')) {
        issues.push(`⚠️  ${folder}: Contains double spaces`);
      }
      if (/[^a-zA-Z0-9\s-]/.test(folder)) {
        issues.push(`⚠️  ${folder}: Contains special characters`);
      }
    });
  });

  console.log(`\n📋 Validation Report\n${'='.repeat(50)}`);
  console.log(`Total Products: ${totalProducts}`);
  console.log(`Issues Found: ${issues.length}\n`);

  if (issues.length > 0) {
    issues.forEach(issue => console.log(issue));
    console.log(`\n💡 Fix issues and run 'npm run generate-products'`);
  } else {
    console.log(`✅ All products are valid!`);
  }
}

validateProducts();
