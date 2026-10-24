import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Star, ShieldCheck, Gift, Truck } from 'lucide-react';
import { categories, bowEras } from '../data/categories';
import { products } from '../data/products';
import { customerReviews, demoDisclaimer } from '../data/reviews';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';
import { useToast } from '../context/ToastContext';

export default function Home() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 8 best seller products for the home page
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  const copyPromoCode = (code) => {
    navigator.clipboard?.writeText(code);
    showToast(`Đã sao chép mã ưu đãi "${code}" 🎀`, 'success');
  };

  return (
    <div className="home-page animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Text & CTA */}
            <div className="hero-content">
              <div className="hero-handwriting-badge">
                <span>🎀 Handmade With Love</span>
              </div>

              <h1 className="hero-title">
                A Little Bow, <br />
                <span className="text-highlight">A Lot of Love.</span>
              </h1>

              <div className="hero-subtitle">
                “Một chiếc nơ nhỏ, ngàn điều đáng yêu.”
              </div>

              <p className="hero-description">
                Tô điểm cho mái tóc, nâng niu nét riêng và khiến mỗi ngày của bạn trở nên xinh xắn hơn với những thiết kế nơ lụa, ruy băng thủ công đậm chất Hàn Quốc & Coquette.
              </p>

              <div className="hero-buttons">
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Khám phá bộ sưu tập <ArrowRight size={18} />
                </Link>
                <a href="#bow-eras" className="btn btn-secondary btn-lg">
                  Tìm chiếc nơ dành cho bạn ✨
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hero-features">
                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <Truck size={18} />
                  </div>
                  <div className="hero-feature-text">
                    <strong>Freeship từ 199K</strong>
                    <span>Toàn quốc 2-3 ngày</span>
                  </div>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <Gift size={18} />
                  </div>
                  <div className="hero-feature-text">
                    <strong>Gói quà xinh xắn</strong>
                    <span>Tặng thiệp viết tay</span>
                  </div>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="hero-feature-text">
                    <strong>Đổi trả 7 ngày</strong>
                    <span>Bảo hành phom nơ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual editorial media */}
            <div className="hero-visual">
              <div className="hero-main-card">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Cô gái buộc nơ lụa phong cách Hàn Quốc ngọt ngào"
                />
              </div>

              {/* Floating aesthetic badges */}
              <div className="hero-floating-badge badge-top-left">
                <div className="hero-floating-icon">
                  <Heart size={20} fill="#C84B68" color="#C84B68" />
                </div>
                <div className="hero-floating-content">
                  <span>Phong cách thịnh hành</span>
                  <strong>Balletcore & Coquette</strong>
                </div>
              </div>

              <div className="hero-floating-badge badge-bottom-right">
                <div className="hero-floating-icon">
                  <Sparkles size={20} />
                </div>
                <div className="hero-floating-content">
                  <span>Chất liệu chọn lọc</span>
                  <strong>100% Lụa Satin Cao Cấp</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={13} /> Khám phá danh mục
            </span>
            <h2 className="section-title">
              Nàng Đang Tìm Kiếm Chiếc Nơ Nào?
            </h2>
            <p className="section-subtitle">
              Mỗi danh mục là một câu chuyện riêng về vẻ đẹp nữ tính và sự chỉn chu.
            </p>
            <div className="bow-decor-divider">🎀</div>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. BEST SELLER PRODUCTS SECTION */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              🔥 Được yêu thích nhất
            </span>
            <h2 className="section-title">
              Top Sản Phẩm Bán Chạy Nhà BOWIE
            </h2>
            <p className="section-subtitle">
              Những chiếc nơ luôn trong tình trạng "cháy hàng" vì độ tôn dáng tóc và dễ phối đồ.
            </p>
            <div className="bow-decor-divider">🎀</div>
          </div>

          <ProductGrid products={bestSellers} />

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop" className="btn btn-outline btn-lg">
              Xem tất cả 14+ mẫu nơ tại Cửa hàng &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "FIND YOUR BOW ERA" SECTION */}
      <section id="bow-eras" className="bow-era-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              ✨ Phong cách của bạn
            </span>
            <h2 className="section-title">
              Find Your Bow Era
            </h2>
            <p className="section-subtitle">
              Bạn thuộc về nàng công chúa kẹo ngọt, cô gái trong trẻo hay quý cô Coquette quyến rũ?
            </p>
            <div className="bow-decor-divider">🎀</div>
          </div>

          <div className="era-grid">
            {bowEras.map((era) => (
              <div key={era.id} className="era-card">
                <div className="era-image-wrap">
                  <img src={era.image} alt={era.title} loading="lazy" />
                  <span className="era-badge-pill">
                    {era.badge}
                  </span>
                </div>
                <div className="era-body">
                  <h3 className="era-title">{era.title}</h3>
                  <span className="era-subtitle">{era.subtitle}</span>
                  <p className="era-desc">{era.description}</p>
                  <div className="era-quote">“{era.quote}”</div>
                  <Link
                    to={`/shop?era=${era.id}`}
                    className="btn btn-secondary btn-full"
                  >
                    Khám phá phong cách này &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMO BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card">
            <div className="promo-content">
              <span className="promo-badge-tag">
                💌 Ưu đãi ngọt ngào dành cho nàng
              </span>
              <h2 className="promo-title">
                Your First Bow, Your First Love 💗
              </h2>
              <p className="promo-desc">
                Tặng bạn <strong>giảm 10% cho toàn bộ đơn hàng đầu tiên</strong> khi mua sắm tại BOWIE. Áp dụng ngay lúc thanh toán!
              </p>
              <div className="promo-code-box">
                <span>Mã ưu đãi:</span>
                <strong>BOWIE10</strong>
                <button
                  onClick={() => copyPromoCode('BOWIE10')}
                  style={{
                    fontSize: '12px',
                    color: 'var(--cherry-red)',
                    textDecoration: 'underline',
                    padding: '2px 4px'
                  }}
                >
                  Sao chép mã
                </button>
              </div>
            </div>

            <div className="promo-actions">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Mua ngay hôm nay 🎀
              </Link>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                *Áp dụng tự động cho mọi đơn hàng mới
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER FEEDBACK SECTION */}
      <section className="feedback-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              💌 Lời yêu thương
            </span>
            <h2 className="section-title">
              Khách Hàng Nói Gì Về BOWIE?
            </h2>
            <p className="section-subtitle">
              Hơn 2.000+ chiếc nơ đã đến tay các bạn nữ trên khắp mọi miền đất nước.
            </p>
            <div className="bow-decor-divider">🎀</div>
          </div>

          <div className="reviews-grid">
            {customerReviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-user-row">
                  <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                  <div>
                    <div className="review-user-name">{rev.name}</div>
                    <div className="review-date">{rev.date}</div>
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <span className="review-tag">{rev.tag}</span>

                <p className="review-comment">"{rev.comment}"</p>
              </div>
            ))}
          </div>

          <div className="feedback-disclaimer">
            {demoDisclaimer}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <Newsletter />
    </div>
  );
}

