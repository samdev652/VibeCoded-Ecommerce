import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, updateCartItem, removeFromCart, loading } = useCart();

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (!isAuthenticated) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h2>Please login to view your cart</h2>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        Loading cart...
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <ShoppingBag size={64} color="#9ca3af" />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.name} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>

                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  {item.product.category && (
                    <span className="product-category">
                      {item.product.category.name}
                    </span>
                  )}
                  <p className="cart-item-price">
                    KSh {parseFloat(item.price).toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, -1)
                      }
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, 1)
                      }
                      className="quantity-btn"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="cart-item-total">
                  KSh {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>KSh {parseFloat(cart.total_price).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>KSh {parseFloat(cart.total_price).toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-block"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline btn-block"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
