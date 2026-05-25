import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { ChevronDown, TrendingUp } from 'lucide-react';
import './AdminStyles.css';

const data = [
  { name: 'Social Media', value: 3432, color: 'var(--admin-primary)' },
  { name: 'Website', value: 2500, color: 'var(--admin-info)' },
  { name: 'Store', value: 1870, color: 'var(--admin-warning)' },
];

const PromotionalSalesChart = () => {
  return (
    <div className="chart-card promo-card">
      <div className="chart-header">
        <h3 className="chart-title">Promotional Sales</h3>
        <div className="chart-actions">
          <div className="period-selector">
            <span>Weekly</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
      
      <div className="promo-info">
        <span className="promo-label">Visitors</span>
        <div className="promo-stats">
          <h2 className="promo-value">7,802</h2>
          <div className="trend">
            <TrendingUp size={14} color="var(--admin-success)" />
            <span className="pct">0.56%</span>
          </div>
        </div>
      </div>
      
      <div className="donut-container">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <TrendingUp size={24} color="var(--admin-primary)" />
          <span className="center-label">Social Media</span>
          <span className="center-value">3,432 <small>5.6%</small></span>
        </div>
      </div>
      
      <div className="promo-legend">
        {data.map((item) => (
          <div className="legend-item" key={item.name}>
            <span className="dot" style={{ backgroundColor: item.color }}></span>
            <span className="label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalSalesChart;
