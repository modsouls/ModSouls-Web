import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ExitIntent.css';

const ExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown && !sessionStorage.getItem('exitIntentShown')) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="exit-intent-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          role="presentation"
        >
          <motion.div
            className="exit-intent-modal"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
          >
            <button type="button" className="exit-close" onClick={handleClose} aria-label="Close offer popup">×</button>
            
            <div className="exit-content">
              <h2 id="exit-intent-title">Wait! Don't Leave Yet! 🎁</h2>
              <p>Get exclusive deals on premium apparel</p>
              
              <div className="exit-offers">
                <div className="offer-item">
                  <span className="offer-icon">🎨</span>
                  <span>Unique Designs</span>
                </div>
                <div className="offer-item">
                  <span className="offer-icon">⚡</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="offer-item">
                  <span className="offer-icon">💯</span>
                  <span>Premium Quality</span>
                </div>
              </div>

              <div className="exit-actions">
                <Link to="/shop" className="btn btn-primary" onClick={handleClose}>
                  Continue Shopping
                </Link>
                <button className="btn btn-outline" onClick={handleClose}>
                  No Thanks
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
