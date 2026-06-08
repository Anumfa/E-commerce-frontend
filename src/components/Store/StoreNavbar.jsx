import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import './StoreStyles.css';

const StoreNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="store-navbar-wrapper">
      <div className="store-navbar">
        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          className="store-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand/Logo */}
        <Link to="/" className="store-nav-brand" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="store-brand-dot"></div>
          <span className="store-brand-text">EcoVibe</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <ul className={`store-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" className={`store-nav-link ${path === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/shop" className={`store-nav-link ${path === '/shop' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/categories" className={`store-nav-link ${path === '/categories' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Categories</Link></li>
          <li><Link to="/about" className={`store-nav-link ${path === '/about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" className={`store-nav-link ${path === '/contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
        </ul>

        {/* Search Bar */}
        <div className="store-nav-search">
          <Search size={18} className="store-search-icon" />
          <input type="text" placeholder="Search premium products..." />
        </div>

        {/* Nav Actions */}
        <div className="store-nav-actions">
          <Link to="/favorites" className="store-action-btn" title="Favorites">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="store-badge">{wishlistCount}</span>}
          </Link>
          
          <Link to="/cart" className="store-action-btn" title="Shopping Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="store-badge">{cartCount}</span>}
          </Link>

          <Link to="/account" className="store-action-btn" title="Account">
            <User size={20} />
          </Link>

          {/* Elegant Switch to Admin Panel Toggle */}
          <Link 
            to="/admin"
            className="store-admin-toggle-btn"
            title="Switch to Admin Dashboard"
          >
            <LayoutDashboard size={16} />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StoreNavbar;
