import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';

function App() {
  return(
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;
