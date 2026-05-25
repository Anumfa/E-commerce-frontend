import React from 'react';
import { 
  Search, 
  Moon, 
  Bell, 
  MessageSquare, 
  Maximize, 
  LayoutGrid, 
  ChevronDown,
  Eye
} from 'lucide-react';
import './AdminStyles.css';

const TopBar = ({ setView }) => {
  return (
    <div className="admin-topbar">
      <div className="topbar-left">
        <div className="search-container">
          <Search size={18} color="var(--admin-text-muted)" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-actions">
          {/* Direct client storefront shortcut */}
          <button 
            onClick={() => setView('store')}
            title="Switch to Client Storefront"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 14px', 
              borderRadius: '30px', 
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: 600, 
              fontSize: '13px',
              marginRight: '8px',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Eye size={15} />
            <span>Storefront</span>
          </button>

          <div className="action-item">
            <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="lang-flag" />
          </div>
          <button className="action-item">
            <Moon size={20} />
          </button>
          <button className="action-item relative">
            <Bell size={20} />
            <span className="notification-badge">1</span>
          </button>
          <button className="action-item relative">
            <MessageSquare size={20} />
            <span className="notification-badge">1</span>
          </button>
          <button className="action-item">
            <Maximize size={20} />
          </button>
          <button className="action-item">
            <LayoutGrid size={20} />
          </button>
        </div>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Kristin Watson</span>
            <span className="user-role">Sale Administrator</span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
            alt="User" 
            className="user-avatar" 
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
