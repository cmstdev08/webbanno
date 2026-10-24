import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, QrCode, CheckCircle2, AlertCircle, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
  const {
    cart,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    isGiftWrap,
    orderNotes,
    clearCart
  } = useCart();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hà Nội',
    address: '',
    notes: orderNotes || '',
    paymentMethod: 'cod', // 'cod' | 'vietqr' | 'momo'
    shippingMethod: 'standard'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎀</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '10px' }}>
          Bạn chưa có sản phẩm nào để thanh toán
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Hãy chọn cho mình chiếc nơ xinh xắn trước khi đặt hàng nhé!
        </p>
        <Link to="/shop" className="btn btn-primary">
          Đến Cửa Hàng &rarr;
        </Link>
      </div>
    );
  }

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = 'Vui lòng nhập họ và tên của bạn';
    if (!formData.phone.trim()) {
      err.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone.trim())) {
      err.phone = 'Số điện thoại không hợp lệ (cần 10 chữ số)';
    }
    if (!formData.email.trim()) {
      err.email = 'Vui lòng nhập email để nhận xác nhận đơn hàng';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = 'Email chưa đúng định dạng';
    }
    if (!formData.address.trim()) err.address = 'Vui lòng nhập số nhà, tên đường, phường/xã';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc!', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderCode = `BW-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderCode,
        orderDate: new Date().toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        customer: formData,
        items: cart,
        subtotal,
        shippingFee,
        discountAmount,
        grandTotal,
        appliedCoupon: appliedCoupon?.code,
        isGiftWrap
      };

      try {
        localStorage.setItem('bowie_latest_order', JSON.stringify(completedOrder));
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: completedOrder } });
    }, 900);
  };

  return (
    <div className="checkout-page animate-fade-in" style={{ padding: '36px 0 70px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <Link to="/cart">Giỏ hàng</Link> / <span style={{ color: 'var(--cherry-red)', fontWeight: '600' }}>Thanh toán</span>
        </div>

        {/* Demo Notice Banner */}
        <div
          style={{
            background: 'var(--pink-powder)',
            border: '1.5px dashed var(--cherry-red)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <AlertCircle size={22} color="var(--cherry-red)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '13.5px', color: 'var(--text-brown)' }}>
            <strong>Chế độ mô phỏng đặt hàng Demo:</strong> Website hoạt động hoàn chỉnh ở giao diện frontend. Đơn hàng sẽ được tạo mã mẫu và lưu phiên trải nghiệm của bạn mà không trừ tiền thực tế.
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '36px' }} className="checkout-layout-grid">
            {/* Left Column: Customer Form & Payment Method */}
            <div>
              {/* Shipping Information Card */}
              <div
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-subtle)',
                  marginBottom: '24px'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-brown)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={20} color="var(--cherry-red)" /> Thông Tin Nhận Hàng
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-2col">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                      Họ và tên người nhận <span style={{ color: 'var(--cherry-red)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="VD: Nguyễn Ngọc Phương Linh"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.fullName ? '1.5px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                        background: 'var(--white)'
                      }}
                    />
                    {errors.fullName && <p style={{ color: 'var(--cherry-red)', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                      Số điện thoại nhận hàng <span style={{ color: 'var(--cherry-red)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="VD: 0912345678"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.phone ? '1.5px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                        background: 'var(--white)'
                      }}
                    />
                    {errors.phone && <p style={{ color: 'var(--cherry-red)', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Email nhận thông báo mã đơn <span style={{ color: 'var(--cherry-red)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="VD: phuonglinh.bowie@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.email ? '1.5px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                      background: 'var(--white)'
                    }}
                  />
                  {errors.email && <p style={{ color: 'var(--cherry-red)', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '16px', marginBottom: '16px' }} className="form-2col">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                      Tỉnh / Thành phố
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-pink)',
                        background: 'var(--white)'
                      }}
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Huế">Thừa Thiên Huế</option>
                      <option value="Nha Trang">Khánh Hòa</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                      Địa chỉ chi tiết (Số nhà, đường, ngõ) <span style={{ color: 'var(--cherry-red)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="VD: Số 24 ngõ 86 Tràng Tiền, Hoàn Kiếm"
                      value={formData.address}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.address ? '1.5px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                        background: 'var(--white)'
                      }}
                    />
                    {errors.address && <p style={{ color: 'var(--cherry-red)', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Ghi chú giao hàng (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="VD: Giao giờ hành chính, gọi trước 15 phút..."
                    value={formData.notes}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-pink)',
                      background: 'var(--white)'
                    }}
                  />
                </div>
              </div>

              {/* Payment Methods Card */}
              <div
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-brown)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={20} color="var(--cherry-red)" /> Phương Thức Thanh Toán
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* COD */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.paymentMethod === 'cod' ? '2px solid var(--cherry-red)' : '1px solid var(--border-light)',
                      background: formData.paymentMethod === 'cod' ? 'var(--pink-powder)' : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--cherry-red)', width: '17px', height: '17px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '14.5px', color: 'var(--text-brown)', display: 'block' }}>
                        Thanh toán khi nhận hàng (COD)
                      </strong>
                      <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                        Nhận gói hàng xinh xắn, kiểm tra nơ đúng mẫu rồi mới thanh toán tiền mặt.
                      </span>
                    </div>
                  </label>

                  {/* VietQR Bank Transfer */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.paymentMethod === 'vietqr' ? '2px solid var(--cherry-red)' : '1px solid var(--border-light)',
                      background: formData.paymentMethod === 'vietqr' ? 'var(--pink-powder)' : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="vietqr"
                      checked={formData.paymentMethod === 'vietqr'}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--cherry-red)', width: '17px', height: '17px', marginTop: '3px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '14.5px', color: 'var(--text-brown)' }}>
                          Chuyển khoản ngân hàng qua mã VietQR
                        </strong>
                        <span className="badge badge-pink" style={{ fontSize: '11px' }}>Khuyên dùng</span>
                      </div>
                      <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                        Quét mã QR từ mọi ứng dụng ngân hàng (Vietcombank, MB, Techcombank, v.v.).
                      </span>

                      {/* QR Preview Simulation */}
                      {formData.paymentMethod === 'vietqr' && (
                        <div
                          style={{
                            background: 'var(--white)',
                            padding: '14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-pink)',
                            marginTop: '10px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '16px'
                          }}
                        >
                          <div
                            style={{
                              width: '90px',
                              height: '90px',
                              background: '#FFF0F5',
                              border: '1.5px solid var(--cherry-red)',
                              borderRadius: '8px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              padding: '4px'
                            }}
                          >
                            <QrCode size={40} color="var(--cherry-red)" />
                            <span style={{ fontSize: '10px', color: 'var(--cherry-red)', fontWeight: 'bold' }}>VietQR Demo</span>
                          </div>
                          <div style={{ fontSize: '12.5px', color: 'var(--text-brown)', lineHeight: '1.5' }}>
                            <div>Ngân hàng: <strong>MB Bank (Hà Nội)</strong></div>
                            <div>Số TK: <strong>0988123269</strong></div>
                            <div>Chủ TK: <strong>BOWIE ACCESSORIES STUDIO</strong></div>
                            <div>Nội dung: <strong>BOWIE [Họ tên của bạn]</strong></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* MoMo */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.paymentMethod === 'momo' ? '2px solid var(--cherry-red)' : '1px solid var(--border-light)',
                      background: formData.paymentMethod === 'momo' ? 'var(--pink-powder)' : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--cherry-red)', width: '17px', height: '17px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '14.5px', color: 'var(--text-brown)', display: 'block' }}>
                        Ví điện tử MoMo / ZaloPay
                      </strong>
                      <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                        Thanh toán một chạm tiện lợi, không mất phí giao dịch.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Preview & Submit */}
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
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-brown)', marginBottom: '18px' }}>
                  Đơn Hàng Của Bạn ({cart.reduce((s, i) => s + i.quantity, 0)} món)
                </h3>

                {/* Items preview list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', marginBottom: '20px', paddingRight: '4px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-brown)', lineHeight: '1.3' }}>
                          {item.product.name}
                        </div>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                          {item.selectedColor} x {item.quantity}
                        </span>
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-brown)' }}>
                        {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  ))}
                </div>

                {isGiftWrap && (
                  <div style={{ padding: '8px 12px', background: 'var(--pink-powder)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--cherry-red)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🎀 Đã chọn: Hộp quà xinh kèm thiệp viết tay
                  </div>
                )}

                {/* Price Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    <span>Tạm tính hàng:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    <span>Phí giao hàng:</span>
                    <span>{shippingFee === 0 ? <strong style={{ color: '#2E7D32' }}>Miễn phí (Freeship)</strong> : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--cherry-red)' }}>
                      <span>Mã giảm ({appliedCoupon?.code}):</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingTop: '12px',
                      borderTop: '1.5px dashed var(--border-pink)',
                      fontSize: '17px',
                      fontWeight: '700',
                      color: 'var(--text-brown)'
                    }}
                  >
                    <span>Tổng cộng:</span>
                    <span style={{ fontSize: '22px', color: 'var(--cherry-red)' }}>
                      {grandTotal.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-full"
                >
                  {isSubmitting ? 'Đang tạo đơn hàng...' : 'Xác Nhận Đặt Hàng 🎀'}
                </button>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={16} color="var(--cherry-red)" />
                  Giao dịch an toàn • Hỗ trợ 24/7
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

