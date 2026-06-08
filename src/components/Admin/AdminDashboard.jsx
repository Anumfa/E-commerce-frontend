import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import BannerManagement from './BannerManagement';
import './AdminStyles.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          setIsSidebarOpen(false); // Close sidebar on mobile when navigating
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

