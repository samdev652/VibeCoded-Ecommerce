import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './ProductRecommendations.css';

const ProductRecommendations = ({ products, title = "Recommended for You" }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="recommendations-section">
      <h2>{title}</h2>
      <div className="recommendations-grid">
        {products.slice(0, 6).map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="recommendation-card">
            <div className="recommendation-image">
              {(product.display_image || product.image_url || product.image) ? (
                <img src={product.display_image || product.image_url || product.image} alt={product.name} />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
            </div>
            <div className="recommendation-info">
              <h4>{product.name}</h4>
              <div className="recommendation-rating">
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>{parseFloat(product.rating || 0).toFixed(1)}</span>
                <span className="review-count">({product.num_reviews || 0})</span>
              </div>
              <div className="recommendation-price">${parseFloat(product.price).toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
