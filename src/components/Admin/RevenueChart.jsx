import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  ComposedChart,
  Cell
} from 'recharts';
import { ChevronDown, TrendingUp } from 'lucide-react';
import './AdminStyles.css';

const data = [
  { name: 'Jan', revenue: 4000, orders: 2400 },
  { name: 'Feb', revenue: 3000, orders: 1398 },
  { name: 'Mar', revenue: 2000, orders: 9800 },
  { name: 'Apr', revenue: 2780, orders: 3908 },
  { name: 'May', revenue: 1890, orders: 4800 },
  { name: 'Jun', revenue: 2390, orders: 3800 },
  { name: 'Jul', revenue: 3490, orders: 4300 },
  { name: 'Aug', revenue: 2000, orders: 2400 },
  { name: 'Sep', revenue: 2780, orders: 3908 },
  { name: 'Oct', revenue: 1890, orders: 4800 },
  { name: 'Nov', revenue: 2390, orders: 3800 },
  { name: 'Dec', revenue: 3490, orders: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}, 2023</p>
        <div className="tooltip-items">
          <div className="tooltip-item">
            <span className="dot" style={{ backgroundColor: 'var(--admin-primary)' }}></span>
            <span className="label">Revenue:</span>
            <span className="value">${payload[0].value.toLocaleString()}</span>
          </div>
          <div className="tooltip-item">
            <span className="dot" style={{ backgroundColor: 'var(--admin-purple)' }}></span>
            <span className="label">Orders:</span>
            <span className="value">{payload[1].value.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="chart-card revenue-card">
      <div className="chart-header">
        <h3 className="chart-title">Revenue</h3>
        <div className="chart-actions">
          <div className="period-selector">
            <span>Yearly</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
      
      <div className="revenue-stats">
        <div className="rev-stat-item">
          <div className="rev-stat-info">
            <span className="dot" style={{ backgroundColor: 'var(--admin-primary)' }}></span>
            <span className="label">Revenue</span>
          </div>
          <div className="rev-stat-values">
            <span className="value">$37,802</span>
            <div className="trend">
              <TrendingUp size={12} color="var(--admin-success)" />
              <span className="pct">0.56%</span>
            </div>
          </div>
        </div>
        
        <div className="rev-stat-item">
          <div className="rev-stat-info">
            <span className="dot" style={{ backgroundColor: 'var(--admin-purple)' }}></span>
            <span className="label">Order</span>
          </div>
          <div className="rev-stat-values">
            <span className="value">$28,305</span>
            <div className="trend">
              <TrendingUp size={12} color="var(--admin-success)" />
              <span className="pct">0.56%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container-inner">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 5 ? 'var(--admin-primary)' : 'rgba(255, 107, 0, 0.6)'} />
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
