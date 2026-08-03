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
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const StoreNavbar = ({ onAuthClick }) => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleAuthAction = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="store-navbar-wrapper">
      <div className="store-navbar">
        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="store-mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          className="store-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Brand/Logo */}
        <Link to="/" className="store-nav-brand" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="store-brand-dot"></div>
          <span className="store-brand-text">EcoVibe</span>
        </Link>

        {/* Navigation Links (Desktop inline / Mobile side drawer) */}
        <ul className={`store-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Drawer Header (mobile only) */}
          <li className="store-drawer-header">
            <Link to="/" className="store-drawer-brand" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="store-brand-dot"></div>
              <span className="store-brand-text">EcoVibe</span>
            </Link>
            <button 
              className="store-drawer-close" 
              onClick={() => setIsMobileMenuOpen(false)} 
              title="Close Menu"
            >
              <X size={22} />
            </button>
          </li>

          <li className="store-drawer-label">Menu</li>
          <li><Link to="/" className={`store-nav-link ${path === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/shop" className={`store-nav-link ${path === '/shop' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/categories" className={`store-nav-link ${path === '/categories' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Categories</Link></li>
          <li><Link to="/about" className={`store-nav-link ${path === '/about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" className={`store-nav-link ${path === '/contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>

          {/* Drawer quick actions (mobile only) */}
          <li className="store-drawer-divider"></li>
          <li className="store-drawer-label">Quick Access</li>
          <li>
            <Link to="/favorites" className="store-drawer-action" onClick={() => setIsMobileMenuOpen(false)}>
              <Heart size={18} /> Favorites
              {wishlistCount > 0 && <span className="store-drawer-badge">{wishlistCount}</span>}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="store-drawer-action" onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingBag size={18} /> Cart
              {cartCount > 0 && <span className="store-drawer-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin" className="store-drawer-action" onClick={() => setIsMobileMenuOpen(false)}>
              <LayoutDashboard size={18} /> Admin Portal
            </Link>
          </li>
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

          {/* Profile Icon with Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleAuthAction} 
              className="store-action-btn" 
              title="Account"
            >
              <User size={20} color={isAuthenticated ? '#d97706' : '#333333'} />
            </button>
            
            {/* Dropdown - Sign In / Sign Up or Profile */}
            {isProfileDropdownOpen && (
              <div className="store-profile-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="store-dropdown-user-info">
                      <p className="store-dropdown-name">{user?.name || 'User'}</p>
                      <p className="store-dropdown-email">{user?.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        dispatch(logout());
                        setIsProfileDropdownOpen(false);
                      }}
                      className="store-dropdown-logout-btn"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="store-dropdown-header">
                      <User size={24} className="store-dropdown-avatar-icon" />
                      <p className="store-dropdown-title">Welcome!</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        if (onAuthClick) onAuthClick();
                      }}
                      className="store-dropdown-signin-btn"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        if (onAuthClick) onAuthClick();
                      }}
                      className="store-dropdown-signup-btn"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* <Link to="/cart" className="store-action-btn" title="Shopping Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="store-badge">{cartCount}</span>}
          </Link> */}
          
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
