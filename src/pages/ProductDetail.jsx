import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, formatINR, getImageSrc } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageZoom from '../components/ImageZoom';
import toast from 'react-hot-toast';
import './ProductDetail.css';

const shareToast = (message) => toast.success((t) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
    <span>{message}</span>
    <button onClick={() => toast.dismiss(t.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '0 4px', color: '#666' }}>×</button>
  </div>
), { duration: 3000 });

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = useMemo(() =>
    product ? products.filter(p => p.id !== product.id && (p.type === product.type || p.tag === product.tag)).slice(0, 4) : []
  , [product]);

  const shareProduct = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} on ModSouls!`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      copy: url
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      shareToast('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const typeLabel = product.type === 'tee' ? 'Oversized T-Shirt' : 'Premium Hoodie';

  return (
    <div className="product-detail">
      <SEO title={`${product.name} - ${typeLabel} | ModSouls`} description={`${product.name} - ${product.tag}. ${formatINR(product.price)} (was ${formatINR(product.mrp)}). Premium quality ${product.type === 'tee' ? 'oversized t-shirt' : 'hoodie'}.`} />
      <Breadcrumbs />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="product-layout">
          <div className="product-gallery">
            <div className="thumbnails">
              {product.images.map((img, index) => (
                <img key={index} src={getImageSrc(img)} alt={`${product.name} ${index + 1}`} className={`thumbnail ${selectedImage === index ? 'active' : ''}`} onClick={() => setSelectedImage(index)} />
              ))}
            </div>
            <div className="main-image">
              <ImageZoom src={getImageSrc(product.images[selectedImage])} alt={product.name} />
              {product.images.length > 1 && (
                <>
                  <button type="button" className="nav-btn prev" onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}>‹</button>
                  <button type="button" className="nav-btn next" onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}>›</button>
                </>
              )}
            </div>
          </div>

          <div className="product-info">
            <div className="product-meta">
              {product.series && <span className="product-series">{product.series}</span>}
              <span className="product-tag">{product.tag}</span>
              <span className="product-type">{product.type === 'tee' ? 'Oversized T-Shirt (Unisex)' : 'Premium Hoodie (Unisex)'}</span>
            </div>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-pricing">
              <span className="price-original">{formatINR(product.mrp)}</span>
              <span className="price-current">{formatINR(product.price)}</span>
            </div>

            <div className="product-options">
              <div className="options-row">
                <div className="option-group">
                  <label>Size</label>
                  <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="size-dropdown">
                    {product.sizes.map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                  {product.type === 'tee' && <Link to="/size-guide" className="size-guide-link">📏 View Size Guide</Link>}
                </div>
                <div className="option-group">
                  <label>Quantity</label>
                  <div className="quantity-selector">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" max="99" />
                    <button type="button" onClick={() => setQuantity(Math.min(99, quantity + 1))}>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-share">
              <h3>Share this product</h3>
              <div className="share-buttons">
                <button type="button" onClick={() => shareProduct('facebook')} className="share-btn facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
                <button type="button" onClick={() => shareProduct('twitter')} className="share-btn twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
                <button type="button" onClick={() => shareProduct('whatsapp')} className="share-btn whatsapp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>
                <button type="button" onClick={() => shareProduct('copy')} className="share-btn copy"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
              </div>
            </div>

            <div className="product-actions">
              <button type="button" className="btn btn-primary" onClick={() => addToCart(product, selectedSize, quantity)}>Add to Cart</button>
              <button type="button" className={`btn btn-outline ${inWishlist ? 'active' : ''}`} onClick={() => toggleWishlist(product)}>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</button>
              <Link to="/shop" className="btn btn-outline">Back to Shop</Link>
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="related-products">
            <h2>You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
