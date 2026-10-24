import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    freeShipRemaining,
    freeShipProgress,
    isFreeShip,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Giỏ hàng">
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <span>🎀 Giỏ Hàng</span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="icon-btn"
            aria-label="Đóng giỏ hàng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-bar">
          <div className="free-shipping-text">
            {isFreeShip ? (
              <span>
                🎉 Chúc mừng bạn! Đơn hàng được <strong>FREESHIP</strong>
              </span>
            ) : (
              <span>
                Mua thêm <strong>{freeShipRemaining.toLocaleString('vi-VN')}₫</strong> để được Freeship
              </span>
            )}
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {freeShipProgress}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${freeShipProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <div className="empty-cart-icon">
              <ShoppingBag size={42} />
            </div>
            <h4>Giỏ hàng đang trống</h4>
            <p>Hãy chọn những chiếc nơ xinh xắn để tô điểm cho mái tóc của bạn nhé! ✨</p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('/shop');
              }}
              className="btn btn-primary"
            >
              Khám phá cửa hàng ngay
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <div>
                      <h4 className="cart-item-title">{item.product.name}</h4>
                      <span className="cart-item-color">
                        Màu: <strong>{item.selectedColor}</strong>
                      </span>
                    </div>

                    <div className="cart-item-controls">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="cart-item-price">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                        <button
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-drawer-footer">
              <div className="cart-summary-line">
                <span>Tạm tính hàng:</span>
                <span style={{ fontWeight: '600', color: 'var(--text-brown)' }}>
                  {subtotal.toLocaleString('vi-VN')}₫
                </span>
              </div>
              <div className="cart-summary-line">
                <span>Phí vận chuyển:</span>
                <span>{isFreeShip ? 'Miễn phí' : 'Tính ở bước sau'}</span>
              </div>
              <div className="cart-summary-line total-line">
                <span>Tổng tiền hàng:</span>
                <span className="grand-price">
                  {subtotal.toLocaleString('vi-VN')}₫
                </span>
              </div>

              <div className="cart-drawer-actions">
                <button
                  onClick={handleCheckoutClick}
                  className="btn btn-primary btn-full"
                >
                  Thanh toán ngay <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleViewCartClick}
                  className="btn btn-secondary btn-full"
                >
                  Xem chi tiết giỏ hàng
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

