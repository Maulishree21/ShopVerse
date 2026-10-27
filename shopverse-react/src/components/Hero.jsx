import React from 'react';

export default function Hero() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">New Collection</span>
          <h1 className="hero-title">
            Discover style<br />
            that <em>fits you.</em>
          </h1>
          <p className="hero-sub">
            Premium products. Seamless experience. Curated fashion, electronics,
            home and beauty — all in one place.
          </p>
          <div className="hero-ctas">
            <a
              href="#newArrivals"
              className="btn btn-primary"
              onClick={(e) => scrollToSection(e, '#newArrivals')}
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="btn btn-outline"
              onClick={(e) => scrollToSection(e, '#categories')}
            >
              Explore Collection
            </a>
          </div>
        </div>
        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&h=750&fit=crop"
            alt="Premium handbag and white sneakers styled on a neutral background"
          />
          <div className="hero-float-card">
            <div className="dot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div>
              <strong>4,200+ orders</strong>
              <span>delivered this month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
