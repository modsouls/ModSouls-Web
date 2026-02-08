import './LoadingSkeleton.css';

export const ProductCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 4 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-header"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text short"></div>
  </div>
);
