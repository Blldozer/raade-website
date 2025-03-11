import { useEffect } from 'react';

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

export const useNavBackground = () => {
  useEffect(() => {
    // Mark sections with data attributes for light/dark backgrounds
    document.querySelectorAll('#hero, #transition-hook').forEach(section => {
      section.setAttribute('data-background', 'dark');
    });
    
    document.querySelectorAll('#conference-promo, #transition-stat, #future-showcase, #join').forEach(section => {
      section.setAttribute('data-background', 'light');
    });

    // Cache section positions to avoid recalculating on every scroll
    let sectionPositions: {top: number; bottom: number; background: string}[] = [];
    
    // Function to calculate and cache section positions
    const calculateSectionPositions = () => {
      sectionPositions = [];
      document.querySelectorAll('section').forEach(section => {
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
      let currentBackground = 'dark'; // Default to dark (for hero section)
      
      // Use cached positions instead of querying DOM on each scroll
      for (const section of sectionPositions) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          currentBackground = section.background;
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
  }, []);
};
