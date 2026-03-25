import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import BookPage from './pages/BookPage';

function App() {
  return(
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route
            path="/cart/:title/:BookId"
            element={<div>Cart Page for Book</div>}
          />
          <Route path="/cart" element={<div>Cart Page</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;
