const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const PRICING = {
  tee: { mrp: 699, price: 599 },
  hoodie: { mrp: 1399, price: 1099 },
};

export const products = [
  {
    id: "hoodie-anti-valentine",
    type: "hoodie",
    name: "anti-valentine",
    slug: "anti-valentine",
    tag: "anti-valentine",
    series: "On The Hood Series",
    images: [
      "/images/Hoodie/Anti-Valentine/an1 (1).png",
      "/images/Hoodie/Anti-Valentine/an2 (1).png",
      "/images/Hoodie/Anti-Valentine/an3 (1).png",
      "/images/Hoodie/Anti-Valentine/antilove.png",
    ],
    mrp: PRICING.hoodie.mrp,
    price: PRICING.hoodie.price,
    sizes: SIZES,
    category: "hoodie",
    featured: true
  },
  {
    id: "hoodie-deathly-hollows",
    type: "hoodie",
    name: "Deathly Hollows",
    slug: "deathly-hollows",
    tag: "Harry Potter",
    series: "On The Hood Series",
    images: [
      "/images/Hoodie/Deathly Hollows/da1 (1).png",
      "/images/Hoodie/Deathly Hollows/da2 (1).png",
      "/images/Hoodie/Deathly Hollows/da3 (1).png",
    ],
    mrp: PRICING.hoodie.mrp,
    price: PRICING.hoodie.price,
    sizes: SIZES,
    category: "hoodie",
    featured: true
  },
  {
    id: "hoodie-sukuna-jjk",
    type: "hoodie",
    name: "Sukuna -JJk",
    slug: "sukuna-jjk",
    tag: "Jujutsu Kaisen",
    series: "On The Hood Series",
    images: [
      "/images/Hoodie/Sukuna -JJk/sukuna1.png",
      "/images/Hoodie/Sukuna -JJk/sukuna2.png",
      "/images/Hoodie/Sukuna -JJk/sukuna3.png",
      "/images/Hoodie/Sukuna -JJk/sukuna4.png",
    ],
    mrp: PRICING.hoodie.mrp,
    price: PRICING.hoodie.price,
    sizes: SIZES,
    category: "hoodie",
    featured: true
  },
  {
    id: "tee-akarshan",
    type: "tee",
    name: "Sukuna",
    slug: "sukuna",
    tag: "Jujutsu Kaisen",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Sukuna/post/s21.png",
      "/images/Oversized Tshirts/Sukuna/post/s22.png",
      "/images/Oversized Tshirts/Sukuna/post/s23.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-dhurandar",
    type: "tee",
    name: "dhurandar",
    slug: "dhurandar",
    tag: "dhurandar",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Dhurandar/q1.png",
      "/images/Oversized Tshirts/Dhurandar/q2.png",
      "/images/Oversized Tshirts/Dhurandar/q3.png",
      "/images/Oversized Tshirts/Dhurandar/q4.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
  {
    id: "tee-harry-potter",
    type: "tee",
    name: "Harry Potter",
    slug: "harry-potter",
    tag: "Harry Potter",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Harry Potter/WhatsApp Image 2025-12-20 at 20.15.43.jpeg",
      "/images/Oversized Tshirts/Harry Potter/_ (1).jpeg",
      "/images/Oversized Tshirts/Harry Potter/Screenshot 2025-12-20 at 9.49.26 PM.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-jethalal-kite",
    type: "tee",
    name: "Jethalal Kite",
    slug: "jethalal-kite",
    tag: "TMKOC",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Jethalal Kite/jj1 (1).png",
      "/images/Oversized Tshirts/Jethalal Kite/jj2 (1).png",
      "/images/Oversized Tshirts/Jethalal Kite/jj3 (1).png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
  {
    id: "tee-sasuke-kakashi",
    type: "tee",
    name: "sasuke and kakashi",
    slug: "sasuke-kakashi",
    tag: "Naruto",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Sasuke And Kakashi/ss1.png",
      "/images/Oversized Tshirts/Sasuke And Kakashi/ss2.png",
      "/images/Oversized Tshirts/Sasuke And Kakashi/ss3.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-slytherin",
    type: "tee",
    name: "slytherin",
    slug: "slytherin",
    tag: "Harry Potter",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Slytherin/ss1.png",
      "/images/Oversized Tshirts/Slytherin/ss2.png",
      "/images/Oversized Tshirts/Slytherin/ss3.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-solo-leveling",
    type: "tee",
    name: "solo leveling",
    slug: "solo-leveling",
    tag: "Solo Leveling",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Solo Leveling/za (1).png",
      "/images/Oversized Tshirts/Solo Leveling/zb (1).png",
      "/images/Oversized Tshirts/Solo Leveling/zc (1).png",
      "/images/Oversized Tshirts/Solo Leveling/ww11.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-spiderman",
    type: "tee",
    name: "spiderman",
    slug: "spiderman",
    tag: "Marvel",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Spiderman/spd1 (1).png",
      "/images/Oversized Tshirts/Spiderman/spd2 (1).png",
      "/images/Oversized Tshirts/Spiderman/spd3 (1).png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-zoro",
    type: "tee",
    name: "Zoro",
    slug: "zoro",
    tag: "One Piece",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Zoro/s33.png",
      "/images/Oversized Tshirts/Zoro/ss31.png",
      "/images/Oversized Tshirts/Zoro/sss32.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee",
    featured: true
  },
  {
    id: "tee-overthink-quote",
    type: "tee",
    name: "Overthink Quote",
    slug: "overthink-quote",
    tag: "Quotes",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Overthink-Quote/ss21.png",
      "/images/Oversized Tshirts/Overthink-Quote/ss22.png",
      "/images/Oversized Tshirts/Overthink-Quote/ChatGPT Image Dec 29, 2025, 11_14_34 PM.png",
      "/images/Oversized Tshirts/Overthink-Quote/ChatGPT Image Dec 29, 2025, 11_16_13 PM (1).png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
  {
    id: "tee-shiva",
    type: "tee",
    name: "Shiva",
    slug: "shiva",
    tag: "Shiva",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Shiva/sv1.jpeg",
      "/images/Oversized Tshirts/Shiva/sv2.jpeg",
      "/images/Oversized Tshirts/Shiva/sv3.jpeg",
      "/images/Oversized Tshirts/Shiva/sv4.jpeg",
      "/images/Oversized Tshirts/Shiva/sv5.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
  {
    id: "tee-family-man",
    type: "tee",
    name: "The Family Man",
    slug: "family-man",
    tag: "The Family Man",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/The Family Man/Screenshot 2025-12-13 at 11.49.03 PM (1).png",
      "/images/Oversized Tshirts/The Family Man/Screenshot 2025-12-13 at 11.49.23 PM.png",
      "/images/Oversized Tshirts/The Family Man/Screenshot 2025-12-14 at 2.28.46 PM.png",
      "/images/Oversized Tshirts/The Family Man/Screenshot 2025-12-14 at 2.41.15 PM.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
];

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
export const getProductById = (id) => products.find((p) => p.id === id);

/** Use for img src so paths with spaces/special chars load correctly. */
export const getImageSrc = (path) => (path && typeof path === 'string' ? encodeURI(path) : path || '');
