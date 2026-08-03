import React from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';
import './StoreStyles.css';

const ReviewsSection = ({ reviews, onWriteReviewClick }) => {
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const renderStars = (ratingVal) => {
    const stars = [];
    const val = parseFloat(ratingVal);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={i <= val ? 16 : 14} 
          fill={i <= val ? 'currentColor' : 'none'} 
          style={{ marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="store-section-container">
      {/* Section Header */}
      <div className="store-section-header">
        <div className="store-section-title-area">
          <span className="store-section-subtitle">Testimonials</span>
          <h2 className="store-section-title">Customer Feedback</h2>
          <div className="store-section-line"></div>
        </div>
      </div>

      {/* Review Box Layout */}
      <div className="store-reviews-container">
        {/* Left Stats Column */}
        <div className="store-reviews-summary">
          <span className="store-avg-rating-big">{avgRating}</span>
          
          <div className="store-summary-stars">
            {renderStars(avgRating)}
          </div>
          
          <p className="store-summary-text">
            Based on {reviews.length} active review{reviews.length === 1 ? '' : 's'} from our shoppers.
          </p>

          <button 
            className="store-write-rev-btn"
            onClick={onWriteReviewClick}
          >
            <MessageSquarePlus size={18} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Right Reviews List Column */}
        <div className="store-reviews-list">
          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--store-text-muted)' }}>
              <p style={{ fontWeight: 500, fontSize: '15px' }}>No reviews yet.</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Be the very first shopper to share your experience!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <div key={review._id || index} className="store-review-card">
                <div className="store-review-header">
                  <div className="store-review-user-info">
                    {/* Circle Avatar with Name Initials */}
                    <div className="store-review-avatar">
                      {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="store-review-name">{review.name}</h4>
                      <span className="store-review-date">{review.date || (review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')}</span>
                    </div>
                  </div>

                  {/* Star Rating display */}
                  <div className="store-review-stars">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="store-review-content">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
