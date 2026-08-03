import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, ChevronDown, Star, Search, ArrowLeft } from 'lucide-react';
import { fetchCategories } from '../../redux/slices/categorySlice';
import ProductCard from './ProductCard';
import './StoreStyles.css';

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
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);
  const { items: categories } = useSelector((state) => state.category);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = (products && products.length > 0) ? [...products] : [...MOCK_PRODUCTS];

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory.name || categories.find(c => c.name === activeCategory.name)?.subcategories.some(sub => sub === p.ptype));
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${activeCategory ? activeCategory.imageUrl : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&fit=crop'})`
        }}
      >
        <div className="shop-hero-content">
          <h1>{activeSubcategory ? activeSubcategory : activeCategory ? activeCategory.name : 'All Collections'}</h1>
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
              {categories.map(cat => (
                <li key={cat._id} className="shop-category-item-wrapper">
                  <div 
                    className={`shop-category-name ${activeCategory?._id === cat._id ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(cat); setActiveSubcategory(null); }}
                  >
                    {cat.name}
                  </div>
                  {activeCategory?._id === cat._id && cat.subcategories && (
                    <ul className="shop-subcategory-list">
                      {cat.subcategories.map(sub => (
                        <li 
                          key={sub}
                          className={activeSubcategory === sub ? 'active' : ''}
                          onClick={() => setActiveSubcategory(sub)}
                        >
                          {sub}
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
                {activeCategory.subcategories.map((sub, idx) => (
                  <div 
                    key={idx}
                    className="shop-category-card"
                    onClick={() => setActiveSubcategory(sub)}
                  >
                    <img src={activeCategory.imageUrl} alt={sub} className="shop-category-image" />
                    <div className="shop-category-overlay">
                      <h3 style={{ fontSize: '16px' }}>{sub}</h3>
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
                {categories.map(cat => (
                  <div 
                    key={cat._id}
                    className="shop-category-card"
                    onClick={() => setActiveCategory(cat)}
                  >
                    <img src={cat.imageUrl} alt={cat.name} className="shop-category-image" />
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
