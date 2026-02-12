import { useEffect } from 'react';

const SEO = ({ 
  title = 'ModSouls - Premium Oversized T-Shirts & Hoodies',
  description = 'Shop premium oversized t-shirts and hoodies featuring anime, movies, and pop culture designs. Ordinary is overrated, be a ModSoul.',
  keywords = 'oversized t-shirts, premium hoodies, anime merchandise, custom apparel, ModSouls',
  image = '/images/tranlogonew.png'
}) => {
  useEffect(() => {
    document.title = title;
    
    // Update or create meta tags
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateProperty = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const absoluteImage = typeof window !== 'undefined' && image.startsWith('/')
      ? `${window.location.origin}${image}`
      : image;

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', absoluteImage);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', absoluteImage);
  }, [title, description, keywords, image]);

  return null;
};

export default SEO;
