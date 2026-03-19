import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { filterProducts } from '../utils/searchProducts';
import './Shop.css';

const CATEGORIES = ['Anime', 'Movies', 'Quotes', 'Marvel', 'Harry Potter'];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(() => searchParams.get('filter') || 'all');
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
  const [seriesFilter, setSeriesFilter] = useState(() => searchParams.get('series') || '');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const f = searchParams.get('filter');
    const s = searchParams.get('series');
    const q = searchParams.get('search');
    if (f) setFilter(f);
    if (s) setSeriesFilter(s);
    if (q != null) setSearchTerm(q || '');
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      const params = {};
      if (filter !== 'all') params.filter = filter;
      if (seriesFilter) params.series = seriesFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      setSearchParams(params, { replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [filter, seriesFilter, searchTerm, setSearchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredProducts = useMemo(() => filterProducts({ filter, seriesFilter, categoryFilter, searchTerm }), [filter, seriesFilter, categoryFilter, searchTerm]);

  const closeFilters = () => setShowFilters(false);
  const setSeries = (v) => { setSeriesFilter(v); };
  const toggleCategory = (cat) => setCategoryFilter(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const clearFilters = () => { setSeriesFilter(''); setCategoryFilter([]); };
  const primaryKeyword = filter === 'hoodie'
    ? 'hoodies India'
    : filter === 'tee'
      ? 'oversized t-shirts India'
      : 'streetwear India';
  const shopDescription = searchTerm
    ? `Browse ${filteredProducts.length} ModSouls products matching "${searchTerm}" including oversized T-shirts, hoodies, and pop-culture streetwear.`
    : seriesFilter
      ? `Explore the ${seriesFilter} collection from ModSouls featuring premium oversized apparel and distinctive graphic designs.`
      : 'Browse the ModSouls collection of oversized T-shirts, premium hoodies, anime-inspired apparel, and statement streetwear made for India.';

  return (
    <div className="shop-page">
      <SEO
        title={searchTerm ? `${searchTerm} Search Results | Shop ModSouls` : seriesFilter ? `${seriesFilter} | Shop ModSouls` : 'Shop Oversized T-Shirts & Hoodies | ModSouls'}
        description={shopDescription}
        keywords={[
          'shop ModSouls',
          primaryKeyword,
          seriesFilter || 'anime streetwear',
          searchTerm || 'graphic tees',
        ]}
      />
      <Breadcrumbs />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="shop-header">
          <div>
            <h1 className="page-title">Shop</h1>
            <p className="page-subtitle">
              {searchTerm ? `Search results for "${searchTerm}" (${filteredProducts.length} found)` : seriesFilter ? `${seriesFilter} Collection` : 'Curated designs that speak louder than words. Premium quality meets bold expression.'}
            </p>
          </div>
          <div className="shop-controls">
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
            <div className="filter-buttons">
              {[['all', 'All'], ['tee', 'T-Shirts'], ['hoodie', 'Hoodies']].map(([val, label]) => (
                <button key={val} className={`filter-btn ${filter === val ? 'active' : ''}`} onClick={() => handleFilterChange(val)}>{label}</button>
              ))}
              <button className="filter-btn filter-icon-btn" onClick={() => setShowFilters(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
                  <circle cx="7" cy="6" r="2" fill="currentColor"/><circle cx="17" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="18" r="2" fill="currentColor"/>
                </svg>
                Filters
              </button>
            </div>
          </div>
        </motion.div>

        <div className="products-count">Showing {filteredProducts.length} products</div>
        <div className="product-grid">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
        {filteredProducts.length === 0 && <div className="no-products"><p>No products found matching your criteria.</p></div>}
      </div>

      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div className="filter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeFilters} />
            <motion.div className="filter-modal" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="filter-modal-header">
                <h2>Filters</h2>
                <button className="close-btn" onClick={closeFilters} aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="filter-modal-content">
                <div className="filter-section">
                  <h3>Series</h3>
                  <div className="filter-options">
                    <button className={`filter-option ${!seriesFilter ? 'active' : ''}`} onClick={() => setSeries('')}>All Series</button>
                    <button className={`filter-option ${seriesFilter === 'On The Go Series' ? 'active' : ''}`} onClick={() => setSeries('On The Go Series')}>On The Go Series</button>
                    <button className={`filter-option ${seriesFilter === 'On The Hood Series' ? 'active' : ''}`} onClick={() => setSeries('On The Hood Series')}>On The Hood Series</button>
                  </div>
                </div>
                <div className="filter-section">
                  <h3>Categories</h3>
                  <div className="filter-options">
                    {CATEGORIES.map(cat => <button key={cat} className={`filter-option ${categoryFilter.includes(cat) ? 'active' : ''}`} onClick={() => toggleCategory(cat)}>{cat}</button>)}
                  </div>
                </div>
              </div>
              <div className="filter-modal-footer">
                <button className="clear-btn" onClick={clearFilters}>Clear All</button>
                <button className="apply-btn" onClick={closeFilters}>Apply Filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
