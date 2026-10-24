import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountModalOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/shop', label: 'Cửa hàng' },
    { to: '/collections', label: 'Bộ sưu tập' },
    { to: '/about', label: 'Về chúng mình' }
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link to="/" className="brand-logo" aria-label="Trang chủ BOWIE">
              <div className="brand-logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 12c-2-3-6-4-8-2s-1 6 2 7 6-2 6-5z" fill="#F7C8D8" fillOpacity="0.7"/>
                  <path d="M12 12c2-3 6-4 8-2s1 6-2 7-6-2-6-5z" fill="#F7C8D8" fillOpacity="0.7"/>
                  <circle cx="12" cy="12" r="2.5" fill="#C84B68" stroke="#C84B68"/>
                  <path d="M10 14.5L7 21" stroke="#C84B68"/>
                  <path d="M14 14.5L17 21" stroke="#C84B68"/>
                </svg>
              </div>
              <div>
                <span className="brand-name">BOWIE</span>
                <span className="brand-tagline">Little Bows, Big Love</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions: Search, Wishlist, Account, Cart, Mobile Toggle */}
            <div className="header-actions">
              <button
                className="icon-btn"
                onClick={onOpenSearch}
                title="Tìm kiếm nơ & phụ kiện"
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>

              <Link
                to="/wishlist"
                className="icon-btn"
                title="Sản phẩm yêu thích"
                aria-label="Yêu thích"
              >
                <Heart size={20} />
                {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
              </Link>

              <div style={{ position: 'relative' }}>
                <button
                  className="icon-btn"
                  onClick={() => setIsAccountModalOpen(!isAccountModalOpen)}
                  title="Tài khoản của bạn"
                  aria-label="Tài khoản"
                >
                  <User size={20} />
                </button>

                {/* Account Popover */}
                {isAccountModalOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '48px',
                      right: 0,
                      width: '260px',
                      background: 'var(--white)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--border-pink)',
                      padding: '18px',
                      zIndex: 300,
                      animation: 'fadeIn 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'var(--pink-powder)',
                          color: 'var(--cherry-red)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700'
                        }}
                      >
                        BW
                      </div>
                      <div>
                        <strong style={{ fontSize: '14px', display: 'block' }}>Chào nàng thơ! 🎀</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Thành viên Bowie Club</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-brown)', lineHeight: '1.5', marginBottom: '14px', background: 'var(--pink-powder)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                      💌 Mã độc quyền: <strong>BOWIE10</strong> (-10% cho đơn đầu tiên)
                    </div>
                    <Link
                      to="/cart"
                      className="btn btn-secondary btn-sm btn-full"
                      onClick={() => setIsAccountModalOpen(false)}
                      style={{ marginBottom: '6px' }}
                    >
                      Đơn hàng của tôi
                    </Link>
                  </div>
                )}
              </div>

              <button
                className="icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="Giỏ hàng của bạn"
                aria-label="Giỏ hàng"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && <span className="icon-badge">{totalItems}</span>}
              </button>

              <button
                className="icon-btn mobile-toggle-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Mở menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🎀</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '20px', color: 'var(--cherry-red)' }}>
              BOWIE
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="icon-btn"
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
              <span style={{ color: 'var(--pink-dark)' }}>&rarr;</span>
            </NavLink>
          ))}
          <NavLink
            to="/wishlist"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Sản phẩm yêu thích ({wishlistCount})</span>
            <Heart size={16} color="var(--cherry-red)" />
          </NavLink>
        </nav>

        <div className="mobile-nav-footer">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
            “Một chiếc nơ nhỏ, ngàn điều đáng yêu” ✨
          </div>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="btn btn-primary btn-full"
          >
            <ShoppingBag size={18} /> Xem giỏ hàng ({totalItems})
          </button>
        </div>
      </div>
    </>
  );
}

