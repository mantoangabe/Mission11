import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems: cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <button
      type="button"
      className="btn btn-primary position-fixed top-0 end-0 m-4 shadow d-flex align-items-center gap-2"
      onClick={() => navigate('/cart')}
    >
      <span aria-hidden="true">🛒</span>
      <strong>${totalAmount.toFixed(2)}</strong>
    </button>
  );
};

export default CartSummary;
