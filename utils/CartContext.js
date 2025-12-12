import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART dengan QTY
  const addToCart = (product) => {
    setCart((prev) => {
      // Cek apakah produk sudah ada di keranjang
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // Jika sudah ada → tambah qty sesuai product.qty atau +1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item
        );
      }

      // Jika belum ada → tambah item baru dengan qty dari product atau 1
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  // UPDATE QUANTITY (untuk +/- di cart)
  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return; // Minimum qty adalah 1
    
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty: newQty };
      return updated;
    });
  };

  // REMOVE satu item
  const removeFromCart = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // CLEAR seluruh cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        updateQuantity,
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};