import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function HomePage({ searchTerm = '', onSearchChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync category or search query from URL params if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && ['Fashion', 'Electronics', 'Home & Living', 'Beauty'].includes(cat)) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('q');
    if (q && onSearchChange) {
      onSearchChange(q);
    }
  }, [searchParams, onSearchChange]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params, { replace: true });

    const el = document.getElementById('newArrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured / default order
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, sortOption]);

  const categoryList = ['All', 'Fashion', 'Electronics', 'Home & Living', 'Beauty'];

  return (
    <main>
      <Hero />
      <Benefits />

      {/* Popular Categories */}
      <section className="section" id="categories">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Popular Categories</h2>
              <p>Explore what fits your style.</p>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => handleCategorySelect(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCategorySelect(cat.name);
                }}
              >
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <span className="category-explore">
                    Explore{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog & Filter Bar */}
      <section className="section section-bg" id="newArrivals">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>New Arrivals just for you</h2>
              <p>Discover the latest styles and top picks.</p>
            </div>
          </div>

          <div className="catalog-toolbar">
            <div className="filter-bar">
              {categoryList.map((cat) => (
                <button
                  key={cat}
                  className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="catalog-controls">
              <div className="catalog-search-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  aria-label="Filter products"
                />
                {searchTerm && (
                  <button
                    className="catalog-search-clear"
                    onClick={() => onSearchChange && onSearchChange('')}
                    title="Clear filter"
                    aria-label="Clear filter"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="sort-wrap">
                <label htmlFor="sortSelect" className="sort-label">
                  Sort:
                </label>
                <select
                  id="sortSelect"
                  className="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Sort products by"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-az">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="results-count">
            Showing <strong>{filteredAndSortedProducts.length}</strong> {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            {searchTerm.trim() && <span> matching "<strong>{searchTerm}</strong>"</span>}
          </div>

          <ProductList
            products={filteredAndSortedProducts}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onReset={() => {
              setSelectedCategory('All');
              if (onSearchChange) onSearchChange('');
            }}
          />
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
}
