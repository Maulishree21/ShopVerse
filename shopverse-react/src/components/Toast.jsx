import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span className="toast-text">{toast.message}</span>
    </div>
  );
}
