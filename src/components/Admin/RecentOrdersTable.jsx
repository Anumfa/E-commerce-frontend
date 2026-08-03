import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AdminStyles.css';

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

const RecentOrdersTable = ({ orders = [] }) => {
  return (
    <div className="chart-card orders-card">
      <div className="chart-header">
        <h3 className="chart-title">Recent orders</h3>
      </div>
      
      <div className="table-container">
        {orders.length === 0 ? (
          <div className="empty-state">No orders yet</div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index}>
                  <td>
                    <div className="table-product">
                      {order.image && <img src={order.image} alt={order.product} className="table-product-image" />}
                      <span>{order.product}</span>
                    </div>
                  </td>
                  <td>{order.customer}</td>
                  <td>{typeof order.productId === 'string' ? order.productId.substring(0, 8) : 'N/A'}</td>
                  <td>X{order.quantity}</td>
                  <td>${order.price}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="table-footer">
        <span className="showing-text">Showing {orders.length} orders</span>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
