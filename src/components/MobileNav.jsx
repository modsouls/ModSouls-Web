import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import './MobileNav.css';

const MobileNav = () => {
  const location = useLocation();
  const { cartCount, wishlist } = useStore();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="mobile-nav-bottom">
      <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Home</span>
      </Link>

      <Link to="/shop" className={`mobile-nav-item ${isActive('/shop') ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
        <span>Shop</span>
      </Link>

      <Link to="/wishlist" className={`mobile-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Z"/>
        </svg>
        {wishlist.length > 0 && <span className="mobile-badge">{wishlist.length}</span>}
        <span>Wishlist</span>
      </Link>

      <Link to="/cart" className={`mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
        <span>Cart</span>
      </Link>
    </nav>
  );
};

export default MobileNav;
