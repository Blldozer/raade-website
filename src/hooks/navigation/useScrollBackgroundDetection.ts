
import { useState, useEffect, useRef } from 'react';
import { throttle } from './useNavBackgroundUtils';

interface UseScrollBackgroundDetectionProps {
  sectionPositions: { top: number; bottom: number; background: string }[];
  initialBackground: 'light' | 'dark';
  isEnabled: boolean;
}

/**
 * Hook to detect background changes based on scroll position
 * Monitors which section is currently in view and returns the appropriate background
 */
export const useScrollBackgroundDetection = ({
  sectionPositions,
  initialBackground,
  isEnabled
}: UseScrollBackgroundDetectionProps) => {
  const [scrollBackground, setScrollBackground] = useState<'light' | 'dark'>(initialBackground);
  const isMounted = useRef(true);
  const scrollHandlerRef = useRef<any>(null);
  
  // Background detection based on scroll position
  useEffect(() => {
    // Skip if scroll detection is disabled
    if (!isEnabled) return;
    
    const updateScrollBackground = () => {
      try {
        // Skip if component unmounted
        if (!isMounted.current) return;
        
        const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
        let detectedBackground: 'light' | 'dark' = initialBackground;
        
        // Use cached positions instead of querying DOM on each scroll
        for (const section of sectionPositions) {
          if (scrollPosition >= section.top && scrollPosition < section.bottom) {
            if (section.background === 'dark' || section.background === 'light') {
              detectedBackground = section.background as 'light' | 'dark';
            }
            break;
          }
        }
        
        // Only update if the component is still mounted
        if (isMounted.current && detectedBackground !== scrollBackground) {
          setScrollBackground(detectedBackground);
        }
      } catch (error) {
        console.error(`useScrollBackgroundDetection update error:`, error);
      }
    };
    
    // Throttled scroll handler to reduce CPU usage
    const throttledScrollHandler = throttle(updateScrollBackground, 100);
    scrollHandlerRef.current = throttledScrollHandler;
    
    // Update navigation background on scroll
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Initial update
    updateScrollBackground();
    
    return () => {
      // Clean up event listeners
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, [initialBackground, isEnabled, sectionPositions, scrollBackground]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return scrollBackground;
};
