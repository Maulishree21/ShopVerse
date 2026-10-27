import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    subtotal,
    shippingFee,
    shippingThreshold,
    remainingForFreeShipping,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SHOP10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage('Promo code applied! 10% discount applied.');
    } else if (code === 'SAVE20') {
      setDiscountPercent(20);
      setPromoMessage('Promo code applied! 20% discount applied.');
    } else {
      setPromoMessage('Invalid coupon code. Try "SHOP10" or "SAVE20".');
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, grandTotal - discountAmount);

  const handleSimulatedCheckout = () => {
    setCheckoutModalOpen(true);
  };

  if (cartItems.length === 0 && !checkoutModalOpen) {
    return (
      <div className="cart-section">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="btn btn-primary">
              Discover Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <div className="container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <p>
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>

        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-wrapper">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-thumb"
                />

                <div className="cart-item-info">
                  <div className="cart-item-category">{item.category}</div>
                  <h3>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="cart-item-unit-price">
                    Unit price: {formatPrice(item.price)}
                  </div>
                </div>

                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">{formatPrice(item.lineTotal)}</div>

                <button
                  className="cart-item-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            ))}

            <div className="cart-clear-bar">
              <Link to="/" className="text-link">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-link" style={{ color: 'var(--danger)' }}>
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="cart-summary-box">
            <h3>Order Summary</h3>

            {/* Free shipping progress indicator */}
            <div className="shipping-progress">
              {remainingForFreeShipping > 0 ? (
                <>
                  Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more to unlock <strong>Free Shipping</strong>!
                  <div className="shipping-bar-track">
                    <div
                      className="shipping-bar-fill"
                      style={{
                        width: `${Math.min(100, Math.round((subtotal / shippingThreshold) * 100))}%`
                      }}
                    />
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--success)', fontWeight: 600 }}>
                  ✓ Congratulations! You unlocked FREE shipping!
                </div>
              )}
            </div>

            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Standard Shipping</span>
              <span>{shippingFee === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : formatPrice(shippingFee)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row savings">
                <span>Discount ({discountPercent}%)</span>
                <span>−{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} style={{ margin: '16px 0' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Promo code (e.g. SHOP10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border)',
                    fontSize: '13px'
                  }}
                />
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              </div>
              {promoMessage && (
                <div
                  style={{
                    fontSize: '12px',
                    marginTop: '6px',
                    color: discountAmount > 0 ? 'var(--success)' : 'var(--danger)'
                  }}
                >
                  {promoMessage}
                </div>
              )}
            </form>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleSimulatedCheckout}
            >
              Proceed to Checkout
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--ink-muted)' }}>
              🔒 256-bit SSL encrypted & secure checkout
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="modal-overlay show" style={{ zIndex: 1200 }}>
          <div className="checkout-modal">
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#E4F7EE',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '32px', height: '32px' }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p style={{ color: 'var(--ink-muted)', margin: '10px 0 20px', fontSize: '14.5px' }}>
              Thank you for shopping with SHOPVERSE. Your demo order <strong>#SV-{Math.floor(100000 + Math.random() * 900000)}</strong> has been confirmed.
            </p>
            <div
              style={{
                background: 'var(--bg-soft)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                fontSize: '14px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Items:</span>
                <strong>{cartCount} items</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Paid Total:</span>
                <strong>{formatPrice(finalTotal)}</strong>
              </div>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                clearCart();
                setCheckoutModalOpen(false);
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
