import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <SEO
        title="Page Not Found | ModSouls"
        description="The page you were looking for could not be found. Explore the latest ModSouls oversized T-shirts, hoodies, and custom merchandise instead."
        noindex
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="not-found-content"
        >
          <h1>Page Not Found</h1>
          <p className="error-code" aria-hidden="true">404</p>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/shop" className="btn btn-outline">Browse Shop</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
