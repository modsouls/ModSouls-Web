import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="not-found-content"
        >
          <h1 className="error-code">404</h1>
          <h2>Page Not Found</h2>
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
