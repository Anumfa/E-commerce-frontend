import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { getPricing } from '../../utils/pricing';
import { Minus, Plus, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import './StoreStyles.css';
import './ProductDetail.css';

import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [activeImage, setActiveImage] = useState(0);

  // Load product data
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const foundProduct = products.find((p) => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [id, products, dispatch]);

  // Reset the image slider whenever a different product is opened.
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  if (loading || (!product && products.length === 0)) {
    return <div className="store-page-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="store-page-not-found">Product not found.</div>;
  }

  // Price after product discount OR category / subcategory sale.
  const { price, finalPrice, discountPercent, hasDiscount } = getPricing(product);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&fit=crop'];

  // Slider helpers (kept simple so the last image wraps to the first).
  const safeImageIndex = Math.min(activeImage, images.length - 1);
  const goToPrevImage = () => setActiveImage((i) => (i - 1 + images.length) % images.length);
  const goToNextImage = () => setActiveImage((i) => (i + 1) % images.length);

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      selectedColor,
      selectedSize: 'Standard'
    }));
    alert('Added to Bag!');
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> &gt; <span>{product.ptype || 'Category'}</span> &gt; <span>{product.name}</span>
      </div>

      <div className="pd-container">
        {/* Left Side: Image Slider */}
        <div className="pd-gallery pd-slider">
          <div className="pd-slider-stage">
            <img
              key={safeImageIndex}
              src={images[safeImageIndex]}
              alt={`${product.name} - image ${safeImageIndex + 1}`}
              loading="eager"
              decoding="async"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="pd-slider-nav pd-slider-prev"
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="pd-slider-nav pd-slider-next"
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
                <span className="pd-slider-counter">
                  {safeImageIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="pd-slider-thumbs">
              {images.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`pd-slider-thumb ${idx === safeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Sticky Details */}
        <div className="pd-info-wrapper">
          <div className="pd-info-sticky">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-sku">SKU: {product._id.substring(0, 14).toUpperCase()}</p>
            
            <div className="pd-price-row">
              {hasDiscount ? (
                <>
                  <span className="pd-original-price">Rs. {price}</span>
                  <span className="pd-current-price">Rs. {finalPrice}</span>
                  <span className="pd-sale-tag">{discountPercent}% OFF</span>
                </>
              ) : (
                <span className="pd-current-price">Rs. {price}</span>
              )}
            </div>

            <div className="pd-color-selector">
              <div 
                className={`pd-color-circle black ${selectedColor === 'Black' ? 'active' : ''}`}
                onClick={() => setSelectedColor('Black')}
              ></div>
              <div 
                className={`pd-color-circle beige ${selectedColor === 'Beige' ? 'active' : ''}`}
                onClick={() => setSelectedColor('Beige')}
              ></div>
            </div>

            <div className="pd-actions-row">
              <div className="pd-quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
              </div>
              <button className="pd-add-to-bag" onClick={handleAddToCart}>ADD TO BAG</button>
            </div>

            <div className="pd-installments">
              <span className="pd-badge">boodmay</span>
              <span className="pd-installment-text">PAY IN 3 INSTALLMENTS OF <strong>RS. {Math.round(finalPrice / 3)}</strong></span>
            </div>

            <div className="pd-tabs">
              <button 
                className={`pd-tab ${activeTab === 'DETAILS' ? 'active' : ''}`}
                onClick={() => setActiveTab('DETAILS')}
              >DETAILS</button>
              <button 
                className={`pd-tab ${activeTab === 'DESCRIPTION' ? 'active' : ''}`}
                onClick={() => setActiveTab('DESCRIPTION')}
              >DESCRIPTION</button>
            </div>

            <div className="pd-tab-content">
              {activeTab === 'DETAILS' ? (
                <ul className="pd-specs-list">
                  <li><strong>Color:</strong> {selectedColor}</li>
                  <li><strong>Material:</strong> Polyurethane</li>
                  <li><strong>Outer Shell:</strong> PU</li>
                  <li><strong>Lining:</strong> Polyester</li>
                  <li><strong>Measurement:</strong> Standard Size</li>
                </ul>
              ) : (
                <p className="pd-desc-text">{product.description || 'No description available for this product.'}</p>
              )}
            </div>
            
            <p className="pd-note">NOTE: ACTUAL PRODUCT COLOR MAY VARY SLIGHTLY FROM THE IMAGE.</p>

            <div className="pd-share-row">
              <span>SHARE THIS LOOK</span>
              <div className="pd-social-icons">
                 <div className="pd-social-icon">💬</div>
                 <div className="pd-social-icon">fb</div>
                 <div className="pd-social-icon">🔗</div>
              </div>
            </div>

            {/* Floating Chat Icon (mock) */}
            <div className="pd-floating-chat">
              <MessageSquare size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
