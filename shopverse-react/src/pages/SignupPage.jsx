import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password && confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulated account creation
    try {
      localStorage.setItem(
        'shopverse_user',
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          createdAt: new Date().toISOString()
        })
      );
    } catch (e) {
      console.error(e);
    }

    setIsSuccess(true);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-media">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop"
          alt="Premium fashion and lifestyle products"
        />
        <div className="auth-media-overlay">
          <Link to="/" className="logo">
            SHOP<span>VERSE</span>
          </Link>
          <div className="auth-quote">
            <h2>Join a store built around your style.</h2>
            <p>
              Create an account to save products, build your wishlist and check
              out faster next time.
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

          {!isSuccess ? (
            <div id="signupFormWrap">
              <h1>Create your account</h1>
              <p className="sub">Join SHOPVERSE and start shopping.</p>

              <form id="signupForm" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="signupName">Full Name</label>
                  <input
                    type="text"
                    id="signupName"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && (
                    <div className="field-error show" id="signupNameError">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="signupEmail">Email</label>
                  <input
                    type="email"
                    id="signupEmail"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <div className="field-error show" id="signupEmailError">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    type="password"
                    id="signupPassword"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && (
                    <div className="field-error show" id="signupPasswordError">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="signupConfirm">Confirm Password</label>
                  <input
                    type="password"
                    id="signupConfirm"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && (
                    <div className="field-error show" id="signupConfirmError">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Create Account
                </button>
              </form>

              <p className="auth-footer-line">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          ) : (
            <div className="auth-success show" id="signupSuccess">
              <div className="check-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2>Account created</h2>
              <p>Welcome to SHOPVERSE — your account is ready to go.</p>
              <Link to="/" className="btn btn-primary btn-block">
                Continue to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
