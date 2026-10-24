import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { bowEras } from '../data/categories';

const collectionsList = [
  {
    id: 'balletcore-spring',
    title: 'Balletcore Dream Spring 🩰',
    season: 'Xuân - Hè 2026',
    description: 'Lấy cảm hứng từ nét duyên dáng của những vũ công ba lê với ruy băng voan bay bổng, gam màu kem sữa và hồng pastel trong trẻo.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    slug: 'mini-bows'
  },
  {
    id: 'cherry-coquette',
    title: 'Cherry Coquette Romance 🍒',
    season: 'Signature Drop',
    description: 'Quyến rũ, nổi bật với sắc đỏ cherry mọng nước trên nền vải nhung tuyết óng ánh. Tuyên ngôn của vẻ đẹp tự tin và ngọt ngào.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    slug: 'ribbon-clips'
  },
  {
    id: 'french-satin',
    title: 'French Silk & Satin Elegance 🥐',
    season: 'Timeless Collection',
    description: 'Nơ lụa đôi dáng dài kiểu Pháp kinh điển, mang hơi thở lãng mạn của các quý cô Paris dạo bước dưới bóng râm mùa thu.',
    image: 'https://images.unsplash.com/photo-1584297091622-af8e5bd81b29?auto=format&fit=crop&w=1000&q=80',
    slug: 'satin-bows'
  },
  {
    id: 'sweetheart-gifts',
    title: 'Dear Sweetheart Gift Sets 🎁',
    season: 'Holiday Edition',
    description: 'Những chiếc hộp quà nơ lụa 3 lớp tinh xảo, ướp hương hoa dịu dàng để thay lời nhắn gửi yêu thương đến người bạn trân quý.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    slug: 'gift-sets'
  }
];

export default function Collections() {
  return (
    <div className="collections-page animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '50px' }}>
          <span className="section-tag">
            <Sparkles size={13} /> Lookbook Thời Trang
          </span>
          <h1 className="section-title">
            Bộ Sưu Tập Nơ BOWIE
          </h1>
          <p className="section-subtitle">
            Khám phá các phong cách nơ được định hình theo xu hướng thời trang Hàn Quốc, Balletcore và Coquette đương đại.
          </p>
          <div className="bow-decor-divider">🎀</div>
        </div>

        {/* Collections Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {collectionsList.map((col, idx) => (
            <div
              key={col.id}
              style={{
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1.1fr 1fr' : '1fr 1.1fr',
                gap: '40px',
                alignItems: 'center',
                background: 'var(--white)',
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-subtle)'
              }}
              className="collection-row"
            >
              <div
                style={{
                  order: idx % 2 === 0 ? 1 : 2,
                  aspectRatio: '16/10',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: 'var(--pink-powder)'
                }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                <span className="badge badge-pink" style={{ marginBottom: '10px' }}>
                  {col.season}
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--text-brown)', marginBottom: '12px' }}>
                  {col.title}
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {col.description}
                </p>
                <Link
                  to={`/shop?category=${col.slug}`}
                  className="btn btn-primary"
                >
                  Khám phá các mẫu nơ này <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

