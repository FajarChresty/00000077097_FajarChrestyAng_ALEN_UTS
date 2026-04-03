import React, { createContext, useContext, useState } from 'react';

const FajarChresty_77097_Context = createContext();

export const FajarChresty_77097_Provider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateFajar_77097_ID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    let res = '';
    for (let i = 0; i < 3; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 0; i < 3; i++) res += nums.charAt(Math.floor(Math.random() * nums.length));
    return res;
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <FajarChresty_77097_Context.Provider value={{
      cart, setCart, wishlist, setWishlist, history, setHistory,
      isDarkMode, setIsDarkMode, addToCart, generateFajar_77097_ID
    }}>
      {children}
    </FajarChresty_77097_Context.Provider>
  );
};

export const useFajarState = () => useContext(FajarChresty_77097_Context);