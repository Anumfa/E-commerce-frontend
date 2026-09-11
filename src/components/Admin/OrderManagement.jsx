import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronDown, ChevronUp, Package, MapPin, CreditCard, Phone, Mail, User, Truck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import axios from 'axios';
import './AdminStyles.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';

const statusConfig = {
  'Pending': { color: '#f59e0b', label: 'Pending', next: 'Processing' },
  'Processing': { color: '#3b82f6', label: 'Processing', next: 'Shipped' },
  'Shipped': { color: '#8b5cf6', label: 'Shipped', next: 'Delivered' },
  'Delivered': { color: '#10b981', label: 'Delivered', next: null },
  'Cancelled': { color: '#ef4444', label: 'Cancelled', next: null },
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/order/all`);
      setOrders(res.data.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/api/order/status/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Error updating order status');
    }
  };

  const paymentCounts = {
    all: orders.length,
    Failed: orders.filter(o => o.paymentStatus === 'Failed').length,
    Completed: orders.filter(o => o.paymentStatus === 'Completed').length,
    Pending: orders.filter(o => o.paymentStatus === 'Pending').length,
  };

  const filteredOrders = orders.filter(order => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      order.customerInfo?.name?.toLowerCase().includes(q) ||
      order._id?.toLowerCase().includes(q) ||
      order.customerInfo?.email?.toLowerCase().includes(q);

    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="order-management">
      <div className="management-header">
        <h2 className="section-title">Order Management</h2>
      </div>

      <div className="top-filter-bar">
        <div className="filter-item search-item">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name, email or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="order-count">{filteredOrders.length} orders</span>
      </div>

      {/* Payment status filters - failed transactions get their own view */}
      <div className="payment-filter-tabs">
        <button
          className={`payment-filter-tab ${paymentFilter === 'all' ? 'active' : ''}`}
          onClick={() => setPaymentFilter('all')}
        >
          All Orders <span className="payment-filter-count">{paymentCounts.all}</span>
        </button>
        <button
          className={`payment-filter-tab failed ${paymentFilter === 'Failed' ? 'active' : ''}`}
          onClick={() => setPaymentFilter('Failed')}
        >
          <AlertTriangle size={14} /> Payment Failed <span className="payment-filter-count">{paymentCounts.Failed}</span>
        </button>
        <button
          className={`payment-filter-tab completed ${paymentFilter === 'Completed' ? 'active' : ''}`}
          onClick={() => setPaymentFilter('Completed')}
        >
          <CheckCircle2 size={14} /> Paid <span className="payment-filter-count">{paymentCounts.Completed}</span>
        </button>
        <button
          className={`payment-filter-tab pending ${paymentFilter === 'Pending' ? 'active' : ''}`}
          onClick={() => setPaymentFilter('Pending')}
        >
          <Clock size={14} /> Unpaid / COD <span className="payment-filter-count">{paymentCounts.Pending}</span>
        </button>
      </div>

      {paymentFilter === 'all' && paymentCounts.Failed > 0 && (
        <div className="payment-failed-banner" onClick={() => setPaymentFilter('Failed')}>
          <AlertTriangle size={16} />
          <span>
            {paymentCounts.Failed} failed card payment{paymentCounts.Failed === 1 ? '' : 's'} need attention.
            Click to view them.
          </span>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--admin-text-muted)' }}>
          <Package size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="order-list">
          {filteredOrders.map(order => {
            const statusInfo = statusConfig[order.status] || statusConfig['Pending'];
            const isExpanded = expandedOrder === order._id;

            return (
              <div key={order._id} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                {/* Order Header */}
                <div className="order-card-header" onClick={() => toggleExpand(order._id)}>
                  <div className="order-header-left">
                    <span className="order-id">#{order._id?.substring(0, 8)}</span>
                    <span className="order-customer">{order.customerInfo?.name}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="order-header-right">
                    <span className="order-total">${order.totalPrice}</span>
                    {order.paymentStatus === 'Failed' && (
                      <span className="payment-failed-badge">
                        <AlertTriangle size={12} /> Payment Failed
                      </span>
                    )}
                    <span className="order-status-badge" style={{ backgroundColor: `${statusInfo.color}20`, color: statusInfo.color, border: `1px solid ${statusInfo.color}40` }}>
                      {statusInfo.label}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="order-card-body">
                    {order.paymentStatus === 'Failed' && (
                      <div className="order-payment-failed-note">
                        <AlertTriangle size={16} />
                        <span>
                          This card payment failed, so the order is not confirmed.
                          {order.failureReason ? ` Reason: ${order.failureReason}` : ''}
                        </span>
                      </div>
                    )}

                    {/* Status Action Buttons */}
                    <div className="order-tracking">
                      <span className="tracking-label">Update Status:</span>
                      <div className="tracking-buttons">
                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map(stage => {
                          const stageInfo = statusConfig[stage];
                          const isActive = order.status === stage;
                          const isPast = ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.status) >= ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(stage);
                          return (
                            <button
                              key={stage}
                              className={`tracking-btn ${isActive ? 'active' : ''} ${order.status === 'Delivered' ? 'completed' : ''}`}
                              style={{
                                borderColor: isActive || (isPast && order.status !== 'Cancelled') ? stageInfo.color : 'var(--admin-border)',
                                color: isActive ? '#fff' : (isPast && order.status !== 'Cancelled' ? stageInfo.color : 'var(--admin-text-muted)'),
                                backgroundColor: isActive ? stageInfo.color : 'transparent',
                                cursor: order.status === 'Delivered' || order.status === 'Cancelled' ? 'not-allowed' : 'pointer',
                                opacity: order.status === 'Cancelled' ? 0.5 : 1
                              }}
                              onClick={() => {
                                if (order.status !== 'Delivered' && order.status !== 'Cancelled') {
                                  handleStatusUpdate(order._id, stage);
                                }
                              }}
                              disabled={order.status === 'Delivered' || order.status === 'Cancelled'}
                            >
                              {stage === 'Shipped' ? <Truck size={14} /> : null}
                              {stage}
                            </button>
                          );
                        })}
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <button
                            className="tracking-btn cancel-btn"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this order?')) {
                                handleStatusUpdate(order._id, 'Cancelled');
                              }
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="order-details-grid">
                      {/* Customer Info */}
                      <div className="order-detail-section">
                        <h4><User size={16} /> Customer Information</h4>
                        <div className="order-detail-rows">
                          <div className="order-detail-row">
                            <span className="detail-label">Name</span>
                            <span className="detail-value">{order.customerInfo?.name}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label"><Mail size={14} /> Email</span>
                            <span className="detail-value">{order.customerInfo?.email}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label"><Phone size={14} /> Phone</span>
                            <span className="detail-value">{order.customerInfo?.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="order-detail-section">
                        <h4><MapPin size={16} /> Shipping Address</h4>
                        <div className="order-detail-rows">
                          <div className="order-detail-row">
                            <span className="detail-label">Address</span>
                            <span className="detail-value">{order.customerInfo?.address}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label">City</span>
                            <span className="detail-value">{order.customerInfo?.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="order-detail-section">
                        <h4><CreditCard size={16} /> Payment Details</h4>
                        <div className="order-detail-rows">
                          <div className="order-detail-row">
                            <span className="detail-label">Method</span>
                            <span className="detail-value">{order.paymentMethod}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label">Payment Status</span>
                            <span className={`detail-value payment-${order.paymentStatus?.toLowerCase()}`}>{order.paymentStatus}</span>
                          </div>
                          {order.transactionId && (
                            <div className="order-detail-row">
                              <span className="detail-label">Transaction ID</span>
                              <span className="detail-value" style={{ wordBreak: 'break-all', fontSize: '12px' }}>{order.transactionId}</span>
                            </div>
                          )}
                          {order.paymentStatus === 'Failed' && order.failureReason && (
                            <div className="order-detail-row">
                              <span className="detail-label">Failure Reason</span>
                              <span className="detail-value payment-failed">{order.failureReason}</span>
                            </div>
                          )}
                          <div className="order-detail-row">
                            <span className="detail-label">Order Placed</span>
                            <span className="detail-value">{new Date(order.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label">Subtotal</span>
                            <span className="detail-value">${order.subtotal}</span>
                          </div>
                          <div className="order-detail-row">
                            <span className="detail-label">Shipping</span>
                            <span className="detail-value">${order.shippingFee}</span>
                          </div>
                          <div className="order-detail-row total-row">
                            <span className="detail-label">Total</span>
                            <span className="detail-value">${order.totalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="order-detail-section order-items-section">
                        <h4><Package size={16} /> Order Items</h4>
                        <div className="order-items-table">
                          <div className="order-items-header">
                            <span>Product</span>
                            <span>Qty</span>
                            <span>Price</span>
                            <span>Total</span>
                          </div>
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <span className="item-name">{item.name}</span>
                              <span className="item-qty">x{item.quantity}</span>
                              <span className="item-price">${item.price}</span>
                              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        {order.orderItems?.map((item, idx) => (
                          item.selectedSize || item.selectedColor ? (
                            <div key={`opt-${idx}`} className="order-item-options">
                              {item.selectedSize && <span className="item-option">Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span className="item-option">Color: {item.selectedColor}</span>}
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
