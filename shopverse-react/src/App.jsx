import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Do not render standard Navbar/Footer on Auth pages to preserve original split-screen layout
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app-root">
      {!isAuthPage && (
        <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isAuthPage && <Footer />}
      <Toast />
    </div>
  );
}
