import { useState, useEffect } from 'react';
import './ProgressiveImage.css';

const ProgressiveImage = ({ src, alt, className = '' }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setLoading(false);
    };
  }, [src]);

  return (
    <div className={`progressive-image ${loading ? 'loading' : 'loaded'} ${className}`}>
      {loading && <div className="image-placeholder" />}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          className={loading ? 'loading' : 'loaded'}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
