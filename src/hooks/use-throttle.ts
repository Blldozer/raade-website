import { useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRun = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastRun.current && now - lastRun.current < delay) {
        // If timeoutRef.current is set, we already have a call scheduled
        if (timeoutRef.current) return;

        // Schedule a call for after the delay has passed
        timeoutRef.current = setTimeout(() => {
          lastRun.current = Date.now();
          callback(...args);
          timeoutRef.current = null;
        }, delay - (now - lastRun.current));
        return;
      }

      lastRun.current = now;
      callback(...args);
    },
    [callback, delay]
  );
};