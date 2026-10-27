import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useCart();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulated login session
    try {
      localStorage.setItem(
        'shopverse_session',
        JSON.stringify({
          email: email.trim(),
          rememberMe,
          loggedInAt: new Date().toISOString()
        })
      );
    } catch (e) {
      console.error(e);
    }

    showToast('Signed in successfully');
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-media">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=1200&fit=crop"
          alt="Premium fashion and lifestyle products"
        />
        <div className="auth-media-overlay">
          <Link to="/" className="logo">
            SHOP<span>VERSE</span>
          </Link>
          <div className="auth-quote">
            <h2>Premium products. Seamless experience.</h2>
            <p>
              Sign in to pick up your cart, track your wishlist and keep
              shopping where you left off.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <Link to="/" className="back-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to shop
          </Link>
          <h1>Welcome back</h1>
          <p className="sub">Sign in to continue shopping.</p>

          <form id="loginForm" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <div className="field-error show" id="loginEmailError">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <div className="field-error show" id="loginPasswordError">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-row-between">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to demo email'); }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <p className="auth-footer-line">
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
