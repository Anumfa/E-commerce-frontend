import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './AdminStyles.css';

const orders = [
  { id: 1452, product: 'Neptune Long-sleeve', customer: 'Leslie Alexander', quantity: 'X1', price: '$138', status: 'Paid', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=50&h=50&fit=crop' },
  { id: 1452, product: 'Corduroy slim-fit', customer: 'Leslie Alexander', quantity: 'X1', price: '$138', status: 'Pending', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop' },
  { id: 1452, product: 'Turtleneck knitted T-shirt', customer: 'Leslie Alexander', quantity: 'X1', price: '$138', status: 'Cancel', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=50&h=50&fit=crop' },
  { id: 1452, product: 'Wool oversized T-shirt', customer: 'Leslie Alexander', quantity: 'X1', price: '$138', status: 'Processing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop' },
  { id: 1452, product: 'Oversized poplin shirt', customer: 'Leslie Alexander', quantity: 'X1', price: '$138', status: 'Processing', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=50&h=50&fit=crop' },
];

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'cancel': return 'status-cancel';
      case 'processing': return 'status-processing';
      default: return '';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

const RecentOrdersTable = () => {
  return (
    <div className="chart-card orders-card">
      <div className="chart-header">
        <h3 className="chart-title">Recent orders</h3>
      </div>
      
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  <div className="table-product">
                    <img src={order.image} alt={order.product} className="table-product-image" />
                    <span>{order.product}</span>
                  </div>
                </td>
                <td>{order.customer}</td>
                <td>{order.id}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <span className="showing-text">Showing 1-5 of 15</span>
        <div className="pagination">
          <button className="page-btn"><ChevronLeft size={16} /></button>
          <button className="page-btn">1</button>
          <button className="page-btn active">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
