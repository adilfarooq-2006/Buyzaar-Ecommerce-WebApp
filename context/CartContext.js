'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('buyZaarCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('buyZaarCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isInitialized]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  // Buy Now function - sets a single product for immediate checkout
  const buyNow = (product, quantity = 1) => {
    setBuyNowItem({...product, quantity});
  };

  // Clear the buyNow item
  const clearBuyNowItem = () => {
    setBuyNowItem(null);
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity} 
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate total price for buyNow item
  const getBuyNowTotalPrice = () => {
    return buyNowItem ? buyNowItem.price * buyNowItem.quantity : 0;
  };

  const cartContextValue = {
    cart,
    buyNowItem,
    addToCart,
    buyNow,
    clearBuyNowItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getBuyNowTotalPrice,
    isInitialized
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 