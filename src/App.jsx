import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Collections from './pages/Collections';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="app-wrapper">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Site Sticky Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 3. Main Route Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Drawers, Modals & Floating Elements */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ScrollToTop />
      <Toast />
    </div>
  );
}

