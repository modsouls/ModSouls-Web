import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://modsouls.in';
const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const today = new Date().toISOString().split('T')[0];
const products = JSON.parse(
  await fs.readFile(path.join(ROOT, 'src/data/products.json'), 'utf8'),
);

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/shop', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/merchandising', changefreq: 'weekly', priority: '0.8' },
  { path: '/size-guide', changefreq: 'monthly', priority: '0.6' },
];

const productRoutes = products.map((product) => ({
  path: `/product/${product.id}`,
  changefreq: 'weekly',
  priority: product.featured ? '0.9' : '0.8',
}));

const allRoutes = [...staticRoutes, ...productRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${routePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api
Disallow: /admin
Disallow: /cart
Disallow: /checkout
Disallow: /wishlist

Sitemap: ${SITE_URL}/sitemap.xml
`;

await fs.mkdir(PUBLIC_DIR, { recursive: true });
await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap.xml (${allRoutes.length} URLs) and robots.txt`);
