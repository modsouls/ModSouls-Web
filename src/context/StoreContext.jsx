import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};

const getStoredData = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

const toastWithDismiss = (message, duration = 4000) => {
  toast.success(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        <span>{message}</span>
        <button onClick={() => toast.dismiss(t.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '0 2px', color: '#666' }}>×</button>
      </div>
    ),
    { duration }
  );
};

const triggerShake = (selector) => {
  const el = document.querySelector(selector);
  if (el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 600);
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getStoredData('modsouls_cart'));
  const [wishlist, setWishlist] = useState(() => getStoredData('modsouls_wishlist'));

  useEffect(() => { localStorage.setItem('modsouls_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('modsouls_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = useCallback((product, size, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      triggerShake('.cart-link');
      if (existing) {
        setTimeout(() => toastWithDismiss(`Updated ${product.name} quantity`), 0);
        return prev.map(item =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      setTimeout(() => toastWithDismiss(`Added ${product.name} to cart`), 0);
      return [...prev, { ...product, size, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
    toastWithDismiss('Removed from cart');
  }, []);

  const updateQuantity = useCallback((productId, size, quantity) => {
    if (quantity < 1) {
      setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
      toastWithDismiss('Removed from cart');
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId && item.size === size ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toastWithDismiss('Cart cleared');
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        triggerShake('.wishlist-link');
        setTimeout(() => toastWithDismiss(`Added ${product.name} to wishlist`), 0);
        return [...prev, product];
      }
      setTimeout(() => toastWithDismiss(`Removed ${product.name} from wishlist`), 0);
      return prev.filter(item => item.id !== product.id);
    });
  }, []);

  const isInWishlist = useCallback((productId) => wishlist.some(item => item.id === productId), [wishlist]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const value = useMemo(() => ({
    cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, cartTotal, cartCount
  }), [cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, cartTotal, cartCount]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
