import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Eye,
  Menu,
  LogOut
} from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';
import './AdminStyles.css';

const TopBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className="admin-topbar">
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="admin-mobile-menu-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--admin-text-main)', cursor: 'pointer' }}
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-actions">
          <button 
            onClick={() => navigate('/')}
            title="View Storefront"
            className="admin-storefront-btn"
          >
            <Eye size={15} />
            <span>Storefront</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="user-profile" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">{user?.email || 'Administrator'}</span>
          </div>
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=7c3aed&color=fff&size=100`} 
            alt={user?.name || 'User'} 
            className="user-avatar" 
          />
          
          {showProfileDropdown && (
            <div className="admin-profile-dropdown">
              <button 
                onClick={() => { dispatch(logout()); setShowProfileDropdown(false); }}
                className="admin-logout-btn"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
