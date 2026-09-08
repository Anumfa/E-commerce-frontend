import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Minus, Plus, MessageSquare } from 'lucide-react';
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

  // Load product data
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const foundProduct = products.find((p) => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [id, products, dispatch]);

  if (loading || (!product && products.length === 0)) {
    return <div className="store-page-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="store-page-not-found">Product not found.</div>;
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&fit=crop'];

  // Pad images to create a gallery like the reference
  const galleryImages = images.length < 4 
    ? [...images, ...Array(4 - images.length).fill(images[0])] 
    : images;

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
        {/* Left Side: Image Gallery Grid */}
        <div className="pd-gallery">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="pd-gallery-item">
              <img src={img} alt={`${product.name} angle ${idx + 1}`} loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Details */}
        <div className="pd-info-wrapper">
          <div className="pd-info-sticky">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-sku">SKU: {product._id.substring(0, 14).toUpperCase()}</p>
            
            <div className="pd-price-row">
              {product.discountprice > 0 ? (
                <>
                  <span className="pd-original-price">Rs. {product.price}</span>
                  <span className="pd-current-price">Rs. {product.discountprice}</span>
                </>
              ) : (
                <span className="pd-current-price">Rs. {product.price}</span>
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
              <span className="pd-installment-text">PAY IN 3 INSTALLMENTS OF <strong>RS. {Math.round((product.discountprice || product.price) / 3)}</strong></span>
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
