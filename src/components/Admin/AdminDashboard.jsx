import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import BannerManagement from './BannerManagement';
import './AdminStyles.css';

const AdminDashboard = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setView={setView} />
      <div className="admin-main">
        <TopBar setView={setView} />
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

