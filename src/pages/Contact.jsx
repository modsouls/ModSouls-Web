import { useState } from 'react';
import { motion } from 'framer-motion';
import { toastWithDismiss } from '../utils/toastWithDismiss.jsx';
import { brandInfo } from '../data/products';
import { useFormState } from '../utils/useFormState';
import './Contact.css';

const Contact = () => {
  const { formData, handleChange } = useFormState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toastWithDismiss('Please fix the errors in the form', { type: 'error' });
      return;
    }
    
    const message = `
MODSOULS CONTACT
--------------------
CUSTOMER
Name: ${formData.name}
Email: ${formData.email}

SUBJECT
${formData.subject}

MESSAGE
${formData.message}
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

  const handleFieldChange = (e) => {
    handleChange(e);
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <h2>Contact Information</h2>
              
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h3>Location</h3>
                  <p>{brandInfo.location}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p><a href={`mailto:${brandInfo.email}`}>{brandInfo.email}</a></p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📱</div>
                <div>
                  <h3>Social Media</h3>
                  <div className="social-links">
                    <a href={brandInfo.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={brandInfo.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div>
                  <h3>Response Time</h3>
                  <p>We typically respond within 24 hours</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-form-wrapper"
            >
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    placeholder="Your name"
                    className={errors.name ? 'error' : ''}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <span id="contact-name-error" className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email *</label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'error' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <span id="contact-email-error" className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={handleFieldChange}
                    placeholder="What is this about?"
                    className={errors.subject ? 'error' : ''}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  />
                  {errors.subject && <span id="contact-subject-error" className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    name="message"
                    id="contact-message"
                    value={formData.message}
                    onChange={handleFieldChange}
                    rows="6"
                    placeholder="Tell us more..."
                    className={errors.message ? 'error' : ''}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && <span id="contact-message-error" className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
