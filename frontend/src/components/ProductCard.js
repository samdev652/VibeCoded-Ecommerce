import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        {product.display_image || product.image_url || product.image ? (
          <img
            src={product.display_image || product.image_url || product.image}
            alt={product.name}
          />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {product.category && (
          <span className="product-category">{product.category.name}</span>
        )}

        <div className="product-rating">
          <Star size={16} fill="#fbbf24" color="#fbbf24" />
          <span>{parseFloat(product.rating || 0).toFixed(1)}</span>
          <span className="product-reviews">({product.num_reviews || 0})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">
            KSh {parseFloat(product.price).toFixed(2)}
          </span>

          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
