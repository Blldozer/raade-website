
import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll direction for showing/hiding navbar
 * Enhanced with proper SSR handling
 */
export const useScrollDirection = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  useEffect(() => {
    // Skip in SSR environment
    if (typeof window === 'undefined') return;
    
    const controlNavbar = () => {
      // Get current scroll position
      const currentScrollY = window.scrollY;
      
      // Navbar visibility logic:
      // 1. Always show at top of page (within first 100px)
      // 2. Show when scrolling up
      // 3. Hide when scrolling down (past threshold)
      const scrollingUp = currentScrollY < lastScrollY;
      const atPageTop = currentScrollY < 100;
      
      if (atPageTop || scrollingUp) {
        setIsNavbarVisible(true);
      } else {
        // Only hide navbar after scrolling down a certain threshold (50px)
        const scrollThreshold = 50;
        if (currentScrollY - lastScrollY > scrollThreshold) {
          setIsNavbarVisible(false);
        }
      }
      
      // Update scroll position
      setLastScrollY(currentScrollY);
    };
    
    // Throttle scroll events for better performance
    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(controlNavbar, 100);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize with current scroll position
    setLastScrollY(window.scrollY);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);
  
  return { isNavbarVisible };
};
