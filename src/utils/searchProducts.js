import { products } from '../data/products';

const matchesQuery = (p, q) => {
  const query = q.toLowerCase();
  const tag = p.tag.toLowerCase();
  if (p.name.toLowerCase().includes(query)) return true;
  if (tag.includes(query)) return true;
  if (p.series.toLowerCase().includes(query)) return true;
  if (p.type.toLowerCase().includes(query)) return true;
  if (/anime/.test(query) && /naruto|jujutsu|one piece|solo leveling/.test(tag)) return true;
  if (/(harry|potter)/.test(query) && tag.includes('harry potter')) return true;
  if (/(marvel|spider)/.test(query) && tag.includes('marvel')) return true;
  if (query.includes('hoodie') && p.type === 'hoodie') return true;
  if (/(tshirt|t-shirt|tee)/.test(query) && p.type === 'tee') return true;
  return false;
};

export const searchProducts = (query, limit = 6) => {
  const q = (query || '').trim();
  if (q.length < 2) return [];
  return products.filter(p => matchesQuery(p, q)).slice(0, limit);
};

export const filterProducts = (opts) => {
  const { filter = 'all', seriesFilter = '', categoryFilter = [], searchTerm = '' } = opts;
  const getCategoryMatch = (p) => {
    const tag = p.tag.toLowerCase();
    if (/naruto|jujutsu|one piece|solo leveling/.test(tag)) return 'Anime';
    if (tag.includes('harry potter')) return 'Harry Potter';
    if (/marvel|spiderman/.test(tag)) return 'Marvel';
    if (/tmkoc|family man/.test(tag)) return 'Movies';
    if (/akarshan|dhurandar|anti-valentine|quotes|overthink/.test(tag)) return 'Quotes';
    return null;
  };
  return products.filter(p => {
    const matchFilter = filter === 'all' || p.type === filter;
    const matchSeries = !seriesFilter || p.series === seriesFilter;
    const matchCat = categoryFilter.length === 0 || categoryFilter.includes(getCategoryMatch(p));
    const matchSearch = !searchTerm.trim() || matchesQuery(p, searchTerm);
    return matchFilter && matchSeries && matchCat && matchSearch;
  });
};
