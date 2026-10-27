import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="section section-bg" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '72px', fontWeight: 900, color: 'var(--blue-600)', margin: 0 }}>404</h1>
        <h2 style={{ fontSize: '26px', margin: '12px 0 16px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--ink-muted)', maxWidth: '440px', margin: '0 auto 28px' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to ShopVerse
        </Link>
      </div>
    </div>
  );
}
