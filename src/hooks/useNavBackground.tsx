import { useEffect, useRef } from 'react';
import { useSectionMarkers } from './navigation/useSectionMarkers';

/**
 * Main hook to manage navigation background color based on current scroll position
 * This is a compositor hook that combines multiple smaller hooks for better maintainability
 * 
 * @param initialBackground - The initial background to use ('light' or 'dark')
 */
export function useNavBackground(initialBackground: 'light' | 'dark' = 'light') {
  const { isMounted } = useSectionMarkers();
  const prevBackground = useRef(initialBackground);

  useEffect(() => {
    // Set initial background
    document.body.setAttribute('data-nav-background', initialBackground);
    
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, [initialBackground]);

  return { currentBackground: initialBackground };
}
