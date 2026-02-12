import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { StoreProvider } from './context/StoreContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ExitIntent from './components/ExitIntent';
import MobileNav from './components/MobileNav';
import { lazyLoad } from './utils/lazyLoad';
import './App.css';

const Home = lazyLoad(() => import('./pages/Home'));
const Shop = lazyLoad(() => import('./pages/Shop'));
const ProductDetail = lazyLoad(() => import('./pages/ProductDetail'));
const Cart = lazyLoad(() => import('./pages/Cart'));
const Checkout = lazyLoad(() => import('./pages/Checkout'));
const Wishlist = lazyLoad(() => import('./pages/Wishlist'));
const Merchandising = lazyLoad(() => import('./pages/Merchandising'));
const About = lazyLoad(() => import('./pages/About'));
const Contact = lazyLoad(() => import('./pages/Contact'));
const SizeGuide = lazyLoad(() => import('./pages/SizeGuide'));
const NotFound = lazyLoad(() => import('./pages/NotFound'));

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/product/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/wishlist', component: Wishlist },
  { path: '/merchandising', component: Merchandising },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/size-guide', component: SizeGuide },
  { path: '*', component: NotFound }
];

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  const pageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <AnimatedRoutes />
            </main>
            <Footer />
            <MobileNav />
            <ScrollToTop />
            <ExitIntent />
            <SpeedInsights />
            <Analytics />
            <Toaster
              position="top-right"
              containerStyle={{
                top: '100px',
              }}
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: '#1a1a1a',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(140, 144, 126, 0.2)',
                  fontWeight: '600',
                  fontSize: '13px',
                  maxWidth: '280px',
                },
                success: {
                  iconTheme: {
                    primary: '#8C907E',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </StoreProvider>
    </ErrorBoundary>
  );
}

export default App;
