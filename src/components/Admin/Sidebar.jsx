import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingBag, 
  Layers, 
  ChevronRight,
  Image,
  Eye,
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  Phone,
  BadgePercent,
  LogOut,
  X
} from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';
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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Close the drawer with Escape and stop the page behind it from scrolling.
  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const drawerQuery = window.matchMedia('(max-width: 1024px)');
    const previousOverflow = document.body.style.overflow;

    if (drawerQuery.matches) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsSidebarOpen(false);
    };

    // If the viewport grows past the drawer breakpoint, release the lock and close it.
    const handleViewportChange = (event) => {
      if (event.matches) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = previousOverflow;
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    drawerQuery.addEventListener('change', handleViewportChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      drawerQuery.removeEventListener('change', handleViewportChange);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

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
          aria-label="Close menu"
        >
          <X size={18} className="sidebar-close-icon" />
          <ChevronRight size={18} className="sidebar-collapse-icon" />
        </button>
      </div>

      <div className="sidebar-menu">
        <span className="sidebar-section-label">Menu</span>
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
          icon={BadgePercent} 
          label="Sale" 
          active={activeTab === 'sale'} 
          onClick={() => setActiveTab('sale')}
        />
        <SidebarItem 
          icon={ClipboardList} 
          label="Orders" 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        />
        <SidebarItem 
          icon={Image} 
          label="Banner" 
          active={activeTab === 'banner'} 
          onClick={() => setActiveTab('banner')}
        />
        <SidebarItem 
          icon={MessageSquare} 
          label="Reviews" 
          active={activeTab === 'reviews'} 
          onClick={() => setActiveTab('reviews')}
        />
        <SidebarItem 
          icon={Phone} 
          label="Contacts" 
          active={activeTab === 'contacts'} 
          onClick={() => setActiveTab('contacts')}
        />
        <SidebarItem 
          icon={Eye} 
          label="View Store" 
          active={false} 
          onClick={() => navigate('/')}
        />
      </div>

      {/* Drawer footer - visible on the responsive drawer only */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=7c3aed&color=fff&size=80`}
            alt={user?.name || 'Admin'}
            className="sidebar-user-avatar"
          />
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'Admin'}</span>
            <span className="sidebar-user-role">{user?.email || 'Administrator'}</span>
          </div>
        </div>
        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={() => {
            setIsSidebarOpen(false);
            dispatch(logout());
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
