import { products } from '../data/products';

const toLower = (value) => (value || '').toString().toLowerCase();

const normalizedProducts = products.map((p) => ({
  product: p,
  name: toLower(p?.name),
  tag: toLower(p?.tag),
  series: toLower(p?.series),
  type: toLower(p?.type)
}));

const getCategoryMatch = (p) => {
  const tag = toLower(p?.tag);
  if (/naruto|jujutsu|one piece|solo leveling/.test(tag)) return 'Anime';
  if (tag.includes('harry potter')) return 'Harry Potter';
  if (/marvel|spiderman/.test(tag)) return 'Marvel';
  if (/tmkoc|family man/.test(tag)) return 'Movies';
  if (/akarshan|dhurandar|anti-valentine|quotes|overthink/.test(tag)) return 'Quotes';
  return null;
};

const matchesQuery = (entry, q) => {
  const query = toLower(q);
  const { tag, name, series, type, product } = entry;
  if (name.includes(query)) return true;
  if (tag.includes(query)) return true;
  if (series.includes(query)) return true;
  if (type.includes(query)) return true;
  if (/anime/.test(query) && /naruto|jujutsu|one piece|solo leveling/.test(tag)) return true;
  if (/(harry|potter)/.test(query) && tag.includes('harry potter')) return true;
  if (/(marvel|spider)/.test(query) && tag.includes('marvel')) return true;
  if (query.includes('hoodie') && product?.type === 'hoodie') return true;
  if (/(tshirt|t-shirt|tee)/.test(query) && product?.type === 'tee') return true;
  return false;
};

export const searchProducts = (query, limit = 6) => {
  const q = (query || '').trim();
  if (q.length < 2) return [];
  return normalizedProducts.filter(entry => matchesQuery(entry, q)).slice(0, limit).map(entry => entry.product);
};

export const filterProducts = (opts) => {
  const { filter = 'all', seriesFilter = '', categoryFilter = [], searchTerm = '' } = opts;
  return normalizedProducts.filter(entry => {
    const { product } = entry;
    const matchFilter = filter === 'all' || product.type === filter;
    const matchSeries = !seriesFilter || product.series === seriesFilter;
    const matchCat = categoryFilter.length === 0 || categoryFilter.includes(getCategoryMatch(product));
    const matchSearch = !searchTerm.trim() || matchesQuery(entry, searchTerm);
    return matchFilter && matchSeries && matchCat && matchSearch;
  }).map(entry => entry.product);
};
