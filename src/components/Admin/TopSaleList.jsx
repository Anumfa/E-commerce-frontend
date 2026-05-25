import React from 'react';
import { ChevronDown } from 'lucide-react';
import './AdminStyles.css';

const topSales = [
  { id: 1, name: 'Neptune Longsleeve', price: 138, sales: 952, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop' },
  { id: 2, name: 'Ribbed Tank Top', price: 105, sales: 930, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
  { id: 3, name: 'Ribbed modal T-shirt', price: 125, sales: 902, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop' },
  { id: 4, name: 'Oversized Motif T-shirt', price: 95, sales: 882, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
  { id: 5, name: 'V-neck linen T-shirt', price: 158, sales: 869, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop' },
  { id: 6, name: 'Jersey thong body', price: 78, sales: 833, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop' },
];

const TopSaleList = () => {
  return (
    <div className="chart-card topsale-card">
      <div className="chart-header">
        <h3 className="chart-title">Top sale</h3>
        <div className="chart-actions">
          <div className="period-selector">
            <span>Weekly</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
      
      <div className="topsale-list">
        {topSales.map((item) => (
          <div className="topsale-item" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price}</span>
            </div>
            <div className="item-sales">
              <span className="sales-count">{item.sales}</span>
              <span className="sales-label">Sales</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSaleList;
