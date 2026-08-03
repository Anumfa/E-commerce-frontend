import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { fetchBanners } from '../../redux/slices/bannerSlice';
import { fetchApprovedReviews } from '../../redux/slices/reviewSlice';
import StoreNavbar from './StoreNavbar';
import StoreBanner from './StoreBanner';
import ProductCard from './ProductCard';
import ReviewsSection from './ReviewsSection';
import ReviewModal from './ReviewModal';
import StoreFooter from './StoreFooter';
import ContactPage from './ContactPage';
import AboutUsPage from './AboutUsPage';
import ShopPage from './ShopPage';
import CategoriesPage from './CategoriesPage';
import AuthModal from './AuthModal';
import FavoritesPage from './FavoritesPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import OrderConfirmationPage from './OrderConfirmationPage';
import ProductDetailPage from './ProductDetailPage';
import './StoreStyles.css';

// Premium Fallback Products for "Best Products" (8 items = 2 rows of 4)
const MOCK_BEST_PRODUCTS = [
  {
    _id: 'mock-best-1',
    name: 'Apex Active Noise Cancelling Headphones',
    description: 'Immersive sound experience with up to 40 hours battery life and comfortable ear cups.',
    price: 299,
    discount: 17,
    discountprice: 249,
    ptype: 'Acoustics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop'],
    rating: 4.8,
    reviewsCount: 142
  },
  {
    _id: 'mock-best-2',
    name: 'AeroFit GPS AMOLED Smartwatch',
    description: 'Sleek premium fitness tracker with optical heart sensor and 12-day stand-by battery.',
    price: 199,
    discount: 20,
    discountprice: 159,
    ptype: 'Wearable',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&fit=crop'],
    rating: 4.6,
    reviewsCount: 88
  },
  {
    _id: 'mock-best-3',
    name: 'Lumina 4K Mirrorless Digital Camera',
    description: 'Ultra-lightweight chassis, fast hybrid auto-focus, and cinema-grade dual image stabilization.',
    price: 999,
    discount: 15,
    discountprice: 849,
    ptype: 'Vision',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&fit=crop'],
    rating: 4.9,
    reviewsCount: 34
  },
  {
    _id: 'mock-best-4',
    name: 'EchoSphere Hi-Fi Wireless Speaker',
    description: '360-degree spatial acoustics with dual passive radiators and smart assistant connectivity.',
    price: 149,
    discount: 20,
    discountprice: 119,
    ptype: 'Sound',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&fit=crop'],
    rating: 4.7,
    reviewsCount: 204
  },
  {
    _id: 'mock-best-5',
    name: 'Quantum Elite Standalone VR Headset',
    description: 'Stunning crystal clear OLED displays with 6DoF movement and ergonomic active cooling strap.',
    price: 499,
    discount: 20,
    discountprice: 399,
    ptype: 'Gaming',
    images: ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&fit=crop'],
    rating: 4.5,
    reviewsCount: 56
  },
  {
    _id: 'mock-best-6',
    name: 'Scribe Pro Paperlike E-Ink Tablet',
    description: 'Read and draft documents with a tactile, anti-glare screen and lag-free battery-free stylus.',
    price: 349,
    discount: 14,
    discountprice: 299,
    ptype: 'Office',
    images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&fit=crop'],
    rating: 4.4,
    reviewsCount: 41
  },
  {
    _id: 'mock-best-7',
    name: 'VoltMax 20K MagSafe Powerbank',
    description: 'High-density lithium charger with dynamic status display and multi-point secure magnetic alignment.',
    price: 79,
    discount: 25,
    discountprice: 59,
    ptype: 'Power',
    images: ['https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&fit=crop'],
    rating: 4.3,
    reviewsCount: 97
  },
  {
    _id: 'mock-best-8',
    name: 'Nova Wireless Dolby Atmos Soundbar',
    description: 'Cinematic spatial entertainment with integrated subwoofers and advanced adaptive acoustic tuning.',
    price: 399,
    discount: 12,
    discountprice: 349,
    ptype: 'Sound',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&fit=crop'],
    rating: 4.7,
    reviewsCount: 68
  }
];

// Premium Fallback Products for "Featured Products" (8 items = 2 rows of 4)
const MOCK_FEATURED_PRODUCTS = [
  {
    _id: 'mock-feat-1',
    name: 'Zenith Premium Mechanical Keyboard',
    description: 'Hot-swappable key switches, custom aluminum housing, and sound-dampening gasket plate.',
    price: 129,
    discount: 0,
    discountprice: 0,
    ptype: 'Hardware',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&fit=crop'],
    rating: 4.8,
    reviewsCount: 77
  },
  {
    _id: 'mock-feat-2',
    name: 'Aura Ambient LED Desktop Lamp',
    description: 'Sleek architectural design with stepless dimming, warmth controller, and wireless charger base.',
    price: 89,
    discount: 0,
    discountprice: 0,
    ptype: 'Lighting',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&fit=crop'],
    rating: 4.5,
    reviewsCount: 110
  },
  {
    _id: 'mock-feat-3',
    name: 'PixelPro Graphic Drawing Tablet',
    description: 'Expansive 16-inch IPS graphic display with 8192 levels of pressure sensitivity stylus.',
    price: 499,
    discount: 0,
    discountprice: 0,
    ptype: 'Creative',
    images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&fit=crop'],
    rating: 4.6,
    reviewsCount: 29
  },
  {
    _id: 'mock-feat-4',
    name: 'Horizon Short Throw Smart Projector',
    description: 'Transform your walls into a 120-inch 4K HDR home theater with built-in Harman Kardon speakers.',
    price: 1499,
    discount: 0,
    discountprice: 0,
    ptype: 'Media',
    images: ['https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&fit=crop'],
    rating: 4.9,
    reviewsCount: 18
  },
  {
    _id: 'mock-feat-5',
    name: 'Manta Ergonomic Trackball Mouse',
    description: 'Sculpted structural design keeps hand supported to prevent fatigue. Multi-device dynamic pairing.',
    price: 99,
    discount: 0,
    discountprice: 0,
    ptype: 'Office',
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&fit=crop'],
    rating: 4.4,
    reviewsCount: 65
  },
  {
    _id: 'mock-feat-6',
    name: 'Stratus Double MagSafe Charging Dock',
    description: 'Charge your iPhone and Apple Watch simultaneously on a solid sandblasted steel workspace stand.',
    price: 49,
    discount: 0,
    discountprice: 0,
    ptype: 'Accessories',
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&fit=crop'],
    rating: 4.7,
    reviewsCount: 124
  },
  {
    _id: 'mock-feat-7',
    name: 'Chrono Classic Leather Quartz Watch',
    description: 'Handcrafted genuine leather strap with Swiss movement, surgical-grade steel casing, and water-resistance.',
    price: 249,
    discount: 0,
    discountprice: 0,
    ptype: 'Wearable',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&fit=crop'],
    rating: 4.6,
    reviewsCount: 43
  },
  {
    _id: 'mock-feat-8',
    name: 'Sonos Move Weatherproof Smart Speaker',
    description: 'Take brilliant sound outdoors. Drop-resistant, dustproof, and IP56 splash-proof battery portable.',
    price: 349,
    discount: 0,
    discountprice: 0,
    ptype: 'Sound',
    images: ['https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&fit=crop'],
    rating: 4.8,
    reviewsCount: 92
  }
];

const StoreHome = () => {
  const dispatch = useDispatch();
  const { items: products, loading: productsLoading } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { approvedItems: approvedReviews } = useSelector((state) => state.review);

  const [reviews, setReviews] = React.useState([]);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = React.useState(false);

  // Fetch items from backend API on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchBanners());
    dispatch(fetchApprovedReviews());
  }, [dispatch]);

  // Always use approved reviews from API (fully dynamic)
  useEffect(() => {
    if (approvedReviews) {
      setReviews(approvedReviews);
    }
  }, [approvedReviews]);

  // Handle adding new reviews (update local state immediately)
  const handleAddReview = (newReview) => {
    // After submitting, refresh approved reviews from API
    dispatch(fetchApprovedReviews());
  };

  // Determine Best Products (2 rows of 4 = 8 products) - Dynamic from backend
  const getBestProducts = () => {
    if (products && products.length > 0) {
      const sorted = [...products].sort((a, b) => {
        const discA = a.discountprice > 0 ? (a.price - a.discountprice) : 0;
        const discB = b.discountprice > 0 ? (b.price - b.discountprice) : 0;
        return discB - discA;
      });
      return sorted.slice(0, Math.min(sorted.length, 8));
    }
    return [];
  };

  // Determine Featured Products - Dynamic from backend
  const getFeaturedProducts = () => {
    if (products && products.length > 0) {
      const startIdx = products.length >= 12 ? 4 : 0;
      return products.slice(startIdx, startIdx + Math.min(8, products.length - startIdx));
    }
    return [];
  };

  const bestProducts = getBestProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="store-body-wrapper">
      {/* 1. Navbar */}
      <StoreNavbar onAuthClick={() => setAuthModalOpen(true)} />

      <Routes>
        <Route path="/" element={
          <>
            {/* 2. Hero Product Banner Carousel */}
            <StoreBanner />

            {/* Welcome Card for Logged-in Users */}
            {isAuthenticated && (
              <div className="store-section-container" style={{ marginTop: '24px', marginBottom: '24px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                  borderRadius: '24px',
                  padding: '40px',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '24px'
                }}
                className="welcome-card-hover"
                >
                  {/* Decorative blurred circles for modern look */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(30px)',
                    pointerEvents: 'none'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '20%',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none'
                  }}></div>

                  <div style={{ flex: '1 1 500px', zIndex: 1 }}>
                    <span style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '6px 16px',
                      borderRadius: '50px',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'inline-block',
                      marginBottom: '16px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      Member Account
                    </span>
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      margin: '0 0 12px 0',
                      letterSpacing: '-0.5px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      Welcome back, {user?.name || 'Valued Customer'}! 👋
                    </h2>
                    <p style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: 0,
                      lineHeight: '1.6',
                      maxWidth: '550px'
                    }}>
                      We are thrilled to have you back at <strong>EcoVibe</strong>. Check out your personalized recommendations, view items left in your cart, or jump straight into shopping the latest trends!
                    </p>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    zIndex: 1, 
                    flexWrap: 'wrap', 
                    alignItems: 'center' 
                  }}>
                    <Link to="/shop" style={{ textDecoration: 'none' }}>
                      <button style={{
                        padding: '14px 28px',
                        backgroundColor: '#ffffff',
                        color: '#1e3a8a',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      className="welcome-card-btn-primary"
                      >
                        Explore Shop
                      </button>
                    </Link>

                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                      <button style={{
                        padding: '14px 28px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)'
                      }}
                      className="welcome-card-btn-secondary"
                      >
                        View Cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Best Products (2 Rows = 8 items) */}
            <div className="store-section-container">
              <div className="store-section-header">
                <div className="store-section-title-area">
                  <span className="store-section-subtitle">Specials</span>
                  <h2 className="store-section-title">Best Selling Products</h2>
                  <div className="store-section-line"></div>
                </div>
              </div>

              {productsLoading && (!products || products.length === 0) ? (
                <div className="store-grid-layout">
                  <div className="store-empty-catalog">Loading hot sales catalog...</div>
                </div>
              ) : (
                <div className="store-grid-layout">
                  {bestProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </div>

            {/* 4. Featured Products (2 Rows = 8 items) */}
            <div className="store-section-container">
              <div className="store-section-header">
                <div className="store-section-title-area">
                  <span className="store-section-subtitle">Curated</span>
                  <h2 className="store-section-title">Featured Products</h2>
                  <div className="store-section-line"></div>
                </div>
              </div>

              {productsLoading && (!products || products.length === 0) ? (
                <div className="store-grid-layout">
                  <div className="store-empty-catalog">Loading curated list...</div>
                </div>
              ) : (
                <div className="store-grid-layout">
                  {featuredProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </div>

            {/* 5. User Reviews Section */}
            <ReviewsSection 
              reviews={reviews} 
              onWriteReviewClick={() => setModalOpen(true)} 
            />
          </>
        } />
        
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>

      {/* 6. Footer Section */}
      <StoreFooter />

      {/* 7. Interactive Review Creation Modal */}
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleAddReview} 
      />

      {/* 8. Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default StoreHome;
