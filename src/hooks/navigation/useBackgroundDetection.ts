
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  shouldUseDarkNavbar, 
  shouldUseLightNavbar,
  hasFixedNavbarStyle, 
  throttle 
} from './useNavBackgroundUtils';

interface BackgroundDetectionProps {
  initialBackground?: 'light' | 'dark';
  sectionPositions: { top: number; bottom: number; background: string }[];
}

/**
 * Hook to detect and manage the current background state for navigation
 * Handles scroll events and updates the document body with the current state
 */
export const useBackgroundDetection = ({ 
  initialBackground = 'light',
  sectionPositions 
}: BackgroundDetectionProps) => {
  const [currentBackground, setCurrentBackground] = useState<'light' | 'dark'>(initialBackground);
  const location = useLocation();
  const pathname = location.pathname;
  
  // Track if this hook instance is mounted
  const isMounted = useRef(true);
  
  // Store scroll handler reference for proper cleanup
  const scrollHandlerRef = useRef<any>(null);
  
  // Initial background setup
  useEffect(() => {
    try {
      console.log(`useBackgroundDetection: Initializing for ${pathname}`);
      
      // Set appropriate background based on page type
      if (shouldUseLightNavbar(pathname)) {
        // Force light navbar for pages with dark backgrounds
        document.body.setAttribute('data-nav-background', 'light');
        setCurrentBackground('light');
        console.log(`useBackgroundDetection: Set to light for ${pathname}`);
      } else if (shouldUseDarkNavbar(pathname)) {
        // Force dark navbar for pages with light backgrounds
        document.body.setAttribute('data-nav-background', 'dark');
        setCurrentBackground('dark');
        console.log(`useBackgroundDetection: Set to dark for ${pathname}`);
      } else {
        // For other pages, use the provided initial background
        document.body.setAttribute('data-nav-background', initialBackground);
        setCurrentBackground(initialBackground);
        console.log(`useBackgroundDetection: Set to ${initialBackground} for other page`);
      }
    } catch (error) {
      console.error(`useBackgroundDetection initial setup error:`, error);
    }
  }, [initialBackground, pathname]);

  // Background detection based on scroll position
  useEffect(() => {
    // Skip background calculation for pages with fixed navbar style
    if (hasFixedNavbarStyle(pathname)) {
      return;
    }
    
    const updateNavBackground = () => {
      try {
        // Skip if component unmounted
        if (!isMounted.current) return;
        
        const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
        let detectedBackground: 'light' | 'dark' = initialBackground;
        
        // Use cached positions instead of querying DOM on each scroll
        for (const section of sectionPositions) {
          if (scrollPosition >= section.top && scrollPosition < section.bottom) {
            // Type safety: ensure we only assign valid values
            if (section.background === 'dark' || section.background === 'light') {
              detectedBackground = section.background as 'light' | 'dark';
            }
            break;
          }
        }
        
        // Only update if the background has changed and component is still mounted
        if (isMounted.current) {
          const currentAttr = document.body.getAttribute('data-nav-background');
          if (currentAttr !== detectedBackground) {
            document.body.setAttribute('data-nav-background', detectedBackground);
            setCurrentBackground(detectedBackground);
          }
        }
      } catch (error) {
        console.error(`useBackgroundDetection update error:`, error);
      }
    };
    
    // Throttled scroll handler to reduce CPU usage
    const throttledScrollHandler = throttle(updateNavBackground, 100);
    
    // Store handler in ref for proper cleanup
    scrollHandlerRef.current = throttledScrollHandler;
    
    // Update navigation background on scroll
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Initial update
    updateNavBackground();
    
    return () => {
      // Clean up event listeners
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, [initialBackground, pathname, sectionPositions]);
  
  // Cleanup attribute on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      
      // Only clean up on unmount for non-special pages
      if (!shouldUseDarkNavbar(pathname) && !shouldUseLightNavbar(pathname)) {
        try {
          document.body.removeAttribute('data-nav-background');
          console.log(`useBackgroundDetection: Cleaned up nav background attribute`);
        } catch (error) {
          console.error(`useBackgroundDetection cleanup error:`, error);
        }
      }
    };
  }, [pathname]);
  
  return { currentBackground };
};
