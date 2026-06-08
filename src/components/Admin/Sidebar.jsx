import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Layers, 
  ChevronRight,
  Image,
  Eye,
  LayoutDashboard,
  X
} from 'lucide-react';
import './AdminStyles.css';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => {
  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="sidebar-item-content">
        <Icon size={20} className="sidebar-icon" />
        <span className="sidebar-label">{label}</span>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <div className="logo-dot"></div>
          </div>
          <span className="logo-text">Dataflow</span>
        </div>
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={18} className="sidebar-close-icon" />
          <ChevronRight size={18} className="sidebar-collapse-icon" />
        </button>
      </div>

      <div className="sidebar-menu">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        />
        <SidebarItem 
          icon={ShoppingBag} 
          label="Product" 
          active={activeTab === 'product'} 
          onClick={() => setActiveTab('product')}
        />
        <SidebarItem 
          icon={Layers} 
          label="Category" 
          active={activeTab === 'category'} 
          onClick={() => setActiveTab('category')}
        />
        <SidebarItem 
          icon={Image} 
          label="Banner" 
          active={activeTab === 'banner'} 
          onClick={() => setActiveTab('banner')}
        />
        <SidebarItem 
          icon={Eye} 
          label="View Store" 
          active={false} 
          onClick={() => navigate('/')}
        />
      </div>
    </div>
    </>
  );
};

export default Sidebar;
