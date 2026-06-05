import React from 'react';
import { Link } from 'react-router-dom';
import './StoreStyles.css';

// Using the same CATEGORIES data from ShopPage for consistency
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

const CategoriesPage = () => {
  return (
    <div className="categories-page-container">
      <div className="store-section-header" style={{ marginTop: '40px' }}>
        <div className="store-section-title-area">
          <span className="store-section-subtitle">Explore</span>
          <h2 className="store-section-title">All Categories</h2>
          <div className="store-section-line"></div>
        </div>
      </div>

      <div className="categories-showcase">
        {CATEGORIES.map(category => (
          <div key={category.id} className="category-group-section">
            <Link to={`/shop`} className="category-group-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${category.image})` }}>
              <div className="category-group-content">
                <h2>{category.name}</h2>
                <p>Shop Collection &rarr;</p>
              </div>
            </Link>

            <div className="category-sub-grid">
              {category.subcategories.map(sub => (
                <Link to={`/shop`} key={sub.name} className="subcat-card">
                  <div className="subcat-image-wrapper">
                    <img src={sub.image} alt={sub.name} />
                  </div>
                  <div className="subcat-info">
                    <h3>{sub.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
