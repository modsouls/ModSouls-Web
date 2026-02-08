import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import './Breadcrumbs.css';

const NAMES = { shop: 'Shop', product: 'Product', cart: 'Cart', checkout: 'Checkout', wishlist: 'Wishlist', about: 'About Us', contact: 'Contact', merchandising: 'Merchandising', 'size-guide': 'Size Guide' };

const Breadcrumbs = () => {
  const pathnames = useLocation().pathname.split('/').filter(Boolean);
  if (pathnames.length === 0) return null;

  const getDisplayName = (name, index) => {
    if (name === 'product' && pathnames[index + 1]) {
      const p = products.find(pr => pr.id === pathnames[index + 1]);
      return p ? p.name : NAMES[name];
    }
    return NAMES[name] || name.replace(/-/g, ' ');
  };

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(name, index);
        return (
          <span key={routeTo}>
            <span className="separator">›</span>
            {isLast ? <span className="current">{displayName}</span> : <Link to={routeTo}>{displayName}</Link>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
