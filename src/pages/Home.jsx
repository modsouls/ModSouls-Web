import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Home.css';

const Home = () => {
  const featured = products.filter(p => p.featured).slice(0, 4);
  const tees = products.filter(p => p.type === 'tee').slice(0, 4);
  const hoodies = products.filter(p => p.type === 'hoodie').slice(0, 4);

  const heroBanners = [
    '/images/Banners/ModSouls Banner 1 (1).png',
    '/images/Banners/ModSouls Banner 2 (1).png',
    '/images/Banners/ModSouls Banner 3 (1).png',
  ];

  return (
    <div className="home">
      <SEO 
        title="ModSouls - Premium Oversized T-Shirts & Hoodies | Ordinary is Overrated"
        description="Shop premium oversized t-shirts and hoodies from ModSouls. Anime, movies, and custom merchandise. Free shipping above ₹1000. Delhi, India."
      />
      <section className="hero-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          loop
          className="hero-swiper"
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="hero-slide">
                <img src={banner} alt={`ModSouls Banner ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="section about-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <h2 className="section-title">What is ModSouls?</h2>
            <p className="section-subtitle">Where individuality meets craftsmanship in every thread</p>
            <p className="about-text">
              ModSouls is where fashion meets individuality. We create premium oversized t-shirts and hoodies 
              that celebrate pop culture, anime, and bold self-expression. Each piece is crafted with exceptional 
              quality and designed for those who refuse to blend in. Ordinary is overrated—be a ModSoul.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">Iconic pieces that transcend trends and define character</p>
          </motion.div>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="products-swiper"
          >
            {featured.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="section tshirts-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Oversized T-Shirts</h2>
            <p className="section-subtitle">Effortless comfort wrapped in statement-making designs</p>
          </motion.div>
          <div className="product-grid">
            {tees.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/shop?filter=tee" className="btn btn-primary">View All T-Shirts</Link>
          </div>
        </div>
      </section>

      <section className="section hoodies-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Premium Hoodies</h2>
            <p className="section-subtitle">Luxury warmth engineered for those who dare to stand out</p>
          </motion.div>
          <div className="product-grid">
            {hoodies.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/shop?filter=hoodie" className="btn btn-primary">View All Hoodies</Link>
          </div>
        </div>
      </section>

      <section className="section series-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Our Series</h2>
            <p className="section-subtitle">Curated collections where art meets everyday rebellion</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="series-container"
          >
            <div className="series-images-row">
              <Link to="/shop?series=On The Go Series" className="series-item">
                <div className="series-image">
                  <img src="/images/Posters/On the Go Series.png" alt="On The Go Series" />
                </div>
                <div className="series-info">
                  <h3>On The Go Series</h3>
                  <p>Fashion that evolves in real time</p>
                </div>
              </Link>

              <Link to="/shop?series=On The Hood Series" className="series-item">
                <div className="series-image">
                  <img src="/images/Posters/On the Hood Series.png" alt="On The Hood Series" />
                </div>
                <div className="series-info">
                  <h3>On The Hood Series</h3>
                  <p>Premium hoodies with craftsmanship</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section merch-promo-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="merch-promo"
          >
            <div className="merch-promo-image">
              <img src="/images/Merchandising Poster.png" alt="Custom Merchandising" />
            </div>
            <div className="merch-promo-content">
              <h2>Custom Merchandising</h2>
              <p className="section-subtitle">Transform your vision into wearable art with bespoke precision</p>
              <p className="merch-intro">Premium custom apparel for your brand, event, or team</p>
              
              <div className="merch-highlights">
                <ul className="merch-features-list">
                  <li>🎨 <strong>Custom Designs</strong> - Unique artwork tailored to your brand</li>
                  <li>👕 <strong>Premium Quality</strong> - High-grade fabrics and printing</li>
                  <li>📦 <strong>Bulk Orders</strong> - Competitive pricing for quantities</li>
                  <li>⚡ <strong>Fast Turnaround</strong> - Quick production and delivery</li>
                </ul>
              </div>

              <div className="merch-cta">
                <Link to="/merchandising" className="btn btn-primary">Get Your Custom Quote</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
