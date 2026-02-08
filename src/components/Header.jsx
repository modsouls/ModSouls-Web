import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { searchProducts } from '../utils/searchProducts';
import { getImageSrc } from '../data/products';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchQuery.trim().length > 1 ? searchProducts(searchQuery, 6) : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) { navigate(`/shop?search=${encodeURIComponent(searchQuery)}`); closeSearch(); }
  };

  const closeSearch = () => { setSearchQuery(''); setSearchOpen(false); };
  const handleResultClick = (productId) => { navigate(`/product/${productId}`); closeSearch(); };

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src="/images/tranlogonew.png" alt="Mod Souls" className="logo" />
          </Link>

          <Link to="/" className="brand-info">
            <h1 className="brand-name">ModSouls</h1>
            <p className="brand-tagline">Ordinary is Overrated, Be a ModSoul</p>
          </Link>

          <nav className="nav-links desktop-nav">
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/merchandising" className="nav-link">Merchandising</Link>
            <button 
              className="nav-link search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <Link to="/wishlist" className="nav-link wishlist-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Z"/>
              </svg>
              <span className="badge">{wishlist.length}</span>
            </Link>
            <Link to="/cart" className="nav-link cart-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="badge">{cartCount}</span>
            </Link>
          </nav>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="search-content">
              <form onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search: Naruto, Anime, Hoodie, Harry Potter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button type="button" className="close-search" onClick={closeSearch}>×</button>
                </div>
              </form>

              {searchQuery.length > 0 && searchQuery.length < 2 && (
                <div className="search-hint">
                  <p>Type at least 2 characters to search...</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <motion.div 
                  className="search-results"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="results-header">
                    <span>Quick Results</span>
                    {searchQuery && (
                      <button 
                        className="view-all-btn"
                        onClick={handleSearch}
                      >
                        View all results →
                      </button>
                    )}
                  </div>
                  {searchResults.map(product => (
                    <div 
                      key={product.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img src={getImageSrc(product.images?.[0])} alt={product.name} />
                      <div className="result-info">
                        <h4>{product.name}</h4>
                        <p>
                          <span className="result-tag">{product.tag}</span>
                          <span className="result-type">{product.type === 'tee' ? 'T-Shirt' : 'Hoodie'}</span>
                        </p>
                      </div>
                      <span className="result-price">₹{product.price}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="no-results">
                  <p>No products found for "{searchQuery}"</p>
                  <div className="search-suggestions">
                    <span className="suggestion-label">Try searching:</span>
                    <div className="suggestion-tags">
                      <button onClick={() => setSearchQuery('Anime')}>Anime</button>
                      <button onClick={() => setSearchQuery('Harry Potter')}>Harry Potter</button>
                      <button onClick={() => setSearchQuery('Naruto')}>Naruto</button>
                      <button onClick={() => setSearchQuery('Hoodie')}>Hoodie</button>
                      <button onClick={() => setSearchQuery('Marvel')}>Marvel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav">
              <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/size-guide" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Size Guide</Link>
              <Link to="/merchandising" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Merchandising</Link>
              <Link to="/wishlist" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Cart ({cartCount})
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
