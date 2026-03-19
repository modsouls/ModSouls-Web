import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';
import './ImageZoom.css';

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <button
        type="button"
        className="zoomable-image"
        onClick={() => setIsZoomed(true)}
        aria-label={`Zoom ${alt}`}
      >
        <ProgressiveImage src={src} alt={alt} priority sizes="(max-width: 1024px) 100vw, 50vw" />
        <div className="zoom-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', damping: 25 }}
            />
            <button type="button" className="close-zoom" onClick={() => setIsZoomed(false)} aria-label="Close">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageZoom;
