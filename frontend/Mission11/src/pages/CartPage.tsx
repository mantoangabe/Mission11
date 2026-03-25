import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems: cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="mb-4">Your Cart</h2>

              {cart.length === 0 ? (
                <div className="alert alert-light border text-center mb-4">
                  Your cart is empty.
                </div>
              ) : (
                <ul className="list-group mb-4">
                  {cart.map((item: CartItem) => (
                    <li
                      key={item.BookId}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="text-start">
                        <strong>{item.title}</strong>
                        <div className="text-muted">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.BookId)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Total:</h3>
                <span className="fs-4 fw-semibold">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button className="btn btn-primary" disabled={cart.length === 0}>
                  Checkout
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/')}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
