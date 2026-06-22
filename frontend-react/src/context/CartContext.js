import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (game) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.game.id === game.id);
      if (existing) {
        return prev.map(item =>
          item.game.id === game.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { game, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.game.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.game.id !== id) return [...acc, item];
        const newQty = item.qty + delta;
        return newQty > 0 ? [...acc, { ...item, qty: newQty }] : acc;
      }, [])
    );
  };

  const toggleWishlist = (game) => {
    setWishlistItems(prev => {
      const exists = prev.find(g => g.id === game.id);
      return exists ? prev.filter(g => g.id !== game.id) : [...prev, game];
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cartItems.reduce((sum, item) => {
    const discountedPrice = item.game.price * (1 - item.game.discount / 100);
    return sum + discountedPrice * item.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems, wishlistItems,
      addToCart, removeFromCart, updateQty, toggleWishlist,
      cartCount, cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
