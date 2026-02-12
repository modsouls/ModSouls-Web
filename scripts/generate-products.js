const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/products.json');
const TAGS_FILE = path.join(__dirname, '../src/data/tags.js');

const CONFIG = {
  tshirt: { price: 599, mrp: 699, sizes: ['S', 'M', 'L', 'XL', 'XXL'], series: 'On The Go Series' },
  hoodie: { price: 1099, mrp: 1399, sizes: ['S', 'M', 'L', 'XL', 'XXL'], series: 'On The Hood Series' }
};

// Auto-detect tags from product names
const TAG_KEYWORDS = {
  'Anime': ['naruto', 'sasuke', 'kakashi', 'jujutsu', 'jjk', 'sukuna', 'one piece', 'zoro', 'solo leveling', 'anime'],
  'Marvel': ['spiderman', 'spider-man', 'marvel', 'avengers', 'iron man', 'captain'],
  'Harry Potter': ['harry potter', 'deathly hallows', 'slytherin', 'hogwarts', 'potter'],
  'Movies': ['tmkoc', 'jethalal', 'family man', 'movie'],
  'Quotes': ['akarshan', 'dhurandar', 'anti-valentine', 'shiva', 'quote'],
  'Mythology': ['shiva', 'hindu', 'mythology']
};

function autoDetectTag(name) {
  const lowerName = name.toLowerCase();
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return tag;
    }
  }
  return 'General';
}

function scanProductFolders() {
  const products = [];
  const allTags = new Set();
  
  ['Oversized Tshirts', 'Hoodie'].forEach(category => {
    const dir = path.join(IMAGES_DIR, category);
    const type = category.includes('Tshirts') ? 'tee' : 'hoodie';
    
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️  Directory not found: ${category}`);
      return;
    }
    
    const folders = fs.readdirSync(dir).filter(f => 
      fs.statSync(path.join(dir, f)).isDirectory()
    );
    
    folders.forEach(folder => {
      const product = createProduct(path.join(dir, folder), folder, type, category);
      if (product) {
        products.push(product);
        allTags.add(product.tag);
      }
    });
  });

  return { products, tags: Array.from(allTags).sort() };
}

function createProduct(folderPath, folderName, type, category) {
  const configPath = path.join(folderPath, 'product.json');
  let config = {};
  
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.error(`❌ Invalid JSON in ${folderName}/product.json`);
      return null;
    }
  }

  const files = fs.readdirSync(folderPath);
  const images = files
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file) && file !== 'product.json')
    .sort()
    .map(file => `/images/${category}/${folderName}/${file}`);

  if (images.length === 0) {
    console.warn(`⚠️  No images found in ${folderName}`);
    return null;
  }

  const id = (config.id || folderName).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const name = config.name || folderName;
  const tag = config.tag || autoDetectTag(name);
  
  return {
    id,
    name,
    tag,
    type,
    price: config.price || CONFIG[type].price,
    mrp: config.mrp || CONFIG[type].mrp,
    images,
    sizes: config.sizes || CONFIG[type].sizes,
    series: config.series || CONFIG[type].series,
    featured: config.featured || false,
    stock: config.stock !== undefined ? config.stock : true,
    discount: config.discount || Math.round(((CONFIG[type].mrp - CONFIG[type].price) / CONFIG[type].mrp) * 100)
  };
}

function generateProductsFile(products) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2), 'utf8');
}

function generateTagsFile(tags) {
  const content = `// Auto-generated tags
export const tags = ${JSON.stringify(tags, null, 2)};

export const tagColors = {
  'Anime': '#FF6B6B',
  'Marvel': '#E63946',
  'Harry Potter': '#8B4513',
  'Movies': '#4ECDC4',
  'Quotes': '#95E1D3',
  'Mythology': '#F38181',
  'General': '#8C907E'
};
`;

  fs.writeFileSync(TAGS_FILE, content, 'utf8');
}

// Run
console.log('🔄 Scanning product folders...\n');
const { products, tags } = scanProductFolders();

console.log(`\n📊 Summary:`);
console.log(`   Products: ${products.length}`);
console.log(`   T-Shirts: ${products.filter(p => p.type === 'tee').length}`);
console.log(`   Hoodies: ${products.filter(p => p.type === 'hoodie').length}`);
console.log(`   Tags: ${tags.join(', ')}`);
console.log(`   Featured: ${products.filter(p => p.featured).length}`);

generateProductsFile(products);
generateTagsFile(tags);

console.log(`\n✅ Generated successfully!`);
