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
    name: "Akarshan",
    slug: "akarshan",
    tag: "Akarshan",
    series: "On The Go Series",
    images: [
      "/images/Oversized Tshirts/Akarshan/post/s21.png",
      "/images/Oversized Tshirts/Akarshan/post/s22.png",
      "/images/Oversized Tshirts/Akarshan/post/s23.png",
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
      "/images/Oversized Tshirts/dhurandar/q1.png",
      "/images/Oversized Tshirts/dhurandar/q2.png",
      "/images/Oversized Tshirts/dhurandar/q3.png",
      "/images/Oversized Tshirts/dhurandar/q4.png",
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
      "/images/Oversized Tshirts/Harry Potter/Screenshot 2025-12-20 at 9.49.26PM.png",
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
      "/images/Oversized Tshirts/sasuke and kakashi/ss1.png",
      "/images/Oversized Tshirts/sasuke and kakashi/ss2.png",
      "/images/Oversized Tshirts/sasuke and kakashi/ss3.png",
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
      "/images/Oversized Tshirts/slytherin/ss1.png",
      "/images/Oversized Tshirts/slytherin/ss2.png",
      "/images/Oversized Tshirts/slytherin/ss3.png",
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
      "/images/Oversized Tshirts/solo leveling/za (1).png",
      "/images/Oversized Tshirts/solo leveling/zb (1).png",
      "/images/Oversized Tshirts/solo leveling/zc (1).png",
      "/images/Oversized Tshirts/solo leveling/ww11.png",
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
      "/images/Oversized Tshirts/spiderman/spd1 (1).png",
      "/images/Oversized Tshirts/spiderman/spd2 (1).png",
      "/images/Oversized Tshirts/spiderman/spd3 (1).png",
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
