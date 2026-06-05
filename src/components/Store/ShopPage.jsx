import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Filter, ChevronDown, Star, Search, ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import './StoreStyles.css';

// Mock Categories with Subcategories (with images)
const CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&fit=crop',
    subcategories: [
      { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&fit=crop' },
      { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&fit=crop' },
      { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop' },
      { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&fit=crop' }
    ]
  },
  {
    id: 'cat-2',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&fit=crop',
    subcategories: [
      { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&fit=crop' },
      { name: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&fit=crop' },
      { name: 'Kids', image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&fit=crop' },
      { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500&fit=crop' }
    ]
  },
  {
    id: 'cat-3',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&fit=crop',
    subcategories: [
      { name: 'Furniture', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&fit=crop' },
      { name: 'Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&fit=crop' },
      { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&fit=crop' },
      { name: 'Bedding', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&fit=crop' }
    ]
  },
  {
    id: 'cat-4',
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&fit=crop',
    subcategories: [
      { name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&fit=crop' },
      { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1504280390226-e2f2e51922c5?w=500&fit=crop' },
      { name: 'Team Sports', image: 'https://images.unsplash.com/photo-1518605368461-1ee12523f05f?w=500&fit=crop' },
      { name: 'Water Sports', image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=500&fit=crop' }
    ]
  }
];

// Fallback Mock Products if backend is empty
const MOCK_PRODUCTS = [
  { _id: 'm1', name: 'Apex ANC Headphones', description: 'Immersive sound.', price: 299, ptype: 'Headphones', category: 'Electronics', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop'] },
  { _id: 'm2', name: 'AeroFit Smartwatch', description: 'Fitness tracker.', price: 199, ptype: 'Fitness', category: 'Sports', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&fit=crop'] },
  { _id: 'm3', name: 'Lumina 4K Camera', description: 'Mirrorless digital.', price: 999, ptype: 'Cameras', category: 'Electronics', images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&fit=crop'] },
  { _id: 'm4', name: 'Zenith Keyboard', description: 'Mechanical keyboard.', price: 129, ptype: 'Laptops', category: 'Electronics', images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&fit=crop'] },
  { _id: 'm5', name: 'Classic Leather Jacket', description: 'Premium leather.', price: 199, ptype: 'Men', category: 'Fashion', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&fit=crop'] },
  { _id: 'm6', name: 'Minimalist Desk', description: 'Oak wood desk.', price: 349, ptype: 'Furniture', category: 'Home & Living', images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&fit=crop'] },
  { _id: 'm7', name: 'Yoga Mat Pro', description: 'Non-slip mat.', price: 49, ptype: 'Fitness', category: 'Sports', images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&fit=crop'] },
  { _id: 'm8', name: 'Summer Dress', description: 'Floral pattern.', price: 89, ptype: 'Women', category: 'Fashion', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&fit=crop'] },
];

const ShopPage = () => {
  const { items: products, loading } = useSelector((state) => state.product);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = (products && products.length > 0) ? [...products] : [...MOCK_PRODUCTS];

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory.name || CATEGORIES.find(c => c.name === activeCategory.name)?.subcategories.some(sub => sub.name === p.ptype));
    }
    if (activeSubcategory) {
      result = result.filter(p => p.ptype === activeSubcategory.name);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    result = result.filter(p => p.price <= priceRange);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return result;
  }, [products, activeCategory, activeSubcategory, searchQuery, priceRange, sortBy]);

  return (
    <div className="shop-advanced-container">
      {/* Category Hero Banner */}
      <div 
        className="shop-hero-banner"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${activeSubcategory ? activeSubcategory.image : activeCategory ? activeCategory.image : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&fit=crop'})`
        }}
      >
        <div className="shop-hero-content">
          <h1>{activeSubcategory ? activeSubcategory.name : activeCategory ? activeCategory.name : 'All Collections'}</h1>
          <p>Discover our premium selection tailored just for you</p>
        </div>
      </div>

      <div className="shop-main-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="shop-sidebar-widget">
            <h3 className="shop-widget-title">Categories</h3>
            <ul className="shop-category-list">
              <li 
                className={!activeCategory ? 'active' : ''}
                onClick={() => { setActiveCategory(null); setActiveSubcategory(null); }}
              >
                All Products
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id} className="shop-category-item-wrapper">
                  <div 
                    className={`shop-category-name ${activeCategory?.id === cat.id ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(cat); setActiveSubcategory(null); }}
                  >
                    {cat.name}
                  </div>
                  {activeCategory?.id === cat.id && (
                    <ul className="shop-subcategory-list">
                      {cat.subcategories.map(sub => (
                        <li 
                          key={sub.name}
                          className={activeSubcategory?.name === sub.name ? 'active' : ''}
                          onClick={() => setActiveSubcategory(sub)}
                        >
                          {sub.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-sidebar-widget">
            <h3 className="shop-widget-title">Filter by Price</h3>
            <div className="shop-price-slider">
              <input 
                type="range" 
                min="0" 
                max="2000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="shop-range-input"
              />
              <div className="shop-price-labels">
                <span>$0</span>
                <span>Up to ${priceRange}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Product Area */}
        <main className="shop-content-area">
          {/* Subcategory Visual Grid */}
          {activeCategory && !activeSubcategory && (
            <div className="shop-subcategories-visual">
              <h3 className="shop-visual-title">Explore {activeCategory.name}</h3>
              <div className="shop-categories-grid" style={{ marginBottom: '32px' }}>
                {activeCategory.subcategories.map(sub => (
                  <div 
                    key={sub.name}
                    className="shop-category-card"
                    onClick={() => setActiveSubcategory(sub)}
                  >
                    <img src={sub.image} alt={sub.name} className="shop-category-image" />
                    <div className="shop-category-overlay">
                      <h3 style={{ fontSize: '16px' }}>{sub.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Category Visual Grid */}
          {!activeCategory && (
            <div className="shop-subcategories-visual">
              <h3 className="shop-visual-title">Shop by Category</h3>
              <div className="shop-categories-grid" style={{ marginBottom: '32px' }}>
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id}
                    className="shop-category-card"
                    onClick={() => setActiveCategory(cat)}
                  >
                    <img src={cat.image} alt={cat.name} className="shop-category-image" />
                    <div className="shop-category-overlay">
                      <h3 style={{ fontSize: '16px' }}>{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-toolbar-left">
              {activeSubcategory && (
                <button 
                  className="shop-back-btn"
                  onClick={() => setActiveSubcategory(null)}
                  title="Back to Categories"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="shop-search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="shop-result-count">
                {filteredAndSortedProducts.length} items
              </span>
            </div>
            <div className="shop-toolbar-right">
              <div className="shop-sort-box">
                <span className="shop-sort-label">Sort by:</span>
                <div className="shop-select-wrapper">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="shop-select-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="store-empty-catalog">Loading products...</div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="store-grid-layout shop-grid-3">
              {filteredAndSortedProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="store-empty-catalog">
              <h3>No products found</h3>
              <p>Try adjusting your filters or price range.</p>
              <button 
                className="store-banner-btn-primary" 
                style={{marginTop: '16px'}}
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange(1000);
                  setActiveCategory(null);
                  setActiveSubcategory(null);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
