import { useState, useEffect } from 'react';
import { useResponsive } from './useResponsive';
import { useSectionTransitions } from './useSectionTransitions';
import { useSafeHook } from '@/utils/reactContextError';

/**
 * Custom hook for Index page functionality
 * Centralizes initialization of page-specific state and effects
 * Enhanced with better React hook error handling
 */
export function useIndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({ success: true });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
}

export default useIndexPage;
