import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll direction and control navbar visibility
 * 
 * Features:
 * - Tracks scroll direction (up/down)
 * - Hides navbar on scroll down, shows on scroll up
 * - Adds threshold to prevent navbar flashing during small scroll movements
 * - Maintains navbar visibility at top of page
 */
export function useScrollDirection() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    const scrollThreshold = 30; // Minimum scroll distance before changing navbar visibility
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at the top of the page
      if (currentScrollY < 20) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Determine if we should hide/show the navbar based on scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        // Scrolling down
        if (currentScrollY > lastScrollY) {
          setIsNavbarVisible(false);
        } 
        // Scrolling up
        else {
          setIsNavbarVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  return { isNavbarVisible };
}
