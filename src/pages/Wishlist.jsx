import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
      return (
      <div className="wishlist-page">
        <SEO
          title="Wishlist | ModSouls"
          description="View your saved ModSouls products and come back when you're ready to shop."
          noindex
          includeDefaultSchemas={false}
          includeBreadcrumbSchema={false}
        />
        <div className="container">
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items for later</p>
            <Link to="/shop" className="btn btn-primary">Explore Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <SEO
        title="My Wishlist | ModSouls"
        description="Browse the ModSouls products you have saved for later."
        noindex
        includeDefaultSchemas={false}
        includeBreadcrumbSchema={false}
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-subtitle">{wishlist.length} items saved</p>

          <div className="product-grid">
            {wishlist.map((item) => {
              const product = getProductById(item.id) || item;
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;
