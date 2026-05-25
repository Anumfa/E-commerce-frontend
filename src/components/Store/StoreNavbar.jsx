import React from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  LayoutDashboard 
} from 'lucide-react';
import './StoreStyles.css';

const StoreNavbar = ({ setView, activePage, setActivePage }) => {
  return (
    <header className="store-navbar-wrapper">
      <div className="store-navbar">
        {/* Brand/Logo */}
        <a className="store-nav-brand" onClick={() => { setView('store'); setActivePage('home'); }}>
          <div className="store-brand-dot"></div>
          <span className="store-brand-text">EcoVibe</span>
        </a>

        {/* Navigation Links */}
        <ul className="store-nav-links">
          <li><a className={`store-nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={() => setActivePage('home')}>Home</a></li>
          <li><a className="store-nav-link" onClick={() => setActivePage('home')}>Shop</a></li>
          <li><a className="store-nav-link" onClick={() => setActivePage('home')}>Categories</a></li>
          <li><a className={`store-nav-link ${activePage === 'about' ? 'active' : ''}`} onClick={() => setActivePage('about')}>About Us</a></li>
          <li><a className={`store-nav-link ${activePage === 'contact' ? 'active' : ''}`} onClick={() => setActivePage('contact')}>Contact</a></li>
        </ul>

        {/* Search Bar */}
        <div className="store-nav-search">
          <Search size={18} className="store-search-icon" />
          <input type="text" placeholder="Search premium products..." />
        </div>

        {/* Nav Actions */}
        <div className="store-nav-actions">
          <button className="store-action-btn" title="Favorites">
            <Heart size={20} />
            <span className="store-badge">2</span>
          </button>
          
          <button className="store-action-btn" title="Shopping Cart">
            <ShoppingBag size={20} />
            <span className="store-badge">3</span>
          </button>

          <button className="store-action-btn" title="Account">
            <User size={20} />
          </button>

          {/* Elegant Switch to Admin Panel Toggle */}
          <button 
            className="store-admin-toggle-btn"
            onClick={() => setView('admin')}
            title="Switch to Admin Dashboard"
          >
            <LayoutDashboard size={16} />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default StoreNavbar;
