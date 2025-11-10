import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone } from "lucide-react";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    shipping_address: "",
    shipping_city: "",
    shipping_postal_code: "",
    shipping_country: "",
    payment_method: "M-Pesa",
    phone_number: "",
  });
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderData = {
        shipping_address: formData.shipping_address,
        shipping_city: formData.shipping_city,
        shipping_postal_code: formData.shipping_postal_code,
        shipping_country: formData.shipping_country,
        payment_method: formData.payment_method,
        items: cart.items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await axios.post("/orders/orders/", orderData);
      const createdOrderId = response.data.id;

      // Initiate M-Pesa payment
      if (!formData.phone_number) {
        setError("Please enter your M-Pesa phone number");
        setLoading(false);
        return;
      }
      setShowPaymentModal(true);
      await initiateMPesaPayment(createdOrderId);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const initiateMPesaPayment = async (orderIdToUse) => {
    try {
      setPaymentStatus("Initiating M-Pesa payment...");

      const response = await axios.post("/payments/initiate_mpesa/", {
        order_id: orderIdToUse,
        phone_number: formData.phone_number,
      });

      if (response.data.success) {
        setPaymentStatus(
          "STK Push sent! Please check your phone and enter your M-Pesa PIN to complete payment."
        );

        // Poll for payment status
        const paymentId = response.data.payment_id;
        pollPaymentStatus(paymentId);
      } else {
        setPaymentStatus("Failed to initiate payment");
        setError(response.data.message);
      }
    } catch (err) {
      setPaymentStatus("Payment initiation failed");
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to initiate M-Pesa payment"
      );
    }
  };

  const pollPaymentStatus = async (paymentId) => {
    let attempts = 0;
    const maxAttempts = 30; // Poll for 1 minute (30 * 2 seconds)

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `/payments/${paymentId}/check_status/`
        );

        if (response.data.status === "completed") {
          setPaymentStatus("Payment successful! Redirecting...");
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
          return;
        } else if (response.data.status === "failed") {
          setPaymentStatus("Payment failed. Please try again.");
          setError("Payment was not completed");
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 2000); // Check every 2 seconds
        } else {
          setPaymentStatus("Payment timeout. Please check your orders.");
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        }
      } catch (err) {
        console.error("Status check error:", err);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 2000);
        }
      }
    };

    checkStatus();
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Shipping Information</h2>

              <div className="form-group">
                <label className="label">Address</label>
                <input
                  type="text"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">City</label>
                  <input
                    type="text"
                    name="shipping_city"
                    value={formData.shipping_city}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="label">Postal Code</label>
                  <input
                    type="text"
                    name="shipping_postal_code"
                    value={formData.shipping_postal_code}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Country</label>
                <input
                  type="text"
                  name="shipping_country"
                  value={formData.shipping_country}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Payment Method</h2>

              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment_method"
                    value="M-Pesa"
                    checked={formData.payment_method === "M-Pesa"}
                    onChange={handleChange}
                  />
                  <Smartphone size={20} />
                  <span>M-Pesa (STK Push)</span>
                </label>
              </div>

              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="label">M-Pesa Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="input"
                  placeholder="254XXXXXXXXX or 07XXXXXXXX"
                  required
                />
                <small style={{ color: "#666", fontSize: "0.875rem" }}>
                  Enter your M-Pesa registered phone number
                </small>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay with M-Pesa"}
            </button>
          </form>

          {showPaymentModal && (
            <div className="payment-modal">
              <div className="payment-modal-content">
                <h3>M-Pesa Payment</h3>
                <div className="payment-status">
                  <Smartphone size={48} color="#4CAF50" />
                  <p>{paymentStatus}</p>
                  {paymentStatus.includes("check your phone") && (
                    <div className="payment-instructions">
                      <ol>
                        <li>Check your phone for M-Pesa prompt</li>
                        <li>Enter your M-Pesa PIN</li>
                        <li>Wait for confirmation</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-name">
                      {item.product.name}
                    </span>
                    <span className="summary-item-qty">x{item.quantity}</span>
                  </div>
                  <span className="summary-item-price">
                    KSh {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
