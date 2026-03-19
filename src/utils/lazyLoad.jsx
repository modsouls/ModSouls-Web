import { lazy, Suspense } from 'react';
import { PageSkeleton } from '../components/LoadingSkeleton';

const LoadingFallback = () => (
  <PageSkeleton />
);

export const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(() =>
    importFunc().catch((err) => {
      const message = err?.message || '';
      const isChunkError =
        /Loading chunk|ChunkLoadError|Failed to fetch dynamically imported module/i.test(message);
      if (isChunkError && typeof window !== 'undefined') {
        const key = 'modsouls_chunk_reload';
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, '1');
          window.location.reload();
        }
      }
      throw err;
    })
  );
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
