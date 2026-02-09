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
      "/images/Hoodie/anti-valentine/an1 (1).png",
      "/images/Hoodie/anti-valentine/an2 (1).png",
      "/images/Hoodie/anti-valentine/an3 (1).png",
      "/images/Hoodie/anti-valentine/antilove.png",
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
      "/images/Oversized Tshirts/Sukuna/Sukuna_1.jpg",
      "/images/Oversized Tshirts/Sukuna/Sukuna_2.jpg",
      "/images/Oversized Tshirts/Sukuna/Sukuna_3.jpg",
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
      "/images/Oversized Tshirts/Dhurandar/Dhurandar_1.jpeg",
      "/images/Oversized Tshirts/Dhurandar/Dhurandar_2.jpeg",
      "/images/Oversized Tshirts/Dhurandar/Dhurandar_3.png",
      "/images/Oversized Tshirts/Dhurandar/Dhurandar_4.png",
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
      "/images/Oversized Tshirts/Harry Potter/Harry Potter_1.png",
      "/images/Oversized Tshirts/Harry Potter/Harry Potter_2.png",
      "/images/Oversized Tshirts/Harry Potter/Harry Potter_3.png",
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
      "/images/Oversized Tshirts/Jethalal Kite/Jethalal Kite_1.png",
      "/images/Oversized Tshirts/Jethalal Kite/Jethalal Kite_2.png",
      "/images/Oversized Tshirts/Jethalal Kite/Jethalal Kite_3.png",
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
      "/images/Oversized Tshirts/Sasuke And Kakashi/Sasuke And Kakashi_1.jpeg",
      "/images/Oversized Tshirts/Sasuke And Kakashi/Sasuke And Kakashi_2.jpeg",
      "/images/Oversized Tshirts/Sasuke And Kakashi/Sasuke And Kakashi_3.png",
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
      "/images/Oversized Tshirts/Slytherin/Slytherin_1.jpeg",
      "/images/Oversized Tshirts/Slytherin/Slytherin_2.png",
      "/images/Oversized Tshirts/Slytherin/Slytherin_3.png",
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
      "/images/Oversized Tshirts/Solo Leveling/Solo Leveling_1.jpeg",
      "/images/Oversized Tshirts/Solo Leveling/Solo Leveling_2.jpeg",
      "/images/Oversized Tshirts/Solo Leveling/Solo Leveling_3.png",
      "/images/Oversized Tshirts/Solo Leveling/Solo Leveling_4.png",
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
      "/images/Oversized Tshirts/Spiderman/Spiderman_1.jpeg",
      "/images/Oversized Tshirts/Spiderman/Spiderman_2.jpeg",
      "/images/Oversized Tshirts/Spiderman/Spiderman_3.png",
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
      "/images/Oversized Tshirts/Zoro/Zoro_1.jpeg",
      "/images/Oversized Tshirts/Zoro/Zoro_2.jpeg",
      "/images/Oversized Tshirts/Zoro/Zoro_3.png",
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
      "/images/Oversized Tshirts/Overthink Quote/Overthink Quote_1.png",
      "/images/Oversized Tshirts/Overthink Quote/Overthink Quote_2.png",
      "/images/Oversized Tshirts/Overthink Quote/Overthink Quote_3.png",
      "/images/Oversized Tshirts/Overthink Quote/Overthink Quote_4.png",
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
      "/images/Oversized Tshirts/Shiva/Shiva_1.jpeg",
      "/images/Oversized Tshirts/Shiva/Shiva_2.jpeg",
      "/images/Oversized Tshirts/Shiva/Shiva_3.jpeg",
      "/images/Oversized Tshirts/Shiva/Shiva_4.jpeg",
      "/images/Oversized Tshirts/Shiva/Shiva_5.jpeg",
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
      "/images/Oversized Tshirts/The Family Man/The Family Man_1.png",
      "/images/Oversized Tshirts/The Family Man/The Family Man_2.png",
      "/images/Oversized Tshirts/The Family Man/The Family Man_3.png",
      "/images/Oversized Tshirts/The Family Man/The Family Man_4.png",
    ],
    mrp: PRICING.tee.mrp,
    price: PRICING.tee.price,
    sizes: SIZES,
    category: "tee"
  },
];

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
