
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to track scroll direction and visibility state
 * 
 * @returns Object with navbar visibility state
 */
export const useScrollDirection = () => {
  // Manage navbar visibility based on scroll direction
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  // Store the last scroll position to determine scroll direction
  const lastScrollY = useRef(0);
  
  // Handle scroll to control navbar visibility
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show navbar when scrolling up, hide when scrolling down
    // But always show when at the top of the page
    if (currentScrollY <= 0) {
      setIsNavbarVisible(true);
    } else if (currentScrollY < lastScrollY.current) {
      setIsNavbarVisible(true); // Scrolling up
    } else if (currentScrollY > lastScrollY.current) {
      setIsNavbarVisible(false); // Scrolling down
    }
    
    lastScrollY.current = currentScrollY;
  }, []);
  
  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return { isNavbarVisible };
};
