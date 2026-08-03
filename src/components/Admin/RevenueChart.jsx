import React from 'react';
import { 
  Bar, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line,
  ComposedChart,
  Cell
} from 'recharts';
import './AdminStyles.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <div className="tooltip-items">
          <div className="tooltip-item">
            <span className="dot" style={{ backgroundColor: 'var(--admin-primary)' }}></span>
            <span className="label">Revenue:</span>
            <span className="value">${payload[0]?.value?.toLocaleString() || 0}</span>
          </div>
          <div className="tooltip-item">
            <span className="dot" style={{ backgroundColor: 'var(--admin-purple)' }}></span>
            <span className="label">Orders:</span>
            <span className="value">{payload[1]?.value?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data = [] }) => {
  const chartData = data.length > 0 ? data : [{ name: 'No Data', revenue: 0, orders: 0 }];
  const totalRevenue = chartData.reduce((sum, d) => sum + (d.revenue || 0), 0);
  const totalOrders = chartData.reduce((sum, d) => sum + (d.orders || 0), 0);

  return (
    <div className="chart-card revenue-card">
      <div className="chart-header">
        <h3 className="chart-title">Revenue</h3>
      </div>
      
      <div className="revenue-stats">
        <div className="rev-stat-item">
          <div className="rev-stat-info">
            <span className="dot" style={{ backgroundColor: 'var(--admin-primary)' }}></span>
            <span className="label">Revenue</span>
          </div>
          <div className="rev-stat-values">
            <span className="value">${totalRevenue.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="rev-stat-item">
          <div className="rev-stat-info">
            <span className="dot" style={{ backgroundColor: 'var(--admin-purple)' }}></span>
            <span className="label">Orders</span>
          </div>
          <div className="rev-stat-values">
            <span className="value">{totalOrders.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container-inner">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--admin-text-muted)', fontSize: 12 }} 
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="var(--admin-primary)" 
              radius={[4, 4, 0, 0]} 
              barSize={12}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--admin-primary)' : 'rgba(255, 107, 0, 0.6)'} />
              ))}
            </Bar>
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="var(--admin-purple)" 
              strokeWidth={3} 
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
