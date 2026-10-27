import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, starString } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="modal-overlay show"
      id="productModal"
      onClick={(e) => {
        if (e.target.id === 'productModal') onClose();
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-body">
          <div className="product-cat">{product.category}</div>
          <h3>{product.name}</h3>
          <div className="product-rating">
            <span className="stars">{starString(product.rating)}</span> {product.rating} rating
            {product.reviewsCount && ` (${product.reviewsCount} reviews)`}
          </div>
          <p className="modal-desc">{product.description}</p>
          <div className="modal-price">{formatPrice(product.price)}</div>

          <div className="modal-actions" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToCart(product.id, 1);
              }}
            >
              Add to Cart
            </button>
            <button
              className={`modal-wishlist ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline btn-block"
              style={{ marginTop: '8px' }}
              onClick={onClose}
            >
              View Full Product Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
