import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import './StoreStyles.css';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="categories-page-container">
      <div className="store-section-header" style={{ marginTop: '40px' }}>
        <div className="store-section-title-area">
          <span className="store-section-subtitle">Explore</span>
          <h2 className="store-section-title">All Categories</h2>
          <div className="store-section-line"></div>
        </div>
      </div>

      {loading ? (
        <div className="store-empty-catalog">Loading categories...</div>
      ) : categories && categories.length > 0 ? (
        <div className="categories-showcase">
          {categories.map(category => (
            <div key={category._id} className="category-group-section">
              <Link to={`/shop`} className="category-group-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${category.imageUrl})` }}>
                <div className="category-group-content">
                  <h2>{category.name}</h2>
                  <p>Shop Collection &rarr;</p>
                </div>
              </Link>

              {category.subcategories && category.subcategories.length > 0 && (
                <div className="category-sub-grid">
                  {category.subcategories.map((sub, idx) => (
                    <Link to={`/shop`} key={idx} className="subcat-card">
                      <div className="subcat-image-wrapper">
                        <img src={category.imageUrl} alt={sub} />
                      </div>
                      <div className="subcat-info">
                        <h3>{sub}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="store-empty-catalog" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>No categories available yet. Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
