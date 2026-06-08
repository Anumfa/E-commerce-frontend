import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, Plus } from 'lucide-react';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import './StoreStyles.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);
  const { name, description, price, discount, discountprice, images, ptype } = product;

  // Enforce image fallback
  const displayImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop';

  // Calculate discount percentage if not explicit
  let discountPercentage = discount;
  if (!discountPercentage && price && discountprice) {
    discountPercentage = Math.round(((price - discountprice) / price) * 100);
  }

  // Generate random rating for aesthetic completeness (or use a fixed value)
  const rating = product.rating || (3.5 + Math.random() * 1.5).toFixed(1);
  const reviewCount = product.reviewsCount || Math.floor(10 + Math.random() * 90);

  // Render Star Icons based on rating
  const renderStars = (ratingVal) => {
    const stars = [];
    const fullStars = Math.floor(ratingVal);
    const hasHalf = ratingVal % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} fill="currentColor" />);
      } else if (i === fullStars + 1 && hasHalf) {
        // Simple star approximation, fill colors do the charm
        stars.push(<Star key={i} size={14} className="half-filled" fill="url(#star-half-grad)" />);
      } else {
        stars.push(<Star key={i} size={14} />);
      }
    }
    return stars;
  };

  return (
    <div className="store-product-card">
      {/* SVG Gradient definition for half-filled stars */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="star-half-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="var(--store-warning)" />
            <stop offset="50%" stopColor="var(--store-border)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Badges */}
      {discountPercentage > 0 ? (
        <span className="store-product-badge discount">{discountPercentage}% OFF</span>
      ) : (
        <span className="store-product-badge">NEW</span>
      )}

      {/* Wishlist Icon */}
      <button 
        className={`store-product-wishlist ${isWishlisted ? 'active' : ''}`} 
        title="Add to Wishlist"
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleWishlist(product));
        }}
        style={{ color: isWishlisted ? 'red' : 'currentColor' }}
      >
        <Heart size={18} fill={isWishlisted ? 'red' : 'none'} />
      </button>

      {/* Product Image Section */}
      <Link to={`/product/${product._id}`} className="store-product-img-box">
        <img 
          src={displayImage} 
          alt={name} 
          className="store-product-img" 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop';
          }}
        />
      </Link>

      {/* Details Section */}
      <div className="store-product-details">
        <span className="store-product-cat">{ptype || 'Physical'}</span>
        <h3 className="store-product-name" title={name}>{name}</h3>
        
        {/* Rating Row */}
        <div className="store-rating-container">
          <div className="store-stars">
            {renderStars(rating)}
          </div>
          <span className="store-rating-num">({reviewCount})</span>
        </div>

        {/* Pricing & Add to Cart Row */}
        <div className="store-product-price-row">
          <div className="store-price-box">
            {discountprice > 0 ? (
              <>
                <span className="store-original-price">${price}</span>
                <span className="store-current-price discounted">${discountprice}</span>
              </>
            ) : (
              <span className="store-current-price">${price}</span>
            )}
          </div>

          <button 
            className="store-cart-action-btn" 
            title="Add to Cart"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart({ 
                product, 
                quantity: 1,
                selectedColor: 'Black', // Default mock color
                selectedSize: 'M'       // Default mock size
              }));
              alert('Added to Cart!');
            }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
