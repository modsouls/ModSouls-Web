import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SizeGuide.css';

const SizeGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="size-guide-page">
      <section className="guide-hero">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1>Size Guide</h1>
            <p>Find your perfect fit with our sizing chart</p>
          </motion.div>
        </div>
      </section>

      <section className="size-chart-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Oversized T-Shirts Size Chart</h2>
            <div className="chart-image">
              <img src="/images/Posters/Size Chart Oversized Tshirts.png" alt="Size Chart" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="care-guide-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="care-content"
          >
            <h2>T-Shirt Care Guide</h2>
            <p className="care-intro">Follow these simple steps to keep your ModSouls t-shirt looking fresh and vibrant</p>
            <div className="care-grid">
              <div className="care-card">
                <div className="care-icon">🧺</div>
                <h3>Washing</h3>
                <ul>
                  <li>Machine wash cold (30°C or below)</li>
                  <li>Wash with similar colors</li>
                  <li>Turn inside out before washing</li>
                  <li>Use mild detergent</li>
                </ul>
              </div>
              <div className="care-card">
                <div className="care-icon">🌬️</div>
                <h3>Drying</h3>
                <ul>
                  <li>Tumble dry on low heat</li>
                  <li>Or hang dry in shade</li>
                  <li>Avoid direct sunlight</li>
                  <li>Remove promptly to prevent wrinkles</li>
                </ul>
              </div>
              <div className="care-card">
                <div className="care-icon">🔥</div>
                <h3>Ironing</h3>
                <ul>
                  <li>Iron on low to medium heat</li>
                  <li>Iron inside out</li>
                  <li>Avoid ironing directly on print</li>
                  <li>Use steam if needed</li>
                </ul>
              </div>
              <div className="care-card">
                <div className="care-icon">⚠️</div>
                <h3>Don'ts</h3>
                <ul>
                  <li>Do not bleach</li>
                  <li>Do not dry clean</li>
                  <li>Avoid fabric softener</li>
                  <li>Don't wring or twist</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;
