import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    try {
      localStorage.setItem('shopverse_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2400);
  };

  const addToCart = (productId, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === productId);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          qty: nextCart[existingIndex].qty + quantity
        };
        return nextCart;
      } else {
        return [...prevCart, { id: productId, qty: quantity }];
      }
    });

    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (product) {
      showToast(`${product.name} removed from cart`);
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared');
  };

  // Detailed cart items enriched with product information
  const cartItems = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        ...product,
        qty: item.qty,
        lineTotal: product.price * item.qty
      };
    })
    .filter(Boolean);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  // Free shipping on orders >= 999
  const shippingThreshold = 999;
  const shippingFee = subtotal === 0 || subtotal >= shippingThreshold ? 0 : 99;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const grandTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartCount,
        subtotal,
        shippingFee,
        shippingThreshold,
        remainingForFreeShipping,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
