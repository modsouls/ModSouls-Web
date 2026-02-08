import { createContext, useContext, useState, useEffect } from 'react';
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

const showToast = (message) => {
  toast.success(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 2px',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>
    ),
    { duration: 4000 }
  );
};

const triggerShake = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 600);
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getStoredData('modsouls_cart'));
  const [wishlist, setWishlist] = useState(() => getStoredData('modsouls_wishlist'));

  useEffect(() => {
    localStorage.setItem('modsouls_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('modsouls_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      triggerShake('.cart-link');
      
      if (existing) {
        showToast(`Updated ${product.name} quantity`);
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showToast(`Added ${product.name} to cart`);
      return [...prev, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
    showToast('Removed from cart');
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return removeFromCart(productId, size);
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      
      if (!exists) {
        triggerShake('.wishlist-link');
        showToast(`Added ${product.name} to wishlist`);
        return [...prev, product];
      }
      showToast(`Removed ${product.name} from wishlist`);
      return prev.filter(item => item.id !== product.id);
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
