import React from 'react';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './AdminStyles.css';

const StatCard = ({ icon: Icon, label, value, change, isPositive, chartData, color, period }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15` }}>
          <Icon size={24} color={color} />
        </div>
        <div className="stat-info">
          <span className="stat-label">{label}</span>
          <div className="stat-trend">
            {isPositive ? <TrendingUp size={14} color="var(--admin-success)" /> : <TrendingDown size={14} color="var(--admin-danger)" />}
            <span style={{ color: isPositive ? 'var(--admin-success)' : 'var(--admin-danger)' }}>{change}%</span>
          </div>
        </div>
        <div className="stat-period">
          <span>{period}</span>
          <ChevronDown size={14} />
        </div>
      </div>
      
      <div className="stat-body">
        <h2 className="stat-value">{value}</h2>
        <div className="stat-chart-container">
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
