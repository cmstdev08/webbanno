import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wishlist-page animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-tag">
            <Heart size={13} fill="currentColor" /> Danh sách mong ước
          </span>
          <h1 className="section-title">
            Những Chiếc Nơ Nàng Yêu Thích 💖
          </h1>
          <p className="section-subtitle">
            Lưu lại các mẫu nơ bạn mê mẩn để rinh về bất cứ lúc nào.
          </p>
          <div className="bow-decor-divider">🎀</div>
        </div>

        {favoritedProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '70px 20px',
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px dashed var(--border-pink)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--pink-powder)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                color: 'var(--cherry-red)'
              }}
            >
              <Heart size={38} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '8px' }}>
              Chưa có chiếc nơ nào trong danh sách
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '24px' }}>
              Hãy nhấn vào biểu tượng trái tim ở góc mỗi sản phẩm để lưu lại những mẫu nơ bạn thích nhé!
            </p>
            <Link to="/shop" className="btn btn-primary">
              Khám phá cửa hàng ngay &rarr;
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Đang lưu <strong>{favoritedProducts.length}</strong> mẫu nơ yêu thích
              </span>
              <Link to="/shop" style={{ fontSize: '13.5px', color: 'var(--cherry-red)', fontWeight: '600' }}>
                Tiếp tục xem thêm nơ &rarr;
              </Link>
            </div>

            <ProductGrid products={favoritedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

