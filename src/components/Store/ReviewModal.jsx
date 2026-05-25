import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, AlertCircle } from 'lucide-react';
import './StoreStyles.css';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write some review feedback.');
      return;
    }

    setError('');
    onSubmit({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    });

    // Reset Form
    setName('');
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="store-modal-overlay">
          {/* Backdrop click closes modal */}
          <motion.div 
            className="store-modal-backdrop-trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
          />

          {/* Animated Modal Container */}
          <motion.div 
            className="store-modal-box"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Close Button */}
            <button className="store-modal-close" onClick={onClose} title="Close Modal">
              <X size={20} />
            </button>

            <h2 className="store-modal-title">Write a Review</h2>
            <p className="store-modal-subtitle">Share your honest shopping experience with our community!</p>

            <form onSubmit={handleSubmit} className="store-form">
              {/* Name Field */}
              <div className="store-form-group">
                <label className="store-form-label" htmlFor="rev-name">Your Name</label>
                <input 
                  type="text" 
                  id="rev-name" 
                  className="store-form-input"
                  placeholder="e.g. Watson Watson" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Rating Field */}
              <div className="store-form-group">
                <label className="store-form-label">Product Rating</label>
                <div className="store-star-rating-input">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <button
                      key={starNum}
                      type="button"
                      className={`store-star-rating-btn ${(hoverRating || rating) >= starNum ? 'active' : ''}`}
                      onClick={() => setRating(starNum)}
                      onMouseEnter={() => setHoverRating(starNum)}
                      onMouseLeave={() => setHoverRating(0)}
                      title={`Rate ${starNum} Stars`}
                    >
                      <Star size={28} fill={(hoverRating || rating) >= starNum ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Field */}
              <div className="store-form-group">
                <label className="store-form-label" htmlFor="rev-comment">Review Description</label>
                <textarea 
                  id="rev-comment" 
                  className="store-form-textarea"
                  placeholder="What did you like or dislike? How was the premium build quality?" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Validation Error Alert */}
              {error && (
                <div className="store-form-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="store-form-submit-btn">
                <span>Submit My Review</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
