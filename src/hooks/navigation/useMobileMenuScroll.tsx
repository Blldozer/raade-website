// This is the right code for the hamburger implementation
import { useEffect, useRef } from 'react';

/**
 * Custom hook to manage scroll behavior when mobile menu is open
 * 
 * Handles:
 * - Locking body scroll when menu is open
 * - Storing and restoring scroll position
 * - Properly handling scrollbar width to prevent layout shift
 * - Returns a reference for the scrollable content area
 * 
 * @param isOpen - Whether the mobile menu is currently open
 * @returns - Object containing the content reference for the scrollable area
 */
export const useMobileMenuScroll = (isOpen: boolean) => {
  // Create a ref for the scrollable content area
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Store the current scroll position at the time the effect runs
    const scrollPosition = window.scrollY;
    
    if (isOpen) {
      console.log("Mobile menu opened - locking body scroll at position:", scrollPosition);
      
      // Scroll to top BEFORE locking to ensure menu is visible
      window.scrollTo(0, 0);
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = '0';  // Fixed to top, not negative scroll position
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Store the scroll position as a data attribute for restoration later
      document.body.setAttribute('data-scroll-position', scrollPosition.toString());
      
      // Restore proper padding to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Only unlock if we were previously locked
      if (document.body.style.position === 'fixed') {
        console.log("Mobile menu closed - restoring scroll");
        
        // Get stored scroll position
        const storedPosition = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
        
        // Remove styles first
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Now restore scroll position
        window.scrollTo({
          top: storedPosition,
          behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent visible jump
        });
        
        // Clean up data attribute
        document.body.removeAttribute('data-scroll-position');
      }
    }
    
    return () => {
      // Cleanup in case component unmounts while menu is open
      if (document.body.style.position === 'fixed') {
        // Get stored scroll position before cleanup
        const storedPosition = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
        
        // Remove styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll
        window.scrollTo(0, storedPosition);
        document.body.removeAttribute('data-scroll-position');
      }
    };
  }, [isOpen]);
  
  // Return the ref for the content area
  return { contentRef };
};
