import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, emptyMessage = 'Chưa có sản phẩm nào phù hợp.' }) {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px dashed var(--border-pink)',
          margin: '20px 0'
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '14px' }}>🎀</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>
          Không tìm thấy chiếc nơ nào!
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

