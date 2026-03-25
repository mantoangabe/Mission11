import React from 'react';
import type { CartItem } from '../types/cartItem';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}
const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.BookId === item.BookId);
      const updatedCart = prevCart.map((c) =>
        c.BookId === item.BookId
          ? { ...c, donationAmount: c.price + item.price }
          : c,
      );
      
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };    
  const removeFromCart = (BookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.BookId !== BookId));
  };
  const clearCart = () => {
    setCart(() => []);
  };
    return (
    <CartContext.Provider value={{ cartItems: cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

