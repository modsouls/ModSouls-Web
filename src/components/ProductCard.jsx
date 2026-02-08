import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { formatINR, getImageSrc } from '../data/products';
import ProgressiveImage from './ProgressiveImage';
import './ProductCard.css';

const ProductCard = memo(({ product }) => {
  const { toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);
  const [hoveredImage, setHoveredImage] = useState(0);

  return (
    <motion.div className="product-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <div className="product-image-wrapper" onMouseEnter={() => product.images.length > 1 && setHoveredImage(1)} onMouseLeave={() => setHoveredImage(0)}>
        <Link to={`/product/${product.id}`}>
          <ProgressiveImage src={getImageSrc(product.images?.[hoveredImage] || product.images?.[0])} alt={product.name} className="product-image" />
        </Link>
        <button type="button" className={`wishlist-btn ${inWishlist ? 'active' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Add to wishlist">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor">
            <path d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z" />
          </svg>
        </button>
      </div>
      <div className="product-content">
        <span className="product-tag">{product.tag}</span>
        <Link to={`/product/${product.id}`}><h3 className="product-name">{product.name}</h3></Link>
        <p className="product-type">{product.type === 'tee' ? 'Oversized T-Shirt (Unisex)' : 'Premium Hoodie (Unisex)'}</p>
        <div className="product-price">
          <span className="price-original">{formatINR(product.mrp)}</span>
          <span className="price-current">{formatINR(product.price)}</span>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
