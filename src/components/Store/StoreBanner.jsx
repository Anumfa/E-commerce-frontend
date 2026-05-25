import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './StoreStyles.css';

const DEFAULT_SLIDES = [
  {
    _id: 'default-1',
    title: 'Next-Gen Sound Experience',
    description: 'Immerse yourself in acoustic perfection with our new active noise-cancelling headphones. Experience true sound depth and up to 40 hours of playback.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop',
    tag: 'Hot Release'
  },
  {
    _id: 'default-2',
    title: 'Minimalist & Smart Timepieces',
    description: 'Elevate your daily wear with sleek AMOLED smartwatches. Keep track of fitness, health vitals, and instant notifications on the go.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop',
    tag: 'New Arrival'
  },
  {
    _id: 'default-3',
    title: 'Capture Unseen Cinematic Stories',
    description: 'Create brilliant 4K digital masterpieces with mirrorless technology. Compact chassis, ultra-fast auto-focus, and dual image stabilization.',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&fit=crop',
    tag: 'Limited Edition'
  }
];

const StoreBanner = () => {
  const { items: apiBanners, loading } = useSelector((state) => state.banner);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Determine active slides list
  const slides = apiBanners && apiBanners.length > 0 
    ? apiBanners.map((b, index) => ({
        _id: b._id || `banner-${index}`,
        title: b.title || 'Premium Collection',
        description: b.description || 'Discover handpicked design excellence across our catalog.',
        imageUrl: b.imageUrl,
        tag: index === 0 ? 'Featured' : 'Special Offer'
      }))
    : DEFAULT_SLIDES;

  // Auto scroll effect
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (loading && (!apiBanners || apiBanners.length === 0)) {
    return (
      <div className="store-banner-container">
        <div className="store-banner-slider" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--store-text-muted)', fontWeight: 500 }}>Loading beautiful showcases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="store-banner-container">
      <div className="store-banner-slider">
        {/* Banner Slides */}
        {slides.map((slide, index) => (
          <div 
            key={slide._id} 
            className={`store-banner-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* Left Content Column */}
            <div className="store-banner-content">
              <span className="store-banner-tag">{slide.tag}</span>
              <h1 className="store-banner-title">{slide.title}</h1>
              <p className="store-banner-desc">{slide.description}</p>
              
              <div className="store-banner-actions">
                <button className="store-banner-btn-primary">
                  <span>Shop Collection</span>
                </button>
                <button className="store-banner-btn-secondary">
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Product Image Column */}
            <div className="store-banner-image-container">
              <img 
                src={slide.imageUrl} 
                alt={slide.title} 
                className="store-banner-img" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop';
                }}
              />
            </div>
          </div>
        ))}

        {/* Arrow Navigation */}
        {slides.length > 1 && (
          <>
            <button className="store-banner-arrow store-banner-arrow-left" onClick={handlePrev}>
              <ChevronLeft size={22} />
            </button>
            <button className="store-banner-arrow store-banner-arrow-right" onClick={handleNext}>
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Bottom Dot Indicators */}
        {slides.length > 1 && (
          <div className="store-banner-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`store-banner-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreBanner;
