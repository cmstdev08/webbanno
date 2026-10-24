import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card">
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
      />
      {category.tag && (
        <span className="category-tag-pill">
          {category.tag}
        </span>
      )}
      <div className="category-overlay">
        <h3 className="category-title">{category.name}</h3>
        <p className="category-viet-name">{category.vietnameseName}</p>
        <p className="category-desc">{category.description}</p>
        <span className="category-link-text">
          Khám phá ngay <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

