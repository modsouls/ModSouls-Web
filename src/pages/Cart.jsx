import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ProgressiveImage from '../components/ProgressiveImage';
import { useStore } from '../context/StoreContext';
import { formatINR, getProductById, getImageSrc } from '../data/products';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();

  if (cart.length === 0) {
      return (
      <div className="cart-page">
        <SEO
          title="Your Cart | ModSouls"
          description="Review the ModSouls items in your cart before checkout."
          noindex
          includeDefaultSchemas={false}
          includeBreadcrumbSchema={false}
        />
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Explore our collection and add your favorite items</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <SEO
        title="Shopping Cart | ModSouls"
        description="Review your selected ModSouls products, quantities, and pricing before moving to checkout."
        noindex
        includeDefaultSchemas={false}
        includeBreadcrumbSchema={false}
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="cart-header">
            <h1 className="page-title">Shopping Cart</h1>
            <button className="btn btn-outline" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => {
                const product = getProductById(item.id) || item;
                const imgSrc = getImageSrc((product.images && product.images[0]) || '');
                return (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <ProgressiveImage
                    src={imgSrc}
                    alt={product.name}
                    className="item-image"
                    sizes="120px"
                  />
                  <div className="item-details">
                    <span className="item-tag">{product.tag}</span>
                    <h3 className="item-name">{product.name}</h3>
                    <p className="item-type">
                      {(product.type || item.type) === 'tee' ? 'Oversized T-Shirt (Unisex)' : 'Premium Hoodie (Unisex)'} • Size {item.size}
                    </p>
                  </div>
                  <div className="item-quantity">
                    <button type="button" onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} aria-label={`Decrease quantity of ${product.name}`}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} aria-label={`Increase quantity of ${product.name}`}>+</button>
                  </div>
                  <div className="item-price">
                    <span className="price-original">{formatINR(product.mrp || item.mrp)}</span>
                    <span className="price-current">{formatINR((product.price || item.price) * item.quantity)}</span>
                  </div>
                  <button
                    type="button"
                    className="item-remove"
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    ×
                  </button>
                </motion.div>
              ); })}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
              <button className="btn btn-primary btn-checkout" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/shop" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
