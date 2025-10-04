import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Package } from 'lucide-react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductRecommendations from '../components/ProductRecommendations';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/products/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/products/?';
      if (search) url += `search=${search}&`;
      if (selectedCategory) url += `category=${selectedCategory}&`;
      
      const response = await axios.get(url);
      const allProducts = response.data.results || response.data;
      setProducts(allProducts);
      
      // Set featured products (highest rated)
      if (!search && !selectedCategory) {
        const featured = [...allProducts]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 6);
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCategory]);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setMessage('Please login to add items to cart');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const result = await addToCart(productId, 1);
    if (result.success) {
      setMessage('Product added to cart!');
    } else {
      setMessage(result.error);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Welcome to E-Shop</h1>
            <p>Discover amazing products at unbeatable prices</p>
            <div className="hero-features">
              <div className="hero-feature">
                <Package size={24} />
                <span>Free Shipping</span>
              </div>
              <div className="hero-feature">
                <Star size={24} />
                <span>Top Rated</span>
              </div>
              <div className="hero-feature">
                <TrendingUp size={24} />
                <span>Best Deals</span>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`alert ${message.includes('added') ? 'alert-success' : 'alert-info'}`}>
            {message}
          </div>
        )}

        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </div>

          <div className="category-filters">
            <button
              className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All
            </button>
            {Array.isArray(categories) && categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {!search && !selectedCategory && featuredProducts.length > 0 && (
          <ProductRecommendations 
            products={featuredProducts} 
            title="⭐ Featured Products - Top Rated"
          />
        )}

        {/* Main Products Grid */}
        <div className="products-section">
          <h2 className="section-title">
            {search ? `Search Results for "${search}"` : 
             selectedCategory ? 'Filtered Products' : 
             'All Products'}
          </h2>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <Package size={64} color="#9ca3af" />
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        {!search && !selectedCategory && products.length > 6 && (
          <ProductRecommendations 
            products={products.slice(6, 12)} 
            title="🔥 Trending Now"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
