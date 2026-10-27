import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, starString } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = (e) => {
    // If the click originated from an action button, do not navigate
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <article className="product-card" onClick={handleCardClick}>
      <div className="product-media">
        {product.oldPrice && <span className="discount-tag">SALE</span>}

        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title="Wishlist"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>

        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{starString(product.rating)}</span> {product.rating}
        </div>
        <div className="product-price-row">
          <div className="product-price">
            <span className="price-now">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="price-old">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {onQuickView && (
              <button
                className="add-cart-btn"
                style={{ background: 'var(--bg-soft)', color: 'var(--navy-900)', border: '1px solid var(--border)' }}
                onClick={handleQuickView}
                aria-label="Quick preview"
                title="Quick View"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            )}
            <button
              className={`add-cart-btn ${justAdded ? 'just-added' : ''}`}
              onClick={handleAddToCart}
              aria-label="Add to cart"
              title="Add to Cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
