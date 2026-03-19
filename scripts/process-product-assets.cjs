#!/usr/bin/env node

const {
  CATEGORY_CONFIG,
  normalizeCategoryAssets,
  syncCategorySources,
  validateCategory,
} = require('./lib/product-assets.cjs');

function printCategoryReport(categoryConfig, imported, normalized, issues) {
  console.log(`\n${categoryConfig.label}`);
  console.log('-'.repeat(categoryConfig.label.length));
  console.log(`Imported folders: ${imported.length}`);
  console.log(`Design folders: ${normalized.length}`);
  console.log(`Validation issues: ${issues.length}`);

  const renamedCount = normalized.reduce((total, entry) => total + entry.renamed.length, 0);
  console.log(`Images normalized: ${renamedCount}`);

  if (issues.length > 0) {
    issues.forEach((issue) => console.log(`  - ${issue}`));
  }
}

function main() {
  console.log('Syncing and normalizing product assets...');

  let totalIssues = 0;
  for (const categoryConfig of Object.values(CATEGORY_CONFIG)) {
    const imported = syncCategorySources(categoryConfig);
    const normalized = normalizeCategoryAssets(categoryConfig);
    const issues = validateCategory(categoryConfig);
    totalIssues += issues.length;
    printCategoryReport(categoryConfig, imported, normalized, issues);
  }

  if (totalIssues > 0) {
    console.log('\nAsset processing finished with warnings. Review the issues above before shipping.');
    return;
  }

  console.log('\nAsset processing completed successfully.');
}

main();
