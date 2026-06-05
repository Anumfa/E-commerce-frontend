import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  LayoutDashboard 
} from 'lucide-react';
import './StoreStyles.css';

const StoreNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="store-navbar-wrapper">
      <div className="store-navbar">
        {/* Brand/Logo */}
        <Link to="/" className="store-nav-brand">
          <div className="store-brand-dot"></div>
          <span className="store-brand-text">EcoVibe</span>
        </Link>

        {/* Navigation Links */}
        <ul className="store-nav-links">
          <li><Link to="/" className={`store-nav-link ${path === '/' ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/shop" className={`store-nav-link ${path === '/shop' ? 'active' : ''}`}>Shop</Link></li>
          <li><Link to="/categories" className={`store-nav-link ${path === '/categories' ? 'active' : ''}`}>Categories</Link></li>
          <li><Link to="/about" className={`store-nav-link ${path === '/about' ? 'active' : ''}`}>About Us</Link></li>
          <li><Link to="/contact" className={`store-nav-link ${path === '/contact' ? 'active' : ''}`}>Contact</Link></li>
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
            <span className="store-badge">2</span>
          </Link>
          
          <Link to="/cart" className="store-action-btn" title="Shopping Cart">
            <ShoppingBag size={20} />
            <span className="store-badge">2</span>
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
