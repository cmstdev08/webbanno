import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, Gift, ArrowRight, Check, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductGrid from '../components/ProductGrid';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('details');

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedColor(product.colors?.[0]?.name || '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎀</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', marginBottom: '12px' }}>
          Sản phẩm không tồn tại
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Chiếc nơ bạn tìm kiếm có thể đã hết hàng hoặc đổi tên.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Xem tất cả mẫu nơ khác &rarr;
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết sản phẩm 💌', 'info');
  };

  // Related products (same category or era, excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.era === product.era))
    .slice(0, 4);

  return (
    <div className="product-detail-page animate-fade-in" style={{ padding: '30px 0 70px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <Link to="/">Trang chủ</Link> / <Link to="/shop">Cửa hàng</Link> /{' '}
          <span style={{ color: 'var(--cherry-red)', fontWeight: '600' }}>{product.name}</span>
        </nav>

        {/* Product Main Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: '48px',
            marginBottom: '70px',
            background: 'var(--white)',
            padding: '36px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)'
          }}
          className="product-detail-grid"
        >
          {/* Left Column: Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Main Featured Photo */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--pink-powder)',
                border: '1px solid var(--border-pink)'
              }}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {product.badge && (
                <span
                  className="badge badge-cherry"
                  style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '13px', padding: '6px 14px' }}
                >
                  🎀 {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: activeImage === idx ? '2px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                    opacity: activeImage === idx ? 1 : 0.65,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info & Purchase options */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', color: 'var(--star-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <strong style={{ color: 'var(--text-brown)' }}>{product.rating}</strong>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount} lượt đánh giá)</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleShare}
                  className="icon-btn"
                  title="Chia sẻ sản phẩm"
                  aria-label="Chia sẻ"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`icon-btn ${isFavorited ? 'active' : ''}`}
                  title={isFavorited ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
                  aria-label="Yêu thích"
                  style={{ color: isFavorited ? 'var(--cherry-red)' : 'inherit' }}
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text-brown)', lineHeight: '1.25', marginBottom: '14px' }}>
              {product.name}
            </h1>

            {/* Price Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                padding: '14px 18px',
                background: 'var(--pink-powder)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px'
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: '800', color: 'var(--cherry-red)' }}>
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '16px', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
              {discountPercent > 0 && (
                <span className="badge badge-cherry" style={{ marginLeft: 'auto' }}>
                  Tiết kiệm {discountPercent}%
                </span>
              )}
            </div>

            {/* Short description */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '22px' }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-brown)', marginBottom: '10px' }}>
                  Màu sắc: <span style={{ color: 'var(--cherry-red)' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 'var(--radius-pill)',
                        border: selectedColor === color.name ? '2px solid var(--cherry-red)' : '1px solid var(--border-pink)',
                        background: selectedColor === color.name ? 'var(--pink-powder)' : 'var(--white)',
                        color: 'var(--text-brown)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: color.hex,
                          border: '1px solid rgba(0,0,0,0.15)'
                        }}
                      />
                      <span>{color.name}</span>
                      {selectedColor === color.name && <Check size={14} color="var(--cherry-red)" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div style={{ marginBottom: '26px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-brown)', marginBottom: '8px' }}>
                Số lượng:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="qty-stepper" style={{ padding: '6px 12px' }}>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Giảm số lượng"
                  >
                    -
                  </button>
                  <span className="qty-value" style={{ minWidth: '30px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Còn {product.stock} chiếc tại cửa hàng
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-secondary btn-lg"
                style={{ flex: 1, minWidth: '180px' }}
              >
                <ShoppingBag size={18} /> Thêm vào giỏ
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, minWidth: '180px' }}
              >
                Mua ngay &rarr;
              </button>
            </div>

            {/* Service Perks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '16px',
                background: 'var(--bg-tint)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-pink)'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Truck size={18} color="var(--cherry-red)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Freeship 199K</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Giao nhanh 2-3 ngày</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Gift size={18} color="var(--cherry-red)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Hộp Quà 3 Lớp</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Kèm thiệp viết tay</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={18} color="var(--cherry-red)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Đổi Trả 7 Ngày</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Nếu có lỗi sản xuất</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Care Tabs */}
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)',
            padding: '32px',
            marginBottom: '70px'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveAccordion('details')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: '600',
                color: activeAccordion === 'details' ? 'var(--cherry-red)' : 'var(--text-brown)',
                borderBottom: activeAccordion === 'details' ? '2px solid var(--cherry-red)' : 'none',
                paddingBottom: '8px'
              }}
            >
              🎀 Thông số & Chất liệu
            </button>
            <button
              onClick={() => setActiveAccordion('care')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: '600',
                color: activeAccordion === 'care' ? 'var(--cherry-red)' : 'var(--text-brown)',
                borderBottom: activeAccordion === 'care' ? '2px solid var(--cherry-red)' : 'none',
                paddingBottom: '8px'
              }}
            >
              💌 Hướng dẫn bảo quản nơ
            </button>
            <button
              onClick={() => setActiveAccordion('shipping')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: '600',
                color: activeAccordion === 'shipping' ? 'var(--cherry-red)' : 'var(--text-brown)',
                borderBottom: activeAccordion === 'shipping' ? '2px solid var(--cherry-red)' : 'none',
                paddingBottom: '8px'
              }}
            >
              📦 Đóng gói & Vận chuyển
            </button>
          </div>

          {activeAccordion === 'details' && (
            <div style={{ lineHeight: '1.8', fontSize: '14px', color: 'var(--text-brown)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '12px', marginBottom: '8px' }}>
                <strong>Chất liệu chính:</strong>
                <span>{product.details?.material || 'Lụa Satin dệt tơ tằm nhân tạo cao cấp'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '12px', marginBottom: '8px' }}>
                <strong>Loại kẹp / Xương kẹp:</strong>
                <span>{product.details?.clipType || 'Kẹp mỏ vịt bọc vải êm ái'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '12px', marginBottom: '8px' }}>
                <strong>Kích thước:</strong>
                <span>{product.details?.dimensions || '15cm x 20cm'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '12px', marginBottom: '8px' }}>
                <strong>Trọng lượng:</strong>
                <span>{product.details?.weight || '30g'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '12px' }}>
                <strong>Xuất xứ:</strong>
                <span>{product.details?.origin || 'BOWIE Studio Vietnam'}</span>
              </div>
            </div>
          )}

          {activeAccordion === 'care' && (
            <div style={{ lineHeight: '1.8', fontSize: '14px', color: 'var(--text-brown)' }}>
              <p style={{ marginBottom: '12px' }}>
                {product.careInstructions ||
                  'Nên giặt khô hoặc giặt nhẹ bằng tay với nước mát và dầu gội dịu nhẹ. Không vắt xoắn nơ.'}
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
                <li>Tránh phơi dưới ánh nắng gắt trực tiếp để giữ màu pastel luôn chuẩn đẹp.</li>
                <li>Là/ủi bằng bàn là hơi nước ở khoảng cách 10cm để nơ luôn phồng bồng bềnh.</li>
                <li>Nên cất nơ trong hộp quà hoặc treo trên giá phụ kiện riêng để tránh bị đè gãy nếp.</li>
              </ul>
            </div>
          )}

          {activeAccordion === 'shipping' && (
            <div style={{ lineHeight: '1.8', fontSize: '14px', color: 'var(--text-brown)' }}>
              <p style={{ marginBottom: '12px' }}>
                Mỗi đơn hàng từ BOWIE đều được nâng niu đóng gói trong hộp giấy carton 3 lớp bảo vệ, quấn giấy nến thơm và thắt ruy băng nơ xinh đẹp. Bạn có thể chọn kèm thiệp viết tay nhắn gửi yêu thương hoàn toàn miễn phí khi thanh toán!
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '16px' }}>
                <div style={{ background: 'var(--pink-powder)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Nội thành Hà Nội:</strong> 1-2 ngày làm việc (Phí 20.000₫)
                </div>
                <div style={{ background: 'var(--pink-powder)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Các tỉnh thành khác:</strong> 2-3 ngày làm việc (Phí 25.000₫)
                </div>
                <div style={{ background: 'var(--pink-powder)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Đơn từ 199.000₫:</strong> Miễn phí vận chuyển toàn quốc!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="section-header">
              <span className="section-tag">
                🎀 Gợi ý cho nàng
              </span>
              <h2 className="section-title">
                Sản Phẩm Tương Tự Nàng Sẽ Thích
              </h2>
              <div className="bow-decor-divider">🎀</div>
            </div>

            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}

