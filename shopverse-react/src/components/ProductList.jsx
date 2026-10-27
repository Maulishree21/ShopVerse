import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({
  products = [],
  onQuickView,
  emptyTitle = 'No products found',
  emptyMessage = 'Try adjusting your search query or selecting a different category filter.',
  onReset
}) {
  if (products.length === 0) {
    return (
      <div className="no-results">
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
        {onReset && (
          <button
            className="btn btn-outline btn-sm"
            style={{ marginTop: '14px' }}
            onClick={onReset}
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid" id="productGrid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
