import productsData from './products.json';

export const products = productsData;

const productById = new Map(products.map((p) => [p.id, p]));

export const brandInfo = {
  name: "Mod Souls",
  tagline: "Ordinary is Overrated, Be a ModSoul",
  email: "modsouls.in@gmail.com",
  location: "Delhi, India",
  social: {
    instagram: "https://www.instagram.com/modsouls.in",
    facebook: "https://www.facebook.com/share/178Cj2Qfox/",
  }
};

export const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

/** Get product by id (for cart/wishlist display so images always match current paths). */
export const getProductById = (id) => productById.get(id);

/** Use for img src so paths with spaces/special chars load correctly. */
export const getImageSrc = (path) => (path && typeof path === 'string' ? encodeURI(path) : path || '');
