import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor || product.colors?.[0]?.name, 1, true);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div className="product-card">
      {/* Image & Badges */}
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="product-badge-group">
          {product.badge && (
            <span
              className={`badge ${
                product.badge === 'Bán chạy'
                  ? 'badge-cherry'
                  : product.badge === 'Mới'
                  ? 'badge-pink'
                  : 'badge-soft'
              }`}
            >
              {product.badge === 'Bán chạy' && '🔥 '}
              {product.badge === 'Mới' && '✨ '}
              {product.badge === 'Yêu thích' && '💖 '}
              {product.badge === 'Đặc biệt' && '🎀 '}
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="badge badge-cherry">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          title={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>

        {/* Color Previews */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-color-dots">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="color-dot"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="product-info">
        {/* Rating & Review Counter */}
        <div className="product-rating">
          <div className="rating-stars">
            <Star size={13} fill="currentColor" />
            <span style={{ fontWeight: '600', color: 'var(--text-brown)' }}>
              {product.rating}
            </span>
          </div>
          <span>•</span>
          <span>({product.reviewCount} đánh giá)</span>
        </div>

        {/* Product Title */}
        <h3 className="product-title">
          <Link to={`/product/${product.id}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="product-current-price">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.originalPrice && (
            <span className="product-original-price">
              {product.originalPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        {/* Card Actions */}
        <div className="product-card-actions">
          <button
            onClick={handleQuickAdd}
            className="add-to-cart-quick-btn"
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingBag size={15} />
            <span>Thêm giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>
  );
}

