#!/usr/bin/env node

const { CATEGORY_CONFIG, validateCategory } = require('./lib/product-assets.cjs');

function main() {
  const allIssues = [];

  console.log('\nValidation Report');
  console.log('='.repeat(50));

  for (const categoryConfig of Object.values(CATEGORY_CONFIG)) {
    const issues = validateCategory(categoryConfig);
    allIssues.push(...issues);
    console.log(`${categoryConfig.label}: ${issues.length} issue(s)`);
  }

  console.log(`\nIssues Found: ${allIssues.length}\n`);

  if (allIssues.length > 0) {
    allIssues.forEach((issue) => console.log(`- ${issue}`));
    process.exitCode = 1;
    return;
  }

  console.log('All product folders are valid.');
}

main();
