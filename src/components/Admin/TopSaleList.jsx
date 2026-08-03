import React from 'react';
import './AdminStyles.css';

const TopSaleList = ({ sales = [] }) => {
  return (
    <div className="chart-card topsale-card">
      <div className="chart-header">
        <h3 className="chart-title">Top sale</h3>
      </div>
      
      <div className="topsale-list">
        {sales.length === 0 ? (
          <div className="empty-state" style={{ padding: '20px', textAlign: 'center' }}>No sales data yet</div>
        ) : (
          sales.map((item) => (
            <div className="topsale-item" key={item.id}>
              {item.image ? (
                <img src={item.image} alt={item.name} className="item-image" />
              ) : (
                <div className="item-image" style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>No img</div>
              )}
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price?.toLocaleString() || 0}</span>
              </div>
              <div className="item-sales">
                <span className="sales-count">{item.sales}</span>
                <span className="sales-label">Sales</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopSaleList;
