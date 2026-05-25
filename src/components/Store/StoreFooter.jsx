import React from 'react';
import './StoreStyles.css';

const StoreFooter = () => {
  return (
    <footer className="store-footer-wrapper">
      <div className="store-footer">
        {/* Footer Top Grid */}
        <div className="store-footer-grid">
          {/* Info Block */}
          <div className="store-footer-info">
            <a className="store-nav-brand" style={{ cursor: 'default' }}>
              <div className="store-brand-dot"></div>
              <span className="store-brand-text">EcoVibe</span>
            </a>
            <p className="store-footer-desc">
              We design and curate premium modern gadgets and home electronics designed to blend beautifully with your contemporary lifestyle.
            </p>
            <div className="store-footer-socials">
              <a className="store-social-btn" title="Facebook">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a className="store-social-btn" title="Twitter">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a className="store-social-btn" title="Instagram">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a className="store-social-btn" title="LinkedIn">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="store-footer-col">
            <h4 className="store-footer-col-title">Shop Collection</h4>
            <ul className="store-footer-links">
              <li className="store-footer-link-item"><a href="#headphones">Wireless Headphones</a></li>
              <li className="store-footer-link-item"><a href="#smartwatches">AMOLED Smartwatches</a></li>
              <li className="store-footer-link-item"><a href="#cameras">4K Mirrorless Cameras</a></li>
              <li className="store-footer-link-item"><a href="#speakers">Acoustic Speakers</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="store-footer-col">
            <h4 className="store-footer-col-title">Client Support</h4>
            <ul className="store-footer-links">
              <li className="store-footer-link-item"><a href="#help">Help & FAQs</a></li>
              <li className="store-footer-link-item"><a href="#shipping">Track Your Order</a></li>
              <li className="store-footer-link-item"><a href="#returns">Returns & Exchange</a></li>
              <li className="store-footer-link-item"><a href="#warranty">Premium Warranty</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div className="store-footer-col">
            <h4 className="store-footer-col-title">Our Company</h4>
            <ul className="store-footer-links">
              <li className="store-footer-link-item"><a href="#story">Our Design Story</a></li>
              <li className="store-footer-link-item"><a href="#careers">Join Our Team</a></li>
              <li className="store-footer-link-item"><a href="#sustainability">Eco-Initiatives</a></li>
              <li className="store-footer-link-item"><a href="#press">Press Coverage</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="store-footer-bottom">
          <span className="store-footer-copy">
            &copy; {new Date().getFullYear()} EcoVibe Inc. Designed and engineered for ultimate modern styling.
          </span>
          <div className="store-footer-payment">
            <span className="store-payment-badge">Visa</span>
            <span className="store-payment-badge">Mastercard</span>
            <span className="store-payment-badge">Apple Pay</span>
            <span className="store-payment-badge">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
