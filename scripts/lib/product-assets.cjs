const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const PUBLIC_IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PRODUCTS_DATA_FILE = path.join(ROOT, 'src', 'data', 'products.json');
const PRODUCT_META_FILENAME = 'product.json';
const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif']);
const IGNORED_FILENAMES = new Set(['.ds_store']);

const CATEGORY_CONFIG = {
  tee: {
    key: 'tee',
    type: 'tee',
    category: 'tee',
    label: 'Oversized T-Shirts',
    routeLabel: 'Oversized T-Shirt',
    publicSegment: 'Oversized Tshirts',
    targetDir: path.join(PUBLIC_IMAGES_DIR, 'Oversized Tshirts'),
    sourceDirs: [path.resolve(ROOT, '..', 'Oversized Tshirts')],
    folderAliases: {
      akarshan: 'Sukuna',
      'quote-pintu': 'Overthink Quote',
    },
    price: 599,
    mrp: 699,
    series: 'On The Go Series',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  },
  hoodie: {
    key: 'hoodie',
    type: 'hoodie',
    category: 'hoodie',
    label: 'Hoodies',
    routeLabel: 'Premium Hoodie',
    publicSegment: 'Hoodies',
    targetDir: path.join(PUBLIC_IMAGES_DIR, 'Hoodies'),
    sourceDirs: [path.join(PUBLIC_IMAGES_DIR, 'Hoodie')],
    folderAliases: {
      'anti-valentine': 'Anti Valentine',
      'sukuna-jjk': 'Sukuna Jjk',
      'deathly-hollows': 'Deathly Hollows',
    },
    price: 1099,
    mrp: 1399,
    series: 'On The Hood Series',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  },
};

const TAG_KEYWORDS = {
  'Jujutsu Kaisen': ['sukuna', 'gojo', 'jjk', 'jujutsu'],
  Naruto: ['naruto', 'sasuke', 'kakashi', 'madara'],
  'One Piece': ['one piece', 'luffy', 'loki', 'whitebeard', 'ace', 'zoro'],
  'Harry Potter': ['harry potter', 'deathly hollows', 'slytherin'],
  Marvel: ['spiderman', 'avengers', 'marvel', 'doom'],
  'Stranger Things': ['stranger things'],
  Quotes: ['quote', 'discipline', 'can you remember', 'heart and soul'],
  Mythology: ['shiva', 'shivratri', 'divine wrath'],
  Movies: ['jethalal', 'family man', 'friends'],
  General: [],
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
  return (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}

function toDisplayName(rawValue) {
  return slugify(rawValue)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function isSupportedImage(filename) {
  return SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function hashFile(filePath) {
  const crypto = require('crypto');
  return crypto.createHash('sha1').update(fs.readFileSync(filePath)).digest('hex');
}

function listDirDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(naturalSort);
}

function readProductMeta(folderPath) {
  const metaPath = path.join(folderPath, PRODUCT_META_FILENAME);
  if (!fs.existsSync(metaPath)) return {};

  try {
    const parsed = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return { __metaError: error.message };
  }
}

function walkImageFiles(dirPath, relativeBase = '') {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true }).sort((a, b) => naturalSort(a.name, b.name));
  for (const entry of entries) {
    if (IGNORED_FILENAMES.has(entry.name.toLowerCase())) continue;
    const absolutePath = path.join(dirPath, entry.name);
    const relativePath = relativeBase ? path.join(relativeBase, entry.name) : entry.name;

    if (entry.isDirectory()) {
      results.push(...walkImageFiles(absolutePath, relativePath));
      continue;
    }

    if (entry.name === PRODUCT_META_FILENAME) continue;
    if (!isSupportedImage(entry.name)) continue;

    results.push({
      absolutePath,
      relativePath: relativePath.replace(/\\/g, '/'),
      name: entry.name,
      extension: path.extname(entry.name).toLowerCase(),
    });
  }

  return results;
}

function scoreImagePriority(file, coverRelativePath) {
  const relative = file.relativePath.toLowerCase();
  const name = file.name.toLowerCase();
  let score = 0;

  if (coverRelativePath && relative === coverRelativePath.toLowerCase()) score += 1000;
  if (/cover|front|model|main|hero/.test(name)) score += 50;
  if (/(^|[_-])1($|[_-])|01/.test(name)) score += 25;
  if (/back|poster|pdf|follow|download|chatgpt/.test(name)) score -= 30;
  if (/^img_|^dsc|^pxl/.test(name)) score -= 5;

  return score;
}

function reorderImages(files, meta = {}) {
  // `coverImage` or `coverIndex` lets us manually promote a preferred first shot.
  const coverRelativePath = meta.coverImage ? meta.coverImage.replace(/\\/g, '/').replace(/^\.\//, '') : null;
  const sorted = [...files].sort((a, b) => {
    const scoreDiff = scoreImagePriority(b, coverRelativePath) - scoreImagePriority(a, coverRelativePath);
    if (scoreDiff !== 0) return scoreDiff;
    return naturalSort(a.relativePath, b.relativePath);
  });

  if (Number.isInteger(meta.coverIndex) && meta.coverIndex > 0 && meta.coverIndex <= sorted.length) {
    const [selected] = sorted.splice(meta.coverIndex - 1, 1);
    sorted.unshift(selected);
  }

  return sorted;
}

function uniquePath(targetPath) {
  if (!fs.existsSync(targetPath)) return targetPath;
  const dir = path.dirname(targetPath);
  const ext = path.extname(targetPath);
  const base = path.basename(targetPath, ext);
  let attempt = 2;
  while (true) {
    const candidate = path.join(dir, `${base}-${attempt}${ext}`);
    if (!fs.existsSync(candidate)) return candidate;
    attempt += 1;
  }
}

function copyFileIfMissing(sourcePath, destinationPath) {
  ensureDir(path.dirname(destinationPath));
  if (!fs.existsSync(destinationPath)) {
    fs.copyFileSync(sourcePath, destinationPath);
  }
}

function syncCategorySources(categoryConfig) {
  ensureDir(categoryConfig.targetDir);
  const targetFolders = new Map(
    listDirDirectories(categoryConfig.targetDir).map((folderName) => [slugify(folderName), folderName]),
  );
  const imported = [];

  for (const sourceDir of categoryConfig.sourceDirs) {
    if (!fs.existsSync(sourceDir)) continue;

    for (const sourceFolderName of listDirDirectories(sourceDir)) {
      const sourceFolderPath = path.join(sourceDir, sourceFolderName);
      const folderSlug = slugify(sourceFolderName);
      const canonicalFolderName = categoryConfig.folderAliases?.[folderSlug];
      const targetFolderName = targetFolders.get(folderSlug)
        || canonicalFolderName
        || toDisplayName(sourceFolderName)
        || sourceFolderName.trim();
      const targetFolderPath = path.join(categoryConfig.targetDir, targetFolderName);
      ensureDir(targetFolderPath);
      targetFolders.set(folderSlug, targetFolderName);
      const existingHashes = new Set(
        walkImageFiles(targetFolderPath).map((file) => hashFile(file.absolutePath)),
      );

      const files = walkImageFiles(sourceFolderPath);
      for (const file of files) {
        const fileHash = hashFile(file.absolutePath);
        if (existingHashes.has(fileHash)) continue;
        // Flatten nested source folders into a single design directory in public/.
        const destinationPath = uniquePath(path.join(targetFolderPath, path.basename(file.relativePath)));
        copyFileIfMissing(file.absolutePath, destinationPath);
        existingHashes.add(fileHash);
      }

      const sourceMetaPath = path.join(sourceFolderPath, PRODUCT_META_FILENAME);
      const targetMetaPath = path.join(targetFolderPath, PRODUCT_META_FILENAME);
      if (fs.existsSync(sourceMetaPath) && !fs.existsSync(targetMetaPath)) {
        copyFileIfMissing(sourceMetaPath, targetMetaPath);
      }

      imported.push({ sourceDir, sourceFolderName, targetFolderName });
    }
  }

  return imported;
}

function normalizeCategoryAssets(categoryConfig) {
  ensureDir(categoryConfig.targetDir);
  const folders = listDirDirectories(categoryConfig.targetDir);
  const report = [];

  for (const folderName of folders) {
    const folderPath = path.join(categoryConfig.targetDir, folderName);
    const meta = readProductMeta(folderPath);
    const issues = [];
    if (meta.__metaError) issues.push(`Invalid product.json: ${meta.__metaError}`);

    const images = walkImageFiles(folderPath);
    if (images.length === 0) {
      issues.push('No supported images found');
      report.push({ folderName, folderPath, slug: slugify(folderName), imageCount: 0, issues, renamed: [] });
      continue;
    }

    const orderedImages = reorderImages(images, meta);
    const uniqueImages = [];
    const seenHashes = new Set();

    for (const file of orderedImages) {
      const fileHash = hashFile(file.absolutePath);
      if (seenHashes.has(fileHash)) {
        fs.unlinkSync(file.absolutePath);
        continue;
      }
      seenHashes.add(fileHash);
      uniqueImages.push(file);
    }

    const folderSlug = slugify(meta.slug || meta.name || folderName);
    const tempMoves = [];
    const finalNames = [];

    uniqueImages.forEach((file, index) => {
      const extension = file.extension === '.jfif' ? '.jpg' : file.extension;
      const targetName = `${folderSlug}_${index + 1}${extension}`;
      const tempName = `__tmp__${folderSlug}_${index + 1}_${Date.now()}_${index}${extension}`;
      const tempPath = path.join(folderPath, tempName);
      fs.renameSync(file.absolutePath, tempPath);
      tempMoves.push({ tempPath, targetName, originalRelativePath: file.relativePath });
      finalNames.push(targetName);
    });

    for (const moved of tempMoves) {
      const destinationPath = uniquePath(path.join(folderPath, moved.targetName));
      fs.renameSync(moved.tempPath, destinationPath);
      moved.finalPath = destinationPath;
      moved.finalName = path.basename(destinationPath);
    }

    removeNestedDirectories(folderPath);

    report.push({
      folderName,
      folderPath,
      slug: folderSlug,
      imageCount: finalNames.length,
      issues,
      renamed: tempMoves.map((entry) => ({ from: entry.originalRelativePath, to: entry.finalName })),
      meta,
    });
  }

  return report;
}

function removeNestedDirectories(folderPath) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const absolutePath = path.join(folderPath, entry.name);
    if (fs.readdirSync(absolutePath).length === 0) {
      fs.rmdirSync(absolutePath);
    }
  }
}

function autoDetectTag(name) {
  const normalized = ` ${slugify(name).replace(/-/g, ' ')} `;
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(` ${keyword} `))) {
      return tag;
    }
  }
  return 'General';
}

function getExistingProductMap() {
  if (!fs.existsSync(PRODUCTS_DATA_FILE)) return new Map();

  try {
    const existingProducts = JSON.parse(fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8'));
    if (!Array.isArray(existingProducts)) return new Map();

    const map = new Map();
    for (const product of existingProducts) {
      map.set(`${product.type}:${slugify(product.slug || product.name)}`, product);
      map.set(`${product.type}:${slugify(product.name)}`, product);
    }
    return map;
  } catch (error) {
    return new Map();
  }
}

function buildProductFromFolder(categoryConfig, folderName, existingProduct) {
  const folderPath = path.join(categoryConfig.targetDir, folderName);
  const meta = readProductMeta(folderPath);
  const imageEntries = walkImageFiles(folderPath)
    .sort((a, b) => naturalSort(a.name, b.name));
  const images = imageEntries
    .map((file) => `/images/${categoryConfig.publicSegment}/${folderName}/${path.basename(file.absolutePath)}`.replace(/\\/g, '/'));

  if (images.length === 0 || meta.__metaError) return null;

  const displayName = meta.name || existingProduct?.name || toDisplayName(folderName) || folderName;
  const slug = slugify(meta.slug || existingProduct?.slug || displayName || folderName);
  const id = meta.id || existingProduct?.id || `${categoryConfig.type}-${slug}`;
  const tag = meta.tag || existingProduct?.tag || autoDetectTag(displayName);
  const updatedAt = new Date(
    Math.max(
      ...imageEntries.map((entry) => fs.statSync(entry.absolutePath).mtimeMs),
      fs.statSync(folderPath).mtimeMs,
    ),
  ).toISOString();

  return {
    id,
    type: categoryConfig.type,
    name: displayName,
    slug,
    tag,
    series: meta.series || existingProduct?.series || categoryConfig.series,
    images,
    coverImage: images[0],
    updatedAt,
    mrp: Number.isFinite(meta.mrp) ? meta.mrp : existingProduct?.mrp || categoryConfig.mrp,
    price: Number.isFinite(meta.price) ? meta.price : existingProduct?.price || categoryConfig.price,
    sizes: Array.isArray(meta.sizes) && meta.sizes.length ? meta.sizes : existingProduct?.sizes || categoryConfig.sizes,
    category: categoryConfig.category,
    categoryLabel: categoryConfig.label,
    featured: meta.featured === true || existingProduct?.featured === true,
  };
}

function collectProducts() {
  const products = [];
  const validationIssues = [];
  const existingProductMap = getExistingProductMap();

  for (const categoryConfig of Object.values(CATEGORY_CONFIG)) {
    ensureDir(categoryConfig.targetDir);
    for (const folderName of listDirDirectories(categoryConfig.targetDir)) {
      const lookupKey = `${categoryConfig.type}:${slugify(folderName)}`;
      const product = buildProductFromFolder(categoryConfig, folderName, existingProductMap.get(lookupKey));
      if (product) {
        products.push(product);
      } else {
        validationIssues.push(`${categoryConfig.publicSegment}/${folderName}: skipped because it has no usable images or invalid metadata`);
      }
    }
  }

  products.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return naturalSort(a.name, b.name);
  });

  return { products, validationIssues };
}

function validateCategory(categoryConfig) {
  const issues = [];
  const folders = listDirDirectories(categoryConfig.targetDir);
  const seenSlugs = new Map();

  for (const folderName of folders) {
    const folderPath = path.join(categoryConfig.targetDir, folderName);
    const meta = readProductMeta(folderPath);
    const images = walkImageFiles(folderPath);
    const folderSlug = slugify(folderName);

    if (seenSlugs.has(folderSlug)) {
      issues.push(`${categoryConfig.publicSegment}/${folderName}: duplicate slug with ${seenSlugs.get(folderSlug)}`);
    } else {
      seenSlugs.set(folderSlug, folderName);
    }

    if (meta.__metaError) issues.push(`${categoryConfig.publicSegment}/${folderName}: invalid product.json (${meta.__metaError})`);
    if (images.length === 0) issues.push(`${categoryConfig.publicSegment}/${folderName}: empty folder or unsupported formats only`);

    const unsupported = fs.readdirSync(folderPath)
      .filter((name) => !IGNORED_FILENAMES.has(name.toLowerCase()))
      .filter((name) => {
        const absolutePath = path.join(folderPath, name);
        return fs.statSync(absolutePath).isFile() && name !== PRODUCT_META_FILENAME && !isSupportedImage(name);
      });
    if (unsupported.length > 0) {
      issues.push(`${categoryConfig.publicSegment}/${folderName}: unsupported files -> ${unsupported.join(', ')}`);
    }
  }

  return issues;
}

module.exports = {
  ROOT,
  CATEGORY_CONFIG,
  PRODUCTS_DATA_FILE,
  PRODUCT_META_FILENAME,
  ensureDir,
  slugify,
  toDisplayName,
  syncCategorySources,
  normalizeCategoryAssets,
  collectProducts,
  validateCategory,
  autoDetectTag,
};
