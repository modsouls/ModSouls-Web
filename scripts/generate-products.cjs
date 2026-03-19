#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { collectProducts } = require('./lib/product-assets.cjs');

const OUTPUT_FILE = path.join(__dirname, '../src/data/products.json');

function main() {
  const { products, validationIssues } = collectProducts();

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(products, null, 2)}\n`, 'utf8');

  console.log(`Generated ${products.length} products in src/data/products.json`);
  console.log(`T-Shirts: ${products.filter((product) => product.type === 'tee').length}`);
  console.log(`Hoodies: ${products.filter((product) => product.type === 'hoodie').length}`);

  if (validationIssues.length > 0) {
    console.log('\nSkipped folders:');
    validationIssues.forEach((issue) => console.log(`- ${issue}`));
  }
}

main();
