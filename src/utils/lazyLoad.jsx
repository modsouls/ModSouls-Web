import { lazy, Suspense } from 'react';

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(140, 144, 126, 0.2)',
      borderTop: '3px solid #8C907E',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

export const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
