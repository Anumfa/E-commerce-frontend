import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import SaleManagement from './SaleManagement';
import BannerManagement from './BannerManagement';
import OrderManagement from './OrderManagement';
import ReviewManagement from './ReviewManagement';
import ContactManagement from './ContactManagement';
import AdminAuthPage from './AdminAuthPage';
import './AdminStyles.css';

// Detects whether the page was loaded through a browser refresh (F5 / Ctrl+R).
const isPageReload = () => {
  if (typeof performance === 'undefined') return false;
  const navEntry = performance.getEntriesByType?.('navigation')?.[0];
  if (navEntry) return navEntry.type === 'reload';
  return performance.navigation ? performance.navigation.type === 1 : false;
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Security: an admin session must NOT survive a browser refresh.
  const [needsLogout, setNeedsLogout] = useState(() => isPageReload());

  useEffect(() => {
    if (needsLogout) {
      dispatch(logout());
      setNeedsLogout(false);
    }
  }, [needsLogout, dispatch]);

  if (!isAuthenticated || needsLogout) {
    return <AdminAuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'product':
        return <ProductManagement />;
      case 'category':
        return <CategoryManagement />;
      case 'sale':
        return <SaleManagement />;
      case 'banner':
        return <BannerManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'contacts':
        return <ContactManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="admin-main">
        <TopBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

