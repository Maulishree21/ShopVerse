import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import ProductList from '../components/ProductList';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="section section-bg" style={{ minHeight: '80vh', padding: '48px 0 80px' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <h2>My Wishlist</h2>
            <p>
              {wishlistedProducts.length === 0
                ? 'Your wishlist is currently empty.'
                : `You have ${wishlistedProducts.length} saved ${wishlistedProducts.length === 1 ? 'item' : 'items'}.`}
            </p>
          </div>
          {wishlistedProducts.length > 0 && (
            <Link to="/" className="btn btn-outline btn-sm">
              Continue Shopping
            </Link>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="cart-empty" style={{ margin: '40px auto' }}>
            <div
              className="cart-empty-icon"
              style={{ background: '#FDECEE', color: 'var(--danger)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <h2>No saved items yet</h2>
            <p>
              Click the heart icon on any product to save it to your wishlist for later.
            </p>
            <Link to="/" className="btn btn-primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <ProductList products={wishlistedProducts} />
        )}
      </div>
    </div>
  );
}
