import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Heart } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <span>
        🎀 Free ship cho đơn từ 199K | Gói hàng xinh xắn dành riêng cho bạn 💌{' '}
        <Link to="/shop">
          Săn ưu đãi ngay &rarr;
        </Link>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="close-announcement"
        aria-label="Đóng thông báo"
      >
        <X size={15} />
      </button>
    </div>
  );
}

