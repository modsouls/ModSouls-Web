import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider } from './context/StoreContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ExitIntent from './components/ExitIntent';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Merchandising from './pages/Merchandising';
import About from './pages/About';
import Contact from './pages/Contact';
import SizeGuide from './pages/SizeGuide';
import NotFound from './pages/NotFound';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94]
};

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
                <Component />
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
