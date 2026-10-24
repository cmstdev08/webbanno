import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Heart, Package, ArrowRight, Printer, AlertCircle, ShoppingBag } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [order, setOrder] = useState(() => {
    if (location.state?.order) return location.state.order;
    try {
      const saved = localStorage.getItem('bowie_latest_order');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
    showToast('Đang mở hộp thoại in biên nhận 🖨️', 'info');
  };

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎀</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '12px' }}>
          Chưa tìm thấy thông tin đơn hàng
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Bạn chưa thực hiện đơn đặt hàng nào gần đây.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Khám phá cửa hàng &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="order-success-page animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Celebration Header Card */}
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 30px',
            border: '1px solid var(--border-pink)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--pink-powder)',
              color: 'var(--cherry-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              border: '2px solid var(--border-pink)'
            }}
          >
            <CheckCircle2 size={46} />
          </div>

          <span className="badge badge-pink" style={{ marginBottom: '12px' }}>
            💌 Đặt hàng thành công (Mô phỏng Demo)
          </span>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', color: 'var(--text-brown)', marginBottom: '10px' }}>
            Cảm Ơn Nàng Thơ Đã Chọn BOWIE! 🎀
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
            Chiếc nơ xinh xắn của bạn đang được BOWIE chuẩn bị thật chỉn chu, ướp hương thơm dịu nhẹ và gói trong hộp 3 lớp để gửi đến bạn sớm nhất.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--pink-powder)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '14px',
              border: '1px dashed var(--cherry-red)'
            }}
          >
            <span>Mã đơn hàng:</span>
            <strong style={{ color: 'var(--cherry-red)', fontSize: '16px', letterSpacing: '1px' }}>
              #{order.orderCode}
            </strong>
          </div>
        </div>

        {/* Order Details Receipt Card */}
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '28px'
          }}
          id="printable-receipt"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--text-brown)' }}>
                Chi Tiết Đơn Hàng #{order.orderCode}
              </h3>
              <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Ngày đặt: {order.orderDate}
              </span>
            </div>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--pink-powder)',
                color: 'var(--cherry-red)',
                fontSize: '12.5px',
                fontWeight: '600'
              }}
            >
              <Printer size={14} /> In biên nhận
            </button>
          </div>

          {/* Customer & Shipping info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', background: 'var(--bg-tint)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-brown)', display: 'block', marginBottom: '4px' }}>
                Người nhận hàng:
              </strong>
              <div style={{ fontSize: '13.5px', color: 'var(--text-brown)' }}>
                {order.customer.fullName}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                SĐT: {order.customer.phone}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Email: {order.customer.email}
              </div>
            </div>

            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-brown)', display: 'block', marginBottom: '4px' }}>
                Địa chỉ nhận:
              </strong>
              <div style={{ fontSize: '13.5px', color: 'var(--text-brown)' }}>
                {order.customer.address}, {order.customer.city}
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Phương thức: <strong>{order.customer.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận' : order.customer.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'Ví MoMo'}</strong>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '24px' }}>
            <strong style={{ fontSize: '14px', color: 'var(--text-brown)', display: 'block', marginBottom: '12px' }}>
              Sản phẩm đã chọn ({order.items.reduce((s, i) => s + i.quantity, 0)} chiếc):
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {order.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-brown)' }}>
                      {item.product.name}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Màu sắc: {item.selectedColor} | Số lượng: x{item.quantity}
                    </span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-brown)' }}>
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Calculation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)' }}>
              <span>Tạm tính hàng:</span>
              <span>{order.subtotal.toLocaleString('vi-VN')}₫</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)' }}>
              <span>Phí giao hàng:</span>
              <span>{order.shippingFee === 0 ? 'Freeship (0₫)' : `${order.shippingFee.toLocaleString('vi-VN')}₫`}</span>
            </div>

            {order.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--cherry-red)' }}>
                <span>Mã giảm giá ({order.appliedCoupon}):</span>
                <span>-{order.discountAmount.toLocaleString('vi-VN')}₫</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: 'var(--cherry-red)', borderTop: '1px dashed var(--border-pink)', paddingTop: '10px', marginTop: '6px' }}>
              <span>Tổng thanh toán:</span>
              <span>{order.grandTotal.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div
          style={{
            padding: '14px 20px',
            background: 'var(--pink-powder)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-pink)',
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          <AlertCircle size={15} color="var(--cherry-red)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          Lưu ý kỹ thuật: Đây là quy trình hoàn tất đơn hàng demo frontend theo yêu cầu dự án. Không phát sinh thanh toán hay giao vận ngoài đời thực.
        </div>

        {/* Navigation actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Tiếp tục mua sắm nơ <ArrowRight size={18} />
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Về Trang Chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

