
import { useEffect, useLayoutEffect } from 'react';

// Throttle helper function to limit how often a function can run
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Hook to manage navigation background color based on current scroll position
 * Sets appropriate data-nav-background attribute on document.body
 * Designed to work with both dark and light background sections
 */
export const useNavBackground = (initialBackground: 'light' | 'dark' = 'light') => {
  // Use layout effect to set initial background before first paint
  useLayoutEffect(() => {
    // Set initial background immediately to prevent flash of incorrect navbar style
    document.body.setAttribute('data-nav-background', initialBackground);
  }, [initialBackground]);

  useEffect(() => {
    // Mark sections with data attributes for light/dark backgrounds
    document.querySelectorAll('#hero, #transition-hook').forEach(section => {
      section.setAttribute('data-background', 'dark');
    });
    
    // For the Innovation Studios hero section, specifically set to light
    document.querySelectorAll('.min-h-screen[data-background="light"]').forEach(section => {
      section.setAttribute('data-background', 'light');
    });
    
    document.querySelectorAll('#conference-promo, #transition-stat, #future-showcase, #join').forEach(section => {
      section.setAttribute('data-background', 'light');
    });

    // Cache section positions to avoid recalculating on every scroll
    let sectionPositions: {top: number; bottom: number; background: string}[] = [];
    
    // Function to calculate and cache section positions
    const calculateSectionPositions = () => {
      sectionPositions = [];
      document.querySelectorAll('section, div[data-background]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollY = window.scrollY;
        sectionPositions.push({
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          background: section.getAttribute('data-background') || 'light'
        });
      });
    };
    
    // Initial calculation
    calculateSectionPositions();
    
    // Recalculate on resize but throttle to avoid performance issues
    const handleResize = throttle(() => {
      calculateSectionPositions();
    }, 200);

    // Setup background detection for navigation
    const updateNavBackground = () => {
      const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
      let currentBackground: 'light' | 'dark' = initialBackground; // Use the initial background as default
      
      // Use cached positions instead of querying DOM on each scroll
      for (const section of sectionPositions) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          // Type safety: ensure we only assign valid values
          currentBackground = section.background === 'dark' ? 'dark' : 'light';
          break;
        }
      }
      
      // Only update if the background has changed
      if (document.body.getAttribute('data-nav-background') !== currentBackground) {
        document.body.setAttribute('data-nav-background', currentBackground);
      }
    };
    
    // Initial update
    updateNavBackground();
    
    // Throttled scroll handler to reduce CPU usage
    const throttledScrollHandler = throttle(updateNavBackground, 100);
    
    // Update navigation background on scroll
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', handleResize);
    };
  }, [initialBackground]);
};
