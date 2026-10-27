import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = `/${anchorId}`;
    } else {
      const el = document.querySelector(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              SHOP<span>VERSE</span>
            </Link>
            <p className="footer-tag">Modern shopping. Seamless experience.</p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#newArrivals" onClick={(e) => handleAnchorClick(e, '#newArrivals')}>Shop</a></li>
              <li><a href="#categories" onClick={(e) => handleAnchorClick(e, '#categories')}>Categories</a></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer</h4>
            <ul>
              <li><Link to="/login">My Account</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:hello@shopverse.example">hello@shopverse.example</a></li>
              <li><span>Chitkara University</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SHOPVERSE. Frontend prototype for academic demonstration.</span>
          <span>Shop. Discover. Repeat.</span>
        </div>
      </div>
    </footer>
  );
}
