import { useState, useEffect } from 'react';
import './ProgressiveImage.css';

const ProgressiveImage = ({ src, alt, className = '', priority = false }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        setImgSrc(src);
        setLoading(false);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setError(true);
        setLoading(false);
      }
    };
    img.src = src;
    return () => { cancelled = true; img.src = ''; };
  }, [src]);

  if (error) return <div className={`progressive-image error ${className}`} aria-label={alt} />;
  return (
    <div className={`progressive-image ${loading ? 'loading' : 'loaded'} ${className}`}>
      {loading && <div className="image-placeholder" />}
      {imgSrc && (
        <img src={imgSrc} alt={alt} className={loading ? 'loading' : 'loaded'} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
      )}
    </div>
  );
};

export default ProgressiveImage;
