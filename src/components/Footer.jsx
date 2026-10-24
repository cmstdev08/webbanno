import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo" style={{ marginBottom: '12px' }}>
              <div className="brand-logo-icon">
                🎀
              </div>
              <div>
                <span className="brand-name">BOWIE</span>
                <span className="brand-tagline">Little Bows, Big Love</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Thương hiệu nơ và phụ kiện tóc thiết kế dành riêng cho các bạn nữ yêu thích phong cách Hàn Quốc, Balletcore và Coquette ngọt ngào. Mỗi chiếc nơ đều được chăm chút tỉ mỉ từ từng đường may và đóng gói như một món quà xinh đẹp.
            </p>
            <div className="footer-contact-item">
              <MapPin size={16} color="var(--cherry-red)" />
              <span>Studio 102, Tầng 3, Phố Tràng Tiền, Hà Nội</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} color="var(--cherry-red)" />
              <span>Hotline / Zalo: 0988.123.BOW (0988.123.269)</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} color="var(--cherry-red)" />
              <span>hello@bowie-accessories.vn</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} color="var(--cherry-red)" />
              <span>Mở cửa: 09:00 - 21:30 hàng ngày</span>
            </div>

            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok">
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Tk</span>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Pinterest">
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>P</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Khám Phá</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop">Tất cả sản phẩm</Link></li>
              <li><Link to="/shop?category=satin-bows">Nơ lụa Satin Bows</Link></li>
              <li><Link to="/shop?category=mini-bows">Set nơ mini Balletcore</Link></li>
              <li><Link to="/shop?category=ribbon-clips">Kẹp tóc ruy băng</Link></li>
              <li><Link to="/shop?category=gift-sets">Hộp quà tặng Gift Sets</Link></li>
              <li><Link to="/collections">Bộ sưu tập theo mùa</Link></li>
              <li><Link to="/wishlist">Danh sách yêu thích</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Guides */}
          <div>
            <h4 className="footer-col-title">Chăm Sóc Khách Hàng</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">Câu chuyện thương hiệu</Link></li>
              <li><Link to="/about#guide-size">Hướng dẫn chọn size nơ</Link></li>
              <li><Link to="/about#guide-care">Hướng dẫn bảo quản nơ lụa</Link></li>
              <li><Link to="/about#policy-shipping">Chính sách giao hàng (Freeship 199K)</Link></li>
              <li><Link to="/about#policy-returns">Chính sách đổi trả trong 7 ngày</Link></li>
              <li><Link to="/about#policy-gift">Dịch vụ gói quà tặng & viết thiệp</Link></li>
            </ul>
          </div>

          {/* Column 4: Sweet note & Payment methods */}
          <div>
            <h4 className="footer-col-title">Thanh Toán & Đóng Gói</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              Mỗi đơn hàng đều được đóng gói trong hộp giấy kẹp nơ 3 lớp chống sốc, xịt nước hoa khô dịu nhẹ và kèm thiệp thông điệp ngẫu nhiên 💌
            </p>
            <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-brown)', marginBottom: '8px' }}>
              Phương thức thanh toán chấp nhận:
            </div>
            <div className="payment-badges-row">
              <span className="payment-badge">COD Nhận Hàng</span>
              <span className="payment-badge">VietQR</span>
              <span className="payment-badge">Ví MoMo</span>
              <span className="payment-badge">ZaloPay</span>
              <span className="payment-badge">Visa / Master</span>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--white)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-pink)' }}>
              <span style={{ fontSize: '12px', color: 'var(--cherry-red)', fontWeight: '600', display: 'block', marginBottom: '2px' }}>
                🎀 Ưu đãi thành viên mới:
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-brown)' }}>
                Nhập mã <strong>BOWIE10</strong> để nhận giảm 10% đơn đầu tiên.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>BOWIE Accessories</strong>. All rights reserved. Made with <Heart size={13} color="var(--cherry-red)" style={{ display: 'inline', verticalAlign: 'middle' }} /> for bow lovers.
          </div>
          <div>
            Thiết kế giao diện thời trang & trải nghiệm mua sắm phụ kiện cao cấp.
          </div>
        </div>
      </div>
    </footer>
  );
}

