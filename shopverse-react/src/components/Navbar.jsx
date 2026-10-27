import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ searchTerm = '', onSearchChange }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInput = (e) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      navigate(`/?q=${encodeURIComponent(val)}#newArrivals`);
    }
  };

  const handleNavScroll = (anchorId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${anchorId}`);
    } else {
      const el = document.querySelector(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          SHOP<span>VERSE</span>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <a href="#newArrivals" onClick={(e) => { e.preventDefault(); handleNavScroll('#newArrivals'); }}>
            Shop
          </a>
          <a href="#categories" onClick={(e) => { e.preventDefault(); handleNavScroll('#categories'); }}>
            Categories
          </a>
          <a href="#newArrivals" onClick={(e) => { e.preventDefault(); handleNavScroll('#newArrivals'); }}>
            New Arrivals
          </a>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); handleNavScroll('#benefits'); }}>
            Offers
          </a>
        </nav>

        <div className="nav-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            id="searchInput"
            placeholder="Search products, categories..."
            value={searchTerm}
            onChange={handleSearchInput}
          />
        </div>

        <div className="nav-actions">
          <Link to="/login" className="nav-icon-btn" title="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="nav-icon-label">Account</span>
          </Link>

          <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist" title="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            <span className="nav-icon-label">Wishlist</span>
            {wishlistCount > 0 && <span className="badge" id="wishlistBadge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-icon-btn" aria-label="Cart" title="Shopping Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <span className="nav-icon-label">Cart</span>
            {cartCount > 0 && <span className="badge" id="cartBadge">{cartCount}</span>}
          </Link>

          <button
            className="mobile-toggle"
            id="mobileToggle"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
