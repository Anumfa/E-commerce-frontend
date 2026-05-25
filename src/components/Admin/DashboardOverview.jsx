import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Activity 
} from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import PromotionalSalesChart from './PromotionalSalesChart';
import RecentOrdersTable from './RecentOrdersTable';
import TopSaleList from './TopSaleList';
import UserLocationMap from './UserLocationMap';
import './AdminStyles.css';

// Mock chart data for stat cards
const salesChartData = [
  { value: 400 }, { value: 600 }, { value: 500 }, 
  { value: 700 }, { value: 900 }, { value: 800 }, { value: 1200 }
];
const ordersChartData = [
  { value: 100 }, { value: 140 }, { value: 120 }, 
  { value: 180 }, { value: 220 }, { value: 200 }, { value: 250 }
];
const usersChartData = [
  { value: 3000 }, { value: 3200 }, { value: 3500 }, 
  { value: 4000 }, { value: 4800 }, { value: 5200 }, { value: 7802 }
];
const conversionChartData = [
  { value: 2.1 }, { value: 2.3 }, { value: 2.2 }, 
  { value: 2.5 }, { value: 2.8 }, { value: 2.7 }, { value: 3.2 }
];

const DashboardOverview = () => {
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
          value="$37,802" 
          change={12.4} 
          isPositive={true} 
          chartData={salesChartData} 
          color="var(--admin-primary)" 
          period="This Month"
        />
        <StatCard 
          icon={ShoppingBag} 
          label="Total Orders" 
          value="2,835" 
          change={8.2} 
          isPositive={true} 
          chartData={ordersChartData} 
          color="var(--admin-purple)" 
          period="This Month"
        />
        <StatCard 
          icon={Users} 
          label="Active Visitors" 
          value="7,802" 
          change={5.6} 
          isPositive={true} 
          chartData={usersChartData} 
          color="var(--admin-info)" 
          period="Real-time"
        />
        <StatCard 
          icon={Activity} 
          label="Conversion Rate" 
          value="3.2%" 
          change={2.1} 
          isPositive={false} 
          chartData={conversionChartData} 
          color="var(--admin-success)" 
          period="This Week"
        />
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="dashboard-charts-grid">
        <RevenueChart />
        <PromotionalSalesChart />
      </div>

      {/* Tables & Lists Grid */}
      <div className="dashboard-tables-grid">
        <RecentOrdersTable />
        <TopSaleList />
      </div>

      {/* Location Map View */}
      <div className="dashboard-map-block">
        <UserLocationMap />
      </div>
    </div>
  );
};

export default DashboardOverview;
