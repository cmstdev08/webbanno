import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email của bạn nhé!');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Email có vẻ chưa đúng định dạng. Vui lòng kiểm tra lại nha!');
      return;
    }

    setIsSubscribed(true);
    showToast('Đăng ký nhận tin thành công! Tặng bạn mã BOWIE10 🎀', 'success');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-icon-wrap">
            <Mail size={28} />
          </div>

          <span className="section-tag">
            <Sparkles size={13} /> BOWIE Community
          </span>

          <h2 className="newsletter-title">
            A little love in your inbox 💌
          </h2>

          <p className="newsletter-desc">
            Trở thành người đầu tiên đón chờ những bộ sưu tập nơ mới nhất, nhận thông báo các đợt Restock phiên bản giới hạn và quà tặng bí mật cho thành viên.
          </p>

          {isSubscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={20} />
              <span>
                Cảm ơn bạn đã đồng hành! Chúng mình đã gửi mã <strong>BOWIELOVE</strong> vào hòm thư rồi nha.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập email xinh xắn của bạn..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} /> Đăng ký
              </button>
            </form>
          )}

          {error && (
            <p style={{ color: 'var(--cherry-red)', fontSize: '13px', marginTop: '10px' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

