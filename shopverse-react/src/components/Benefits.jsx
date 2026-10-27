import React from 'react';

export default function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="container benefits-grid">
        <div className="benefit-item">
          <div className="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <path d="M16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="benefit-text">
            <strong>Free Shipping</strong>
            <span>On orders above ₹999</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="benefit-text">
            <strong>Secure Payments</strong>
            <span>100% secure checkout</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </div>
          <div className="benefit-text">
            <strong>Easy Returns</strong>
            <span>Hassle-free returns</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="benefit-text">
            <strong>24/7 Support</strong>
            <span>We're here to help</span>
          </div>
        </div>
      </div>
    </section>
  );
}
