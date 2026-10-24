import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Gift, Tag, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cart,
    subtotal,
    freeShipRemaining,
    freeShipProgress,
    isFreeShip,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    discountAmount,
    shippingFee,
    grandTotal,
    isGiftWrap,
    setIsGiftWrap,
    orderNotes,
    setOrderNotes
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'var(--pink-powder)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: '2px dashed var(--border-pink)'
          }}
        >
          <ShoppingBag size={48} color="var(--cherry-red)" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text-brown)', marginBottom: '10px' }}>
          Giỏ Hàng Của Nàng Đang Trống 🎀
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '420px', margin: '0 auto 28px auto' }}>
          Đừng để mái tóc thiếu đi điểm nhấn ngọt ngào nhé! Hãy ghé thăm cửa hàng để chọn những chiếc nơ ưng ý nhất nha.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Khám phá bộ sưu tập nơ ngay &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in" style={{ padding: '36px 0 70px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <Link to="/">Trang chủ</Link> / <span style={{ color: 'var(--cherry-red)', fontWeight: '600' }}>Giỏ hàng</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', color: 'var(--text-brown)', marginBottom: '24px' }}>
          Giỏ Hàng Của Bạn 🎀
        </h1>

        {/* Free Shipping Progress Card */}
        <div
          style={{
            background: 'var(--pink-powder)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-pink)',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
            {isFreeShip ? (
              <span style={{ fontWeight: '600', color: 'var(--cherry-red)' }}>
                🎉 Tuyệt vời! Đơn hàng của bạn đã đạt điều kiện <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!
              </span>
            ) : (
              <span>
                Mua thêm <strong style={{ color: 'var(--cherry-red)' }}>{freeShipRemaining.toLocaleString('vi-VN')}₫</strong> để nhận Freeship toàn quốc! 💌
              </span>
            )}
            <span style={{ fontWeight: '700', color: 'var(--text-brown)' }}>{freeShipProgress}%</span>
          </div>
          <div className="progress-track" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${freeShipProgress}%` }} />
          </div>
        </div>

        {/* Main 2-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px' }} className="cart-layout-grid">
          {/* Left Column: Cart items table & gift wrapping */}
          <div>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-subtle)',
                overflow: 'hidden',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr 1fr 1fr',
                  padding: '14px 20px',
                  background: 'var(--pink-powder)',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--text-brown)'
                }}
                className="cart-table-header"
              >
                <span>Sản phẩm</span>
                <span style={{ textAlign: 'center' }}>Đơn giá</span>
                <span style={{ textAlign: 'center' }}>Số lượng</span>
                <span style={{ textAlign: 'right' }}>Thành tiền</span>
              </div>

              <div style={{ padding: '10px 20px' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '3fr 1fr 1fr 1fr',
                      alignItems: 'center',
                      padding: '18px 0',
                      borderBottom: '1px solid var(--border-light)'
                    }}
                    className="cart-table-row"
                  >
                    {/* Item info */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: '65px', height: '65px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-brown)', lineHeight: '1.3', display: 'block', marginBottom: '4px' }}
                        >
                          {item.product.name}
                        </Link>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Màu: <strong>{item.selectedColor}</strong>
                        </span>
                        <div style={{ marginTop: '4px' }}>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ fontSize: '12px', color: 'var(--cherry-red)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 size={12} /> Xóa
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Unit price */}
                    <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-brown)' }}>
                      {item.product.price.toLocaleString('vi-VN')}₫
                    </div>

                    {/* Quantity controls */}
                    <div style={{ textAlign: 'center' }}>
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div style={{ textAlign: 'right', fontWeight: '700', color: 'var(--cherry-red)', fontSize: '15px' }}>
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart / Continue Shopping Row */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'var(--bg-tint)',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--cherry-red)', fontWeight: '600' }}>
                  <ArrowLeft size={16} /> Tiếp tục chọn thêm nơ
                </Link>
                <button
                  onClick={clearCart}
                  style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline' }}
                >
                  Xóa toàn bộ giỏ hàng
                </button>
              </div>
            </div>

            {/* Gift Wrap & Note Box */}
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--cherry-red)', marginTop: '2px' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--text-brown)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Gift size={16} color="var(--cherry-red)" />
                    Gói quà tặng xinh xắn kèm thiệp viết tay (Miễn phí) 🎀
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Chúng mình sẽ đóng hộp quà thắt nơ lụa, xịt hương hoa thơm nhẹ và viết kèm lời nhắn của bạn.
                  </div>
                </div>
              </label>

              {isGiftWrap && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-brown)', marginBottom: '6px' }}>
                    💌 Lời nhắn bạn muốn viết lên thiệp:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Chúc bạn thân sinh nhật tuổi 20 thật rực rỡ và luôn xinh đẹp như nơ nhé..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-pink)',
                      background: 'var(--pink-powder)',
                      resize: 'vertical'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '26px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-subtle)',
                position: 'sticky',
                top: '90px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-brown)', marginBottom: '20px' }}>
                Tóm Tắt Đơn Hàng
              </h3>

              {/* Coupon Form */}
              <div style={{ marginBottom: '24px' }}>
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Mã giảm giá (VD: BOWIE10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--border-pink)',
                      fontSize: '13px',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Áp dụng
                  </button>
                </form>

                {couponError && (
                  <p style={{ color: 'var(--cherry-red)', fontSize: '12px', marginTop: '6px' }}>
                    {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px 14px',
                      background: 'var(--pink-powder)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--cherry-red)' }}>{appliedCoupon.code}</strong>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11.5px' }}>
                        {appliedCoupon.description}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ color: 'var(--cherry-red)', fontSize: '12px', textDecoration: 'underline' }}
                    >
                      Gỡ mã
                    </button>
                  </div>
                )}

                {/* Available demo coupon pills */}
                <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Gợi ý mã ưu đãi:
                  <span
                    onClick={() => { setCouponInput('BOWIE10'); applyCoupon('BOWIE10'); }}
                    style={{ marginLeft: '6px', color: 'var(--cherry-red)', cursor: 'pointer', fontWeight: '600' }}
                  >
                    BOWIE10
                  </span>,
                  <span
                    onClick={() => { setCouponInput('BOWIELOVE'); applyCoupon('BOWIELOVE'); }}
                    style={{ marginLeft: '6px', color: 'var(--cherry-red)', cursor: 'pointer', fontWeight: '600' }}
                  >
                    BOWIELOVE
                  </span>,
                  <span
                    onClick={() => { setCouponInput('FREESHIP'); applyCoupon('FREESHIP'); }}
                    style={{ marginLeft: '6px', color: 'var(--cherry-red)', cursor: 'pointer', fontWeight: '600' }}
                  >
                    FREESHIP
                  </span>
                </div>
              </div>

              {/* Price Calculation Lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '18px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span>Tạm tính hàng:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-brown)' }}>
                    {subtotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span>Phí vận chuyển:</span>
                  <span>
                    {isFreeShip ? (
                      <strong style={{ color: '#2E7D32' }}>Miễn phí (Freeship)</strong>
                    ) : (
                      `${shippingFee.toLocaleString('vi-VN')}₫`
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--cherry-red)' }}>
                    <span>Giảm giá mã:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: '14px',
                    borderTop: '1.5px dashed var(--border-pink)',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--text-brown)'
                  }}
                >
                  <span>Tổng thanh toán:</span>
                  <span style={{ fontSize: '24px', color: 'var(--cherry-red)' }}>
                    {grandTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-lg btn-full"
              >
                Tiến hành đặt hàng <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                🔒 Đảm bảo an toàn 100% • Hỗ trợ kiểm hàng khi nhận
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

