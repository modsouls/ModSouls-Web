import { products, brandInfo } from '../data/products';

export const SITE_NAME = 'ModSouls';
export const SITE_URL = 'https://modsouls.in';
export const DEFAULT_TITLE = 'ModSouls | Premium Oversized T-Shirts, Hoodies & Custom Merch';
export const DEFAULT_DESCRIPTION = 'Shop premium oversized T-shirts, hoodies, and custom merchandise at ModSouls. Pop culture streetwear, anime-inspired apparel, and custom merch.';
export const DEFAULT_KEYWORDS = [
  'ModSouls',
  'oversized t-shirts India',
  'premium hoodies India',
  'anime streetwear',
  'custom merchandising India',
  'graphic tees India',
  'pop culture apparel',
  'custom hoodies',
];
export const DEFAULT_OG_IMAGE = '/images/Modsouls-Logo.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'ModSouls premium apparel brand logo';
export const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;

const BREADCRUMB_NAMES = {
  shop: 'Shop',
  product: 'Product',
  cart: 'Cart',
  checkout: 'Checkout',
  wishlist: 'Wishlist',
  about: 'About ModSouls',
  contact: 'Contact',
  merchandising: 'Custom Merchandising',
  'size-guide': 'Size Guide',
};

export const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.join(', ');
  }

  return keywords || DEFAULT_KEYWORDS.join(', ');
};

export const toAbsoluteUrl = (value = '/') => {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

export const getCanonicalPath = (pathname = '/') => {
  if (!pathname || pathname === '*') return '/';
  return pathname === '/' ? pathname : pathname.replace(/\/$/, '');
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  slogan: brandInfo.tagline,
  email: brandInfo.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressCountry: 'IN',
  },
  sameAs: Object.values(brandInfo.social),
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/shop?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const buildBreadcrumbSchema = (pathname = '/') => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  segments.forEach((segment, index) => {
    const route = `/${segments.slice(0, index + 1).join('/')}`;
    let name = BREADCRUMB_NAMES[segment] || segment.replace(/-/g, ' ');

    if (segment === 'product' && segments[index + 1]) {
      const product = products.find((entry) => entry.id === segments[index + 1]);
      if (product) {
        name = product.name;
      }
    }

    if (index > 0 && segments[index - 1] === 'product') {
      return;
    }

    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name,
      item: toAbsoluteUrl(route),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

export const buildProductSchema = (product) => {
  if (!product) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((image) => toAbsoluteUrl(image)),
    description: `${product.name} from ModSouls. ${product.type === 'tee' ? 'Premium oversized T-shirt' : 'Premium hoodie'} inspired by ${product.tag}.`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: product.series || product.category,
    sku: product.id,
    url: toAbsoluteUrl(`/product/${product.id}`),
    offers: {
      '@type': 'Offer',
      url: toAbsoluteUrl(`/product/${product.id}`),
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };
};
