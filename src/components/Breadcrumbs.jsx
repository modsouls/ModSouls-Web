import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNames = {
    shop: 'Shop',
    product: 'Product',
    cart: 'Cart',
    checkout: 'Checkout',
    wishlist: 'Wishlist',
    about: 'About Us',
    contact: 'Contact',
    merchandising: 'Merchandising',
    'size-guide': 'Size Guide'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNames[name] || name.replace(/-/g, ' ');

        return (
          <span key={routeTo}>
            <span className="separator">›</span>
            {isLast ? (
              <span className="current">{displayName}</span>
            ) : (
              <Link to={routeTo}>{displayName}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
