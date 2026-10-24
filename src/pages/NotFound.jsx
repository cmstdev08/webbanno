import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎀</div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '56px', color: 'var(--cherry-red)', marginBottom: '10px' }}>
        404
      </h1>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--text-brown)', marginBottom: '14px' }}>
        Chiếc Nơ Này Đã Bay Mất Rồi!
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 28px auto' }}>
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Về Trang Chủ
        </Link>
        <Link to="/shop" className="btn btn-secondary">
          Xem Cửa Hàng
        </Link>
      </div>
    </div>
  );
}

