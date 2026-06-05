import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './StoreStyles.css';

const FavoritesPage = () => {
  // In a real app, this would fetch from a wishlistSlice
  // For now, let's just use the first 4 products as a mock favorites list
  const { items: products } = useSelector((state) => state.product);
  const favoriteProducts = products ? products.slice(0, 4) : [];

  return (
    <div className="store-page-container" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', marginTop: '80px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Your Favorites</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>Items you have saved for later.</p>
      
      {favoriteProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '20px', color: '#333' }}>Your wishlist is empty</h3>
          <p style={{ color: '#666', marginTop: '8px' }}>Explore our shop and add some items to your favorites!</p>
        </div>
      ) : (
        <div className="store-grid-layout">
          {favoriteProducts.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
