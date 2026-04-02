import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return(
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;
