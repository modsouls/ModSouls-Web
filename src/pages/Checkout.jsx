import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const shippingCost = cartTotal > 1000 ? 0 : 100;
  const finalTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderDetails = `
ORDER DETAILS
=============

Customer Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Shipping Address:
${formData.address}
${formData.city}, ${formData.state} - ${formData.pincode}

Order Items:
${cart.map(item => `- ${item.name} (${item.type === 'tee' ? 'T-Shirt' : 'Hoodie'}) - Size: ${item.size} - Qty: ${item.quantity} - ${formatINR(item.price * item.quantity)}`).join('\n')}

Subtotal: ${formatINR(cartTotal)}
Shipping: ${shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}
Total: ${formatINR(finalTotal)}

${formData.notes ? `Notes: ${formData.notes}` : ''}
    `.trim();

    const subject = encodeURIComponent('New Order - ModSouls');
    const body = encodeURIComponent(orderDetails);
    
    window.location.href = `mailto:modsouls.in@gmail.com?subject=${subject}&body=${body}`;
    
    toast.success(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <span>Order placed! Check your email.</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0 4px',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
      ),
      { duration: 5000 }
    );
    
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Checkout</h1>
          
          <div className="checkout-layout">
            <div className="checkout-form">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <h2>Contact Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h2>Shipping Address</h2>
                  <div className="form-group">
                    <label>Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="Street address, apartment, suite, etc."
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Delhi"
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="Delhi"
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="110001"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Additional Notes</h2>
                  <div className="form-group">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Place Order
                </button>
              </form>
            </div>

            <div className="checkout-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="summary-item">
                    <img src={item.images[0]} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <span className="item-price">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatINR(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="shipping-note">Free shipping on orders above ₹1000</p>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>{formatINR(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
