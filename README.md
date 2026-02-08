# ModSouls React v2 - Premium E-Commerce Website

A modern, elegant React-based e-commerce website for ModSouls - a premium clothing and merchandising brand.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse oversized t-shirts and premium hoodies
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Wishlist**: Save favorite products for later
- **Product Details**: Image gallery with navigation, size selection, quantity controls
- **Search & Filter**: Find products by name, tag, or category
- **Custom Merchandising**: Quote request form for bulk orders

### Premium UX/UI
- **Smooth Animations**: Framer Motion for elegant transitions
- **Hero Slider**: Auto-playing banner carousel with fade effects
- **Responsive Design**: Mobile-first approach, works on all devices
- **Toast Notifications**: Real-time feedback for user actions
- **Lazy Loading**: Optimized image loading for better performance
- **Glassmorphism**: Modern frosted glass effects throughout
- **Premium Gradients**: Sophisticated color schemes

### Technical Highlights
- **React 18**: Latest React features and hooks
- **React Router**: Client-side routing
- **Context API**: Global state management for cart and wishlist
- **Local Storage**: Persistent cart and wishlist data
- **Vite**: Lightning-fast development and build tool
- **Swiper**: Touch-enabled sliders
- **React Hot Toast**: Beautiful notifications

## 📦 Installation

```bash
# Navigate to project directory
cd "ModSouls Web React v2"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Philosophy

- **Calm Editorial Aesthetic**: Minimalist, premium feel
- **Typography**: Marcellus for headings, Jost for body text
- **Color Palette**: Nude/champagne gradients with sage green accents
- **Micro-interactions**: Subtle hover effects and transitions
- **Performance First**: Optimized for speed and smooth animations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   └── Merchandising.jsx
├── context/            # React Context for state management
│   └── StoreContext.jsx
├── data/               # Product data and utilities
│   └── products.js
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🛍️ Product Catalog

### Oversized T-Shirts (₹599)
- Akarshan, Dhurandar, Harry Potter, Jethalal Kite
- Sasuke & Kakashi, Shiva, Slytherin, Solo Leveling
- Spiderman, The Family Man, Zoro

### Premium Hoodies (₹1099)
- Anti-Valentine, Deathly Hollows, Sukuna (JJK)

## 🎯 Key Improvements Over Original

1. **Modern React Architecture**: Component-based, maintainable code
2. **Enhanced Performance**: Lazy loading, optimized re-renders
3. **Better State Management**: Context API instead of localStorage manipulation
4. **Smooth Animations**: Framer Motion for professional feel
5. **Improved UX**: Toast notifications, loading states, error handling
6. **Mobile Optimized**: Better responsive design
7. **SEO Ready**: Proper meta tags and semantic HTML
8. **Accessibility**: ARIA labels, keyboard navigation
9. **Type Safety Ready**: Easy to migrate to TypeScript
10. **Scalable**: Easy to add new features and products

## 🔧 Configuration

### Adding New Products
Edit `src/data/products.js` and add product objects following the existing structure.

### Customizing Theme
Modify CSS variables in `src/index.css`:
```css
:root {
  --primary: #8C907E;
  --dark: #1a1a1a;
  --light: #f8f4ed;
  /* ... */
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains production-ready files
# Deploy to Vercel, Netlify, or any static hosting
```

## 📧 Contact

- **Email**: modsouls.in@gmail.com
- **Location**: Delhi, India
- **Instagram**: @modsouls.in

## 📄 License

© 2025 Mod Souls. All rights reserved.

---

**Ordinary is Overrated, Be a ModSoul** ✨
