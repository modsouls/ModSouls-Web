import { useFormState } from '../utils/useFormState';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { toastWithDismiss } from '../utils/toastWithDismiss.jsx';
import './Merchandising.css';

const Merchandising = () => {
  const { formData, handleChange } = useFormState({
    name: '',
    location: '',
    requirement: '',
    quantityRange: '',
    budgetRange: '',
    timeline: '',
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
Quantity Range: ${formData.quantityRange}
Budget Range: ${formData.budgetRange}
Timeline: ${formData.timeline}

MESSAGE
${formData.message || '-'}
    `.trim();

    const whatsappNumber = '918918216431';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      toastWithDismiss('Popup blocked. Please allow popups to open WhatsApp.', { type: 'error', duration: 5000 });
      return;
    }
    toastWithDismiss('Opening WhatsApp...');
  };

  return (
    <div className="merchandising-page">
      <SEO
        title="Custom Merchandising | Bulk T-Shirts, Hoodies and Brand Merch by ModSouls"
        description="Create premium custom merchandise with ModSouls. Get branded T-shirts, hoodies, event merch, team apparel, and bulk orders with fast turnaround across India."
        keywords={['custom merchandising India', 'bulk hoodies India', 'bulk t-shirts India', 'brand merchandise', 'event apparel']}
      />
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
                  <label htmlFor="merch-quantity-range">Quantity Range *</label>
                  <select
                    name="quantityRange"
                    id="merch-quantity-range"
                    value={formData.quantityRange}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select quantity range</option>
                    <option value="10-25">10-25 pieces</option>
                    <option value="26-50">26-50 pieces</option>
                    <option value="51-100">51-100 pieces</option>
                    <option value="101-250">101-250 pieces</option>
                    <option value="250+">250+ pieces</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="merch-budget-range">Budget Range (INR) *</label>
                  <select
                    name="budgetRange"
                    id="merch-budget-range"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="merch-timeline">Timeline *</label>
                  <select
                    name="timeline"
                    id="merch-timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="Urgent (within 7 days)">Urgent (within 7 days)</option>
                    <option value="2-3 weeks">2-3 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
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
              <img src="/images/Merchandising Poster.png" alt="Preview of ModSouls custom merchandising services" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandising;
