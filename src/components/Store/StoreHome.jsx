import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchBanners } from '../../redux/slices/bannerSlice';
import StoreNavbar from './StoreNavbar';
import StoreBanner from './StoreBanner';
import ProductCard from './ProductCard';
import ReviewsSection from './ReviewsSection';
import ReviewModal from './ReviewModal';
import StoreFooter from './StoreFooter';
import ContactPage from './ContactPage';
import AboutUsPage from './AboutUsPage';
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

// Initial Customer Reviews for Store Layout completeness
const DEFAULT_REVIEWS = [
  {
    _id: 'rev-1',
    name: 'Watson Watson',
    rating: 5,
    comment: 'The AeroFit smartwatch is absolutely phenomenal! The screen resolution is extremely sharp, custom step counters work beautifully, and the battery genuinely lasts for days. Best purchase I have made in a while.',
    date: 'May 10, 2026'
  },
  {
    _id: 'rev-2',
    name: 'Eleanor Vance',
    rating: 4,
    comment: 'Sound signatures on the Apex headphones are deeply warm and beautiful. Perfect ANC for studying at cafes. My only minor critique is that the clamping force is slightly tight initially, but it loosens up nicely over a week.',
    date: 'Apr 28, 2026'
  },
  {
    _id: 'rev-3',
    name: 'Marcus Brody',
    rating: 5,
    comment: 'Extremely fast shipping! Packaged beautifully. The EchoSphere speaker has a really heavy, premium metal chassis that looks gorgeous on my minimalist desk. Sound is incredibly clean even at high volumes.',
    date: 'Apr 15, 2026'
  }
];

const StoreHome = ({ setView }) => {
  const dispatch = useDispatch();
  const { items: products, loading: productsLoading } = useSelector((state) => state.product);

  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  // Fetch items from backend API on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBanners());

    // Load local reviews
    const stored = localStorage.getItem('ecovibe_user_reviews');
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(DEFAULT_REVIEWS);
      }
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem('ecovibe_user_reviews', JSON.stringify(DEFAULT_REVIEWS));
    }
  }, [dispatch]);

  // Handle adding new reviews
  const handleAddReview = (newReview) => {
    const updated = [
      {
        _id: `user-rev-${Date.now()}`,
        ...newReview
      },
      ...reviews
    ];
    setReviews(updated);
    localStorage.setItem('ecovibe_user_reviews', JSON.stringify(updated));
  };

  // Determine Best Products (2 rows of 4 = 8 products)
  const getBestProducts = () => {
    // If backend products exist, sort them (e.g. by discount percentage or just take the first 8)
    if (products && products.length > 0) {
      // Find products that have discount prices, or fall back to standard list
      const sorted = [...products].sort((a, b) => {
        const discA = a.discountprice > 0 ? (a.price - a.discountprice) : 0;
        const discB = b.discountprice > 0 ? (b.price - b.discountprice) : 0;
        return discB - discA; // show higher discounts first
      });

      if (sorted.length >= 8) {
        return sorted.slice(0, 8);
      } else {
        // Pad with mock items if we don't have enough
        return [...sorted, ...MOCK_BEST_PRODUCTS.slice(sorted.length, 8)];
      }
    }
    return MOCK_BEST_PRODUCTS;
  };

  // Determine Featured Products (2 rows of 4 = 8 products)
  const getFeaturedProducts = () => {
    if (products && products.length > 0) {
      // We skip the first few products to avoid complete repetition, if possible
      const startIdx = products.length >= 12 ? 4 : 0;
      const sliced = products.slice(startIdx, startIdx + 8);
      
      if (sliced.length >= 8) {
        return sliced;
      } else {
        // Pad with mock featured items
        return [...sliced, ...MOCK_FEATURED_PRODUCTS.slice(sliced.length, 8)];
      }
    }
    return MOCK_FEATURED_PRODUCTS;
  };

  const bestProducts = getBestProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="store-body-wrapper">
      {/* 1. Navbar */}
      <StoreNavbar setView={setView} activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'home' ? (
        <>
          {/* 2. Hero Product Banner Carousel */}
          <StoreBanner />

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
      ) : activePage === 'contact' ? (
        <ContactPage />
      ) : (
        <AboutUsPage />
      )}

      {/* 6. Footer Section */}
      <StoreFooter />

      {/* 7. Interactive Review Creation Modal */}
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleAddReview} 
      />
    </div>
  );
};

export default StoreHome;
