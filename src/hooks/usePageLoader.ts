import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function usePageLoader(showOnShallow = false) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (_: string, { shallow }: { shallow?: boolean }) => {
      if (showOnShallow || !shallow) {
        setIsLoading(true);
      }
    };
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, showOnShallow]);

  return isLoading;
}
