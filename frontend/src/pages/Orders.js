import React, { useState, useEffect } from "react";
import { Package, Calendar, DollarSign } from "lucide-react";
import axios from "../api/axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/orders/");
      setOrders(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      processing: "#3b82f6",
      shipped: "#8b5cf6",
      delivered: "#10b981",
      cancelled: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <div className="container">
          <Package size={64} color="#9ca3af" />
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <div className="order-meta">
                    <span className="order-date">
                      <Calendar size={16} />
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="order-total">
                  <DollarSign size={20} />
                  <span>KSh {parseFloat(order.total_price).toFixed(2)}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-image">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} />
                      ) : (
                        <div className="image-placeholder">No Image</div>
                      )}
                    </div>
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="order-item-price">
                        KSh {parseFloat(item.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-shipping">
                <h4>Shipping Address</h4>
                <p>{order.shipping_address}</p>
                <p>
                  {order.shipping_city}, {order.shipping_postal_code}
                </p>
                <p>{order.shipping_country}</p>
              </div>

              <div className="order-payment">
                <span>Payment Method: {order.payment_method}</span>
                <span className={order.is_paid ? "paid" : "unpaid"}>
                  {order.is_paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
