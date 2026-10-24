import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Gift, ShieldCheck, Truck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Hero Section of About */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="hero-handwriting-badge">
            <span>🎀 Câu chuyện thương hiệu</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--text-brown)', marginBottom: '16px' }}>
            Chào mừng bạn đến với BOWIE 💌
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--pink-dark)', fontWeight: '600', marginBottom: '14px' }}>
            “Little Bows, Big Love — Một chiếc nơ nhỏ, ngàn điều đáng yêu”
          </p>
          <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            BOWIE ra đời từ tình yêu với những dải ruy băng mềm mại, những chiếc nơ lụa e ấp và mong muốn mang lại niềm vui nhỏ bé nhưng lấp lánh cho mái tóc của mỗi cô gái mỗi sớm mai thức dậy.
          </p>
          <div className="bow-decor-divider">🎀</div>
        </div>

        {/* 2-Column Story */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '70px',
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)'
          }}
          className="about-grid"
        >
          <div>
            <span className="badge badge-pink" style={{ marginBottom: '12px' }}>
              Handmade & Craftsmanship
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--text-brown)', marginBottom: '16px' }}>
              Nâng Niu Nét Riêng Của Nàng
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '14px' }}>
              Tại BOWIE, chúng mình tin rằng một chiếc nơ không chỉ đơn thuần là món phụ kiện giữ tóc, mà còn là nét chấm phá thể hiện tâm hồn yêu kiều, phong cách thời trang và sự tự tin của bạn.
            </p>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '20px' }}>
              Lấy cảm hứng từ những cửa tiệm phụ kiện xinh đẹp tại Seoul, các bảng tin Pinterest mộng mơ và làn sóng Balletcore lãng mạn, mỗi chiếc nơ tại BOWIE đều được lựa chọn từ loại vải lụa satin, gấm dệt hoa, voan tơ và nhung tuyết cao cấp nhất.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-brown)' }}>
                <CheckCircle2 size={18} color="var(--cherry-red)" />
                Xương kẹp mạ bạc/vàng êm ái, bám tóc chắc mà không đau da đầu.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-brown)' }}>
                <CheckCircle2 size={18} color="var(--cherry-red)" />
                Gấp và khâu tay thủ công, giữ phom nơ phồng bồng bềnh dài lâu.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-brown)' }}>
                <CheckCircle2 size={18} color="var(--cherry-red)" />
                Đóng gói 3 lớp xinh xắn kèm thiệp viết tay theo yêu cầu miễn phí.
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--pink-powder)', aspectRatio: '4/3' }}>
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
              alt="Quy trình đóng gói nơ thủ công tại BOWIE Studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* 4 Brand Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '70px' }} className="values-grid">
          <div style={{ background: 'var(--white)', padding: '26px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--pink-powder)', color: 'var(--cherry-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Chất Liệu Tuyển Chọn</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              100% lụa, voan tơ tằm nhân tạo và nhung bắt sáng cao cấp bền đẹp.
            </p>
          </div>

          <div style={{ background: 'var(--white)', padding: '26px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--pink-powder)', color: 'var(--cherry-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <Truck size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Freeship Toàn Quốc</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Miễn phí giao hàng cho mọi đơn từ 199.000₫, đóng gói cẩn thận.
            </p>
          </div>

          <div style={{ background: 'var(--white)', padding: '26px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--pink-powder)', color: 'var(--cherry-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <Gift size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Gói Quà & Thiệp Xinh</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Hộp quà thắt nơ, lót giấy thơm và thiệp viết tay nhắn gửi tâm tình.
            </p>
          </div>

          <div style={{ background: 'var(--white)', padding: '26px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--pink-powder)', color: 'var(--cherry-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Đổi Trả Dễ Dàng</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Hỗ trợ đổi mẫu mới trong 7 ngày nếu nơ bị lỗi sản xuất hoặc móp méo.
            </p>
          </div>
        </div>

        {/* Guides & FAQs */}
        <div
          id="guide-size"
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '40px'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--text-brown)', marginBottom: '18px' }}>
            🎀 Hướng Dẫn Chọn Kích Cỡ Nơ (Size Guide)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="guides-grid">
            <div style={{ background: 'var(--pink-powder)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--cherry-red)', marginBottom: '8px', fontSize: '16px' }}>1. Nơ Mini (3cm - 6cm)</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-brown)', lineHeight: '1.6' }}>
                Phù hợp cho tóc mái, kẹp hai bên bím tóc tết, chân búi tóc hoặc dùng làm điểm xuyết nhẹ nhàng khi đi học, đi làm hàng ngày.
              </p>
            </div>
            <div style={{ background: 'var(--pink-powder)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--cherry-red)', marginBottom: '8px', fontSize: '16px' }}>2. Nơ Trung Vừa (12cm - 16cm)</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-brown)', lineHeight: '1.6' }}>
                Kích thước phổ biến và được yêu thích nhất. Hoàn hảo cho tóc buộc nửa đầu kiểu tiểu thư Pháp, hoặc kẹp sau gáy với tóc uốn xoăn lơi.
              </p>
            </div>
            <div style={{ background: 'var(--pink-powder)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--cherry-red)', marginBottom: '8px', fontSize: '16px' }}>3. Nơ Đại Oversized (20cm - 30cm)</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-brown)', lineHeight: '1.6' }}>
                Dành cho tóc đuôi ngựa cao, tóc búi củ tỏi lớn, các buổi tiệc hoặc chụp kỷ yếu sống ảo. Tạo hiệu ứng khuôn mặt nhỏ nhắn và thanh thoát hơn.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Khám phá ngay các mẫu nơ xinh nhà BOWIE &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

