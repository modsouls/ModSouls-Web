import { useEffect, useMemo, useState } from 'react';
import './ProgressiveImage.css';

const FALLBACK_SRC = '/images/tranlogonew.png';

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  fallbackSrc = FALLBACK_SRC,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const resolvedSrc = useMemo(() => src || fallbackSrc, [fallbackSrc, src]);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
    setLoading(true);
    setError(false);
  }, [resolvedSrc]);

  return (
    <div className={`progressive-image ${loading ? 'loading' : 'loaded'} ${error ? 'error' : ''} ${className}`}>
      {loading && <div className="image-placeholder" />}
      <img
        src={currentSrc}
        alt={alt}
        className={loading ? 'loading' : 'loaded'}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        sizes={sizes}
        onLoad={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setLoading(true);
            return;
          }

          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};

export default ProgressiveImage;
