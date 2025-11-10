import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setMessage("Please login to add items to cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const result = await addToCart(product.id, quantity);
    if (result.success) {
      setMessage("Product added to cart!");
    } else {
      setMessage(result.error);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        Product not found
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} />
          Back
        </button>

        {message && (
          <div
            className={`alert ${
              message.includes("added") ? "alert-success" : "alert-info"
            }`}
          >
            {message}
          </div>
        )}

        <div className="product-detail-grid">
          <div className="product-detail-image">
            {product.display_image || product.image_url || product.image ? (
              <img
                src={
                  product.display_image || product.image_url || product.image
                }
                alt={product.name}
              />
            ) : (
              <div className="image-placeholder">No Image Available</div>
            )}
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>

            {product.category && (
              <span className="product-category">{product.category.name}</span>
            )}

            <div className="product-rating">
              <Star size={20} fill="#fbbf24" color="#fbbf24" />
              <span className="rating-value">
                {parseFloat(product.rating || 0).toFixed(1)}
              </span>
              <span className="rating-count">
                ({product.num_reviews || 0} reviews)
              </span>
            </div>

            <div className="product-price">
              KSh {parseFloat(product.price).toFixed(2)}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">
                  In Stock: {product.stock} available
                </span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(product.stock, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="input"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-large"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            )}

            {product.reviews && product.reviews.length > 0 && (
              <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <div className="reviews-list">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{review.user}</span>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? "#fbbf24" : "none"}
                              color="#fbbf24"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <span className="review-date">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
