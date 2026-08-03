import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Package,
  Activity 
} from 'lucide-react';
import axios from 'axios';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import PromotionalSalesChart from './PromotionalSalesChart';
import RecentOrdersTable from './RecentOrdersTable';
import TopSaleList from './TopSaleList';
import UserLocationMap from './UserLocationMap';
import './AdminStyles.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/dashboard/stats`);
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="dashboard-overview-wrapper"><div className="loading-spinner">Loading dashboard...</div></div>;
  }

  const { stats, recentOrders, topSales, revenueChart } = data || {};
  const defaultChart = [{ value: 0 }];

  return (
    <div className="dashboard-overview-wrapper">
      {/* Welcome Header */}
      <div className="dashboard-header-block">
        <h1 className="dashboard-title">Overview Dashboard</h1>
        <p className="dashboard-subtitle">Aapke store ki overall performace aur real-time analytics.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="admin-stats-grid">
        <StatCard 
          icon={DollarSign} 
          label="Total Revenue" 
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} 
          change={0} 
          isPositive={true} 
          chartData={defaultChart} 
          color="var(--admin-primary)" 
          period="All Time"
        />
        <StatCard 
          icon={ShoppingBag} 
          label="Total Orders" 
          value={(stats?.totalOrders || 0).toLocaleString()} 
          change={0} 
          isPositive={true} 
          chartData={defaultChart} 
          color="var(--admin-purple)" 
          period="All Time"
        />
        <StatCard 
          icon={Package} 
          label="Total Products" 
          value={(stats?.totalProducts || 0).toLocaleString()} 
          change={0} 
          isPositive={true} 
          chartData={defaultChart} 
          color="var(--admin-warning)" 
          period="All Time"
        />
        <StatCard 
          icon={Users} 
          label="Total Users" 
          value={(stats?.totalUsers || 0).toLocaleString()} 
          change={0} 
          isPositive={true} 
          chartData={defaultChart} 
          color="var(--admin-info)" 
          period="All Time"
        />
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="dashboard-charts-grid">
        <RevenueChart data={revenueChart || []} />
        <PromotionalSalesChart />
      </div>

      {/* Tables & Lists Grid */}
      <div className="dashboard-tables-grid">
        <RecentOrdersTable orders={recentOrders || []} />
        <TopSaleList sales={topSales || []} />
      </div>

      {/* Location Map View */}
      <div className="dashboard-map-block">
        <UserLocationMap />
      </div>
    </div>
  );
};

export default DashboardOverview;
