import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const clear = () => setItems([]);

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
