import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import BannerManagement from './BannerManagement';
import OrderManagement from './OrderManagement';
import ReviewManagement from './ReviewManagement';
import ContactManagement from './ContactManagement';
import AdminAuthPage from './AdminAuthPage';
import './AdminStyles.css';

const AdminDashboard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
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

