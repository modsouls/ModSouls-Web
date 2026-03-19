import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <SEO
        title="About ModSouls | Streetwear Brand Story, Values and Collections"
        description="Learn about ModSouls, our premium streetwear philosophy, the story behind our oversized T-shirts and hoodies, and the values that shape every collection."
        keywords={['about ModSouls', 'streetwear brand India', 'premium oversized apparel', 'anime streetwear story']}
      />
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1>About ModSouls</h1>
            <p className="tagline">Ordinary is Overrated, Be a ModSoul</p>
          </motion.div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="story-content"
          >
            <h2>Our Story</h2>
            <p>
              ModSouls is a premium streetwear brand that celebrates individuality and creativity. 
              We craft oversized t-shirts and hoodies with unique designs inspired by pop culture, anime, and contemporary art.
            </p>
            <p>
              Our philosophy is simple: Ordinary is Overrated, Be a ModSoul. Each piece is designed with a calm editorial aesthetic, 
              combining comfort with bold expression. We believe fashion should be personal, expressive, and unapologetically you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="series-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="series-grid"
          >
            <div className="series-card">
              <div className="series-image">
                <img src="/images/Posters/On the Go Series.png" alt="On The Go Series collection poster by ModSouls" loading="lazy" />
              </div>
              <div className="series-content">
                <h3>On The Go Series</h3>
                <p>
                  A dynamic drop where everything new begins. From the freshest trends to upcoming launches, 
                  from cultural shifts to style movements, every moment that defines what's happening now lives here.
                </p>
                <p>
                  It's your fast-pass to fashion that evolves in real time. A series crafted for souls who don't wait, 
                  they move, explore, and express.
                </p>
              </div>
            </div>

            <div className="series-card reverse">
              <div className="series-content">
                <h3>On The Hood Series</h3>
                <p>
                  A premium hoodie drop crafted for those who move with intent. Designed to feel personal, 
                  because style should never feel generic.
                </p>
                <p>
                  Your choice meets our imagination—translated into elevated designs, premium fits, and uncompromised comfort. 
                  This is where individuality meets craftsmanship, and everyday wear becomes a statement.
                </p>
              </div>
              <div className="series-image">
                <img src="/images/Posters/On the Hood Series.png" alt="On The Hood Series hoodie collection poster by ModSouls" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Values
          </motion.h2>
          <div className="values-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="value-card"
            >
              <h3>Quality First</h3>
              <p>Premium fabrics and printing techniques ensure lasting quality and comfort</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="value-card"
            >
              <h3>Unique Designs</h3>
              <p>Every piece tells a story with bold, creative artwork that stands out</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="value-card"
            >
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority, from design to delivery</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
