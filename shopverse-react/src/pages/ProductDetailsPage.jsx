import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, formatPrice, starString } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductList from '../components/ProductList';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--ink-muted)', margin: '16px 0 24px' }}>
          The item you are looking for does not exist or has been discontinued.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  return (
    <div className="product-detail-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/?category=${encodeURIComponent(product.category)}#newArrivals`}>
            {product.category}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span>{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="detail-grid">
          <div className="detail-media-card">
            {product.oldPrice && <span className="discount-tag">SALE</span>}
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <div className="detail-top-meta">
              <span className="product-cat">{product.category}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success)' }}>
                ● In Stock
              </span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">{starString(product.rating)}</span>
              <strong>{product.rating}</strong>
              <span>({product.reviewsCount || 48} verified customer reviews)</span>
            </div>

            <div className="detail-price-box">
              <span className="detail-price-current">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="detail-price-old">{formatPrice(product.oldPrice)}</span>
                  <span className="detail-save-badge">Save {formatPrice(savings)}</span>
                </>
              )}
            </div>

            <p className="detail-desc">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <div className="detail-features">
                <h4>Key Features</h4>
                <ul>
                  {product.features.map((feat, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-action-panel">
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className={`btn btn-primary ${justAdded ? 'just-added' : ''}`}
                onClick={handleAddToCart}
              >
                {justAdded ? 'Added to Cart!' : `Add ${quantity} to Cart • ${formatPrice(product.price * quantity)}`}
              </button>

              <button
                className={`modal-wishlist ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                title="Wishlist"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section" style={{ marginTop: '48px', paddingBottom: 0 }}>
            <div className="section-head">
              <div>
                <h2>You may also like</h2>
                <p>More top rated items in {product.category}.</p>
              </div>
            </div>
            <ProductList products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
