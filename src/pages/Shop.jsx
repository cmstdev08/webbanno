import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Search, SlidersHorizontal, ArrowUpDown, Sparkles, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { allFilterCategories, bowEras } from '../data/categories';
import ProductGrid from '../components/ProductGrid';

const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả mức giá' },
  { id: 'under-50k', label: 'Dưới 50.000₫', max: 50000 },
  { id: '50k-100k', label: '50.000₫ – 100.000₫', min: 50000, max: 100000 },
  { id: 'over-100k', label: 'Trên 100.000₫', min: 100000 }
];

const COLOR_OPTIONS = [
  { name: 'Hồng pastel', hex: '#F7C8D8' },
  { name: 'Đỏ cherry', hex: '#C84B68' },
  { name: 'Trắng kem', hex: '#FFFCF8' },
  { name: 'Đen tuyền', hex: '#1E1E1E' },
  { name: 'Vàng bơ', hex: '#FFF2B2' },
  { name: 'Xanh baby', hex: '#D7E3FC' }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialEra = searchParams.get('era') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedEra, setSelectedEra] = useState(initialEra);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync with URL params if they change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);

    const era = searchParams.get('era');
    if (era) setSelectedEra(era);
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedPriceRange, selectedColor, selectedEra, sortBy]);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesShort = item.shortDesc?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesShort) {
          return false;
        }
      }

      // Price range filter
      if (selectedPriceRange !== 'all') {
        const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
        if (range) {
          if (range.min && item.price < range.min) return false;
          if (range.max && item.price > range.max) return false;
        }
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = item.colors?.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Era filter
      if (selectedEra !== 'all' && item.era !== selectedEra) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured' / best-sellers
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedPriceRange, selectedColor, selectedEra, sortBy]);

  // Paginated view
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(0, currentPage * itemsPerPage);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedPriceRange('all');
    setSelectedColor('all');
    setSelectedEra('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedPriceRange !== 'all' ||
    selectedColor !== 'all' ||
    selectedEra !== 'all';

  return (
    <div className="shop-page animate-fade-in" style={{ padding: '36px 0 70px 0' }}>
      <div className="container">
        {/* Breadcrumb / Page Title */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span>Trang chủ</span> / <span style={{ color: 'var(--cherry-red)', fontWeight: '600' }}>Cửa hàng</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: 'var(--text-brown)', lineHeight: 1.2 }}>
                Cửa Hàng Nơ & Phụ Kiện Tóc 🎀
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginTop: '4px' }}>
                Hơn {products.length} mẫu nơ lụa, ruy băng thủ công thiết kế cho nàng
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-secondary"
              style={{ display: 'none' }}
              id="mobile-filter-btn"
            >
              <SlidersHorizontal size={16} /> Bộ lọc & Tìm kiếm
            </button>
          </div>
        </div>

        {/* Top Controls: Search Bar & Sort selector */}
        <div
          style={{
            background: 'var(--white)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
            flexWrap: 'wrap'
          }}
        >
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--pink-powder)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-pink)',
              flex: '1',
              minWidth: '240px',
              maxWidth: '420px'
            }}
          >
            <Search size={17} color="var(--cherry-red)" />
            <input
              type="text"
              placeholder="Tìm theo tên nơ, chất liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: '13.5px'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: 'var(--text-light)', display: 'flex' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Results count & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
              Hiển thị <strong>{paginatedProducts.length}</strong> / {filteredProducts.length} sản phẩm
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={15} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-pink)',
                  background: 'var(--white)',
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">✨ Bán chạy & Nổi bật</option>
                <option value="newest">🎀 Mẫu mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}
          >
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Đang lọc theo:</span>

            {selectedCategory !== 'all' && (
              <span className="badge badge-pink" style={{ gap: '6px' }}>
                Danh mục: {allFilterCategories.find((c) => c.id === selectedCategory)?.name}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {searchQuery && (
              <span className="badge badge-pink" style={{ gap: '6px' }}>
                Từ khóa: "{searchQuery}"
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedPriceRange !== 'all' && (
              <span className="badge badge-pink" style={{ gap: '6px' }}>
                Giá: {PRICE_RANGES.find((r) => r.id === selectedPriceRange)?.label}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedPriceRange('all')} />
              </span>
            )}

            {selectedColor !== 'all' && (
              <span className="badge badge-pink" style={{ gap: '6px' }}>
                Màu: {selectedColor}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedColor('all')} />
              </span>
            )}

            {selectedEra !== 'all' && (
              <span className="badge badge-pink" style={{ gap: '6px' }}>
                Phong cách: {bowEras.find((e) => e.id === selectedEra)?.title}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedEra('all')} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              style={{
                fontSize: '12.5px',
                color: 'var(--cherry-red)',
                textDecoration: 'underline',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} /> Xóa tất cả bộ lọc
            </button>
          </div>
        )}

        {/* Main Grid: Sidebar Filters + Products */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '32px' }} className="shop-layout-grid">
          {/* Sidebar Filters */}
          <aside
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
              height: 'fit-content',
              position: 'sticky',
              top: '90px'
            }}
            className="shop-sidebar"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', color: 'var(--text-brown)' }}>
                <Filter size={18} color="var(--cherry-red)" />
                Bộ Lọc Sản Phẩm
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  style={{ fontSize: '12px', color: 'var(--cherry-red)' }}
                >
                  Đặt lại
                </button>
              )}
            </div>

            {/* Filter 1: Categories */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-brown)', marginBottom: '12px' }}>
                🎀 Danh Mục
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {allFilterCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      textAlign: 'left',
                      padding: '7px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13.5px',
                      background: selectedCategory === cat.id ? 'var(--pink-powder)' : 'transparent',
                      color: selectedCategory === cat.id ? 'var(--cherry-red)' : 'var(--text-brown)',
                      fontWeight: selectedCategory === cat.id ? '600' : '400',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <Sparkles size={13} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Price Range */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-brown)', marginBottom: '12px' }}>
                💰 Khoảng Giá
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRICE_RANGES.map((range) => (
                  <label
                    key={range.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      color: selectedPriceRange === range.id ? 'var(--cherry-red)' : 'var(--text-brown)'
                    }}
                  >
                    <input
                      type="radio"
                      name="price-range"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                      style={{ accentColor: 'var(--cherry-red)' }}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 3: Colors */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-brown)', marginBottom: '12px' }}>
                🎨 Màu Sắc Nơ
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  onClick={() => setSelectedColor('all')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '12px',
                    border: '1px solid var(--border-pink)',
                    background: selectedColor === 'all' ? 'var(--cherry-red)' : 'var(--white)',
                    color: selectedColor === 'all' ? 'var(--white)' : 'var(--text-brown)'
                  }}
                >
                  Tất cả
                </button>
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '12px',
                      border: '1px solid var(--border-pink)',
                      background: selectedColor === col.name ? 'var(--pink-powder)' : 'var(--white)',
                      color: selectedColor === col.name ? 'var(--cherry-red)' : 'var(--text-brown)',
                      fontWeight: selectedColor === col.name ? '600' : '400',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: col.hex,
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}
                    />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Era / Aesthetic */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-brown)', marginBottom: '12px' }}>
                ✨ Bow Era Phong Cách
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => setSelectedEra('all')}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    background: selectedEra === 'all' ? 'var(--pink-powder)' : 'transparent',
                    color: selectedEra === 'all' ? 'var(--cherry-red)' : 'var(--text-brown)'
                  }}
                >
                  Tất cả phong cách
                </button>
                {bowEras.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    style={{
                      textAlign: 'left',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      background: selectedEra === era.id ? 'var(--pink-powder)' : 'transparent',
                      color: selectedEra === era.id ? 'var(--cherry-red)' : 'var(--text-brown)',
                      fontWeight: selectedEra === era.id ? '600' : '400'
                    }}
                  >
                    {era.title} ({era.subtitle})
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            <ProductGrid
              products={paginatedProducts}
              emptyMessage="Không tìm thấy chiếc nơ nào với các bộ lọc bạn đã chọn. Hãy thử xóa hoặc điều chỉnh bộ lọc nhé!"
            />

            {/* Load More Button or Pagination */}
            {paginatedProducts.length < filteredProducts.length && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="btn btn-secondary btn-lg"
                >
                  Tải thêm sản phẩm ({paginatedProducts.length} / {filteredProducts.length}) 🎀
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

