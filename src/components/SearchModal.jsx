import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularKeywords = [
    'Nơ lụa Satin',
    'Nơ đỏ Cherry',
    'Kẹp nơ mini',
    'Balletcore',
    'Set quà tặng',
    'Băng đô nơ'
  ];

  const searchResults = searchTerm.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleKeywordClick = (kw) => {
    onClose();
    navigate(`/shop?search=${encodeURIComponent(kw)}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className={`search-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleFormSubmit} className="search-input-box">
          <Search size={22} color="var(--cherry-red)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm nơ lụa, kẹp tóc ruy băng, set quà..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={onClose} className="icon-btn">
            <X size={20} />
          </button>
        </form>

        <div className="search-suggestions-box">
          {searchTerm.trim() ? (
            <div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Tìm thấy {searchResults.length} kết quả cho "{searchTerm}":
              </div>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
                  Không có sản phẩm nào khớp với từ khóa. Thử tìm với từ khóa khác nàng nhé! 🎀
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {searchResults.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pink-powder)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-brown)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--cherry-red)', fontWeight: '700' }}>
                          {item.price.toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                      <ArrowRight size={16} color="var(--text-light)" />
                    </div>
                  ))}

                  {searchResults.length > 5 && (
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="btn btn-secondary btn-sm btn-full"
                      style={{ marginTop: '10px' }}
                    >
                      Xem tất cả {searchResults.length} kết quả &rarr;
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-brown)' }}>
                🔍 Từ khóa tìm kiếm phổ biến
              </div>
              <div className="search-pill-list">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    className="search-pill"
                    onClick={() => handleKeywordClick(kw)}
                  >
                    🎀 {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

