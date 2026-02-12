import { useFormState } from '../utils/useFormState';
import { motion } from 'framer-motion';
import { toastWithDismiss } from '../utils/toastWithDismiss.jsx';
import './Merchandising.css';

const Merchandising = () => {
  const { formData, handleChange } = useFormState({
    name: '',
    location: '',
    requirement: '',
    quantity: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `
MODSOULS MERCH ENQUIRY
-------------------------
CONTACT
Name: ${formData.name}
Location: ${formData.location}

REQUIREMENT
Type: ${formData.requirement}
Quantity: ${formData.quantity}
Budget: ${formData.budget}

MESSAGE
${formData.message || '-'}
    `.trim();

    const whatsappNumber = '918918216431';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = whatsappUrl;
    toastWithDismiss('Opening WhatsApp...');
  };

  return (
    <div className="merchandising-page">
      <section className="merch-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-text"
          >
            <h1>Custom Merchandising</h1>
            <p>Transform your vision into premium custom apparel for your brand, event, or team</p>
          </motion.div>
        </div>
      </section>

      <section className="merch-features">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="features-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">🎨</div>
              <h3>Custom Designs</h3>
              <p>Work with our design team to create unique artwork that captures your brand identity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="feature-card"
            >
              <div className="feature-icon">👕</div>
              <h3>Premium Quality</h3>
              <p>High-grade fabrics and advanced printing techniques ensure lasting quality</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="feature-card"
            >
              <div className="feature-icon">📦</div>
              <h3>Bulk Orders</h3>
              <p>Competitive pricing for large quantities with flexible minimum order requirements</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="feature-card"
            >
              <div className="feature-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>Efficient production with quick delivery timelines to meet your deadlines</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="merch-process">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            How It Works
          </motion.h2>
          
          <div className="process-steps">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="step"
            >
              <div className="step-number">01</div>
              <h3>Share Your Vision</h3>
              <p>Tell us about your requirements, design ideas, and quantity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="step"
            >
              <div className="step-number">02</div>
              <h3>Design & Quote</h3>
              <p>We create mockups and provide a detailed quote</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="step"
            >
              <div className="step-number">03</div>
              <h3>Production</h3>
              <p>Once approved, we begin production with premium materials</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="step"
            >
              <div className="step-number">04</div>
              <h3>Delivery</h3>
              <p>Fast and secure delivery to your location</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="merch-main">
        <div className="container">
          <div className="merch-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="form-section"
            >
              <h2>Get in Touch</h2>
              <p className="form-intro">Fill out the form and we'll get back to you within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="merch-form">
                <div className="form-group">
                  <label htmlFor="merch-name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="merch-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-location">Location *</label>
                  <input
                    type="text"
                    name="location"
                    id="merch-location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City, State"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-requirement">Requirement *</label>
                  <select
                    name="requirement"
                    id="merch-requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Both">Both</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="merch-quantity">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    id="merch-quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="Number of pieces"
                    min="10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-budget">Budget (INR) *</label>
                  <input
                    type="text"
                    name="budget"
                    id="merch-budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    placeholder="Your budget range"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-message">Message</label>
                  <textarea
                    name="message"
                    id="merch-message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Send Enquiry
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="image-section"
            >
              <img src="/images/Merchandising Poster.png" alt="Custom Merchandising" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandising;
