import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [seriesFilter, setSeriesFilter] = useState(searchParams.get('series') || '');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    const seriesParam = searchParams.get('series');
    const searchParam = searchParams.get('search');
    if (filterParam) setFilter(filterParam);
    if (seriesParam) setSeriesFilter(seriesParam);
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const params = {};
    if (newFilter !== 'all') params.filter = newFilter;
    if (seriesFilter) params.series = seriesFilter;
    setSearchParams(params);
  };

  const categories = ['Anime', 'Movies', 'Quotes', 'Marvel', 'Harry Potter'];

  const getCategoryMatch = (product) => {
    const tag = product.tag.toLowerCase();
    if (tag.includes('naruto') || tag.includes('jujutsu') || tag.includes('one piece') || tag.includes('solo leveling')) return 'Anime';
    if (tag.includes('harry potter')) return 'Harry Potter';
    if (tag.includes('marvel') || tag.includes('spiderman')) return 'Marvel';
    if (tag.includes('tmkoc') || tag.includes('family man')) return 'Movies';
    if (tag.includes('akarshan') || tag.includes('dhurandar') || tag.includes('anti-valentine')) return 'Quotes';
    return null;
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.type === filter;
    const matchesSeries = !seriesFilter || product.series === seriesFilter;
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(getCategoryMatch(product));
    
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      const tag = product.tag.toLowerCase();
      
      // Direct matches
      if (product.name.toLowerCase().includes(query)) return matchesFilter && matchesSeries && matchesCategory;
      if (tag.includes(query)) return matchesFilter && matchesSeries && matchesCategory;
      if (product.series.toLowerCase().includes(query)) return matchesFilter && matchesSeries && matchesCategory;
      if (product.type.toLowerCase().includes(query)) return matchesFilter && matchesSeries && matchesCategory;
      
      // Category keyword matches
      if (query.includes('anime') && (tag.includes('naruto') || tag.includes('jujutsu') || tag.includes('one piece') || tag.includes('solo leveling'))) {
        return matchesFilter && matchesSeries && matchesCategory;
      }
      if ((query.includes('harry') || query.includes('potter')) && tag.includes('harry potter')) {
        return matchesFilter && matchesSeries && matchesCategory;
      }
      if ((query.includes('marvel') || query.includes('spider')) && tag.includes('marvel')) {
        return matchesFilter && matchesSeries && matchesCategory;
      }
      if (query.includes('hoodie') && product.type === 'hoodie') {
        return matchesFilter && matchesSeries && matchesCategory;
      }
      if ((query.includes('tshirt') || query.includes('t-shirt') || query.includes('tee')) && product.type === 'tee') {
        return matchesFilter && matchesSeries && matchesCategory;
      }
      
      return false;
    }
    
    return matchesFilter && matchesSeries && matchesCategory;
  });

  return (
    <div className="shop-page">
      <SEO 
        title="Shop - Premium T-Shirts & Hoodies | ModSouls"
        description="Browse our collection of oversized t-shirts (₹599) and premium hoodies (₹1099). Anime, movies, and custom designs."
      />
      <Breadcrumbs />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="shop-header"
        >
          <div>
            <h1 className="page-title">Shop</h1>
            {searchTerm ? (
              <p className="page-subtitle">
                Search results for "{searchTerm}" ({filteredProducts.length} found)
              </p>
            ) : seriesFilter ? (
              <p className="page-subtitle">
                {seriesFilter} Collection
              </p>
            ) : (
              <p className="page-subtitle">
                Curated designs that speak louder than words. Premium quality meets bold expression.
              </p>
            )}
          </div>
          <div className="shop-controls">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === 'tee' ? 'active' : ''}`}
                onClick={() => handleFilterChange('tee')}
              >
                T-Shirts
              </button>
              <button
                className={`filter-btn ${filter === 'hoodie' ? 'active' : ''}`}
                onClick={() => handleFilterChange('hoodie')}
              >
                Hoodies
              </button>
              <button
                className="filter-btn filter-icon-btn"
                onClick={() => setShowFilters(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                  <circle cx="7" cy="6" r="2" fill="currentColor"/>
                  <circle cx="17" cy="12" r="2" fill="currentColor"/>
                  <circle cx="12" cy="18" r="2" fill="currentColor"/>
                </svg>
                Filters
              </button>
            </div>
          </div>
        </motion.div>

        <div className="products-count">
          Showing {filteredProducts.length} products
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              className="filter-modal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="filter-modal-header">
                <h2>Filters</h2>
                <button className="close-btn" onClick={() => setShowFilters(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="filter-modal-content">
                <div className="filter-section">
                  <h3>Series</h3>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${!seriesFilter ? 'active' : ''}`}
                      onClick={() => { setSeriesFilter(''); setSearchParams({}); }}
                    >
                      All Series
                    </button>
                    <button
                      className={`filter-option ${seriesFilter === 'On The Go Series' ? 'active' : ''}`}
                      onClick={() => { setSeriesFilter('On The Go Series'); setSearchParams({ series: 'On The Go Series' }); }}
                    >
                      On The Go Series
                    </button>
                    <button
                      className={`filter-option ${seriesFilter === 'On The Hood Series' ? 'active' : ''}`}
                      onClick={() => { setSeriesFilter('On The Hood Series'); setSearchParams({ series: 'On The Hood Series' }); }}
                    >
                      On The Hood Series
                    </button>
                  </div>
                </div>

                <div className="filter-section">
                  <h3>Categories</h3>
                  <div className="filter-options">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`filter-option ${categoryFilter.includes(cat) ? 'active' : ''}`}
                        onClick={() => {
                          setCategoryFilter(prev =>
                            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                          );
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-modal-footer">
                <button
                  className="clear-btn"
                  onClick={() => {
                    setSeriesFilter('');
                    setCategoryFilter([]);
                    setSearchParams({});
                  }}
                >
                  Clear All
                </button>
                <button className="apply-btn" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
