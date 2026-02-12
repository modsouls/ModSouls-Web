import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { formatINR, getProductById, getImageSrc } from '../data/products';
import { toastWithDismiss } from '../utils/toastWithDismiss.jsx';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', notes: '' });

  useEffect(() => {
    if (cart.length === 0) navigate('/cart');
  }, [cart.length, navigate]);

  const shippingCost = cartTotal > 1000 ? 0 : 100;
  const finalTotal = cartTotal + shippingCost;

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const origin = window.location.origin;
    const orderDetails = `
ModSouls Order
================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Address:
${formData.address}
${formData.city}, ${formData.state} - ${formData.pincode}

Items:
${cart.map(item => {
  const p = getProductById(item.id) || item;
  const typeLabel = (p.type || item.type) === 'tee' ? 'T-Shirt' : 'Hoodie';
  return `- ${p.name} (${typeLabel}) | Size: ${item.size} | Qty: ${item.quantity} | ${formatINR((p.price || item.price) * item.quantity)} | ${origin}/product/${item.id}`;
}).join('\n')}

Subtotal: ${formatINR(cartTotal)}
Shipping: ${shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}
Total: ${formatINR(finalTotal)}
${formData.notes ? `\nNotes: ${formData.notes}` : ''}
    `.trim();

    const whatsappNumber = '918906915617';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
    window.location.href = whatsappUrl;
    toastWithDismiss('Opening WhatsApp with your order details...', { duration: 5000 });
  };

  if (cart.length === 0) return null;

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="page-title">Checkout</h1>
          <div className="checkout-layout">
            <div className="checkout-form">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <h2>Contact Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="checkout-name">Full Name *</label>
                      <input id="checkout-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkout-email">Email *</label>
                      <input id="checkout-email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-phone">Phone Number *</label>
                    <input id="checkout-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="form-section">
                  <h2>Shipping Address</h2>
                  <div className="form-group">
                    <label htmlFor="checkout-address">Address *</label>
                    <textarea id="checkout-address" name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="Street address, apartment, suite, etc." />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="checkout-city">City *</label>
                      <input id="checkout-city" type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Delhi" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkout-state">State *</label>
                      <input id="checkout-state" type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="Delhi" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkout-pincode">Pincode *</label>
                      <input id="checkout-pincode" type="text" name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="110001" />
                    </div>
                  </div>
                </div>
                <div className="form-section">
                  <h2>Additional Notes</h2>
                  <div className="form-group">
                    <label htmlFor="checkout-notes">Additional Notes</label>
                    <textarea id="checkout-notes" name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Any special instructions for delivery..." />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-full">Place Order</button>
              </form>
            </div>
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {cart.map((item) => {
                  const product = getProductById(item.id) || item;
                  const imgSrc = getImageSrc((product.images && product.images[0]) || '');
                  return (
                  <div key={`${item.id}-${item.size}`} className="summary-item">
                    <img src={imgSrc} alt={product.name} />
                    <div className="item-info">
                      <h4>{product.name}</h4>
                      <p>Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <span className="item-price">{formatINR((product.price || item.price) * item.quantity)}</span>
                  </div>
                ); })}
              </div>
              <div className="summary-totals">
                <div className="summary-row"><span>Subtotal</span><span>{formatINR(cartTotal)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}</span></div>
                {shippingCost > 0 && <p className="shipping-note">Free shipping on orders above ₹1000</p>}
                <div className="summary-total"><span>Total</span><span>{formatINR(finalTotal)}</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
