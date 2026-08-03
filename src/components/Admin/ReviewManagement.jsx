import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Star, ThumbsUp, ThumbsDown, Trash2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { fetchReviews, approveReview, declineReview, deleteReview } from '../../redux/slices/reviewSlice';
import './AdminStyles.css';

const ReviewManagement = () => {
  const dispatch = useDispatch();
  const { items: reviews, loading } = useSelector((state) => state.review);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleApprove = (id) => {
    if (window.confirm('Are you sure you want to approve this review?')) {
      dispatch(approveReview(id));
    }
  };

  const handleDecline = (id) => {
    if (window.confirm('Are you sure you want to decline this review?')) {
      dispatch(declineReview(id));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review permanently?')) {
      dispatch(deleteReview(id));
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && review.status === filterStatus;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i <= rating ? 'currentColor' : 'none'} 
          style={{ marginRight: '1px', color: i <= rating ? '#f59e0b' : '#d1d5db' }}
        />
      );
    }
    return stars;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="status-badge approved"><CheckCircle size={14} /> Approved</span>;
      case 'declined':
        return <span className="status-badge declined"><XCircle size={14} /> Declined</span>;
      default:
        return <span className="status-badge pending"><AlertCircle size={14} /> Pending</span>;
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const declinedCount = reviews.filter(r => r.status === 'declined').length;

  return (
    <div className="review-management">
      <div className="management-header">
        <h2 className="section-title">Review Management</h2>
      </div>

      {/* Stats cards */}
      <div className="admin-stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card" style={{ cursor: 'pointer', border: filterStatus === 'pending' ? '2px solid #f59e0b' : '' }} onClick={() => setFilterStatus('pending')}>
          <div className="stat-info">
            <span className="stat-label">Pending Reviews</span>
            <h3 className="stat-value" style={{ color: '#f59e0b' }}>{pendingCount}</h3>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer', border: filterStatus === 'approved' ? '2px solid #10b981' : '' }} onClick={() => setFilterStatus('approved')}>
          <div className="stat-info">
            <span className="stat-label">Approved Reviews</span>
            <h3 className="stat-value" style={{ color: '#10b981' }}>{approvedCount}</h3>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer', border: filterStatus === 'declined' ? '2px solid #ef4444' : '' }} onClick={() => setFilterStatus('declined')}>
          <div className="stat-info">
            <span className="stat-label">Declined Reviews</span>
            <h3 className="stat-value" style={{ color: '#ef4444' }}>{declinedCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="top-filter-bar">
        <div className="filter-item search-item">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>All</button>
          <button className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`} onClick={() => setFilterStatus('pending')}>Pending</button>
          <button className={`filter-tab ${filterStatus === 'approved' ? 'active' : ''}`} onClick={() => setFilterStatus('approved')}>Approved</button>
          <button className={`filter-tab ${filterStatus === 'declined' ? 'active' : ''}`} onClick={() => setFilterStatus('declined')}>Declined</button>
        </div>
        <span className="order-count">{filteredReviews.length} reviews</span>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>No reviews found</h3>
          <p>{searchQuery ? 'Try a different search term.' : 'No reviews have been submitted yet.'}</p>
        </div>
      ) : (
        <div className="review-list">
          {filteredReviews.map((review) => (
            <div key={review._id} className={`review-card ${review.status}`}>
              <div className="review-card-header">
                <div className="review-user-info">
                  <div className="review-avatar">
                    {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="review-name">{review.name}</h4>
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="review-card-actions">
                  {getStatusBadge(review.status)}
                  <div className="review-stars-display">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              {review.product && (
                <p className="review-product">Product: <strong>{review.product?.name || review.product}</strong></p>
              )}
              <div className="review-card-footer">
                <div className="review-action-buttons">
                  {review.status !== 'approved' && (
                    <button className="review-action-btn approve" onClick={() => handleApprove(review._id)} title="Approve">
                      <ThumbsUp size={16} /> Approve
                    </button>
                  )}
                  {review.status !== 'declined' && (
                    <button className="review-action-btn decline" onClick={() => handleDecline(review._id)} title="Decline">
                      <ThumbsDown size={16} /> Decline
                    </button>
                  )}
                  <button className="review-action-btn delete" onClick={() => handleDelete(review._id)} title="Delete">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
