import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopverse_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
      return [];
    }
  });

  const { showToast } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem('shopverse_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const isAlreadyWishlisted = wishlist.includes(productId);

    if (isAlreadyWishlisted) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      if (product) showToast(`${product.name} removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, productId]);
      if (product) showToast(`${product.name} added to wishlist`);
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        toggleWishlist,
        isWishlisted
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
