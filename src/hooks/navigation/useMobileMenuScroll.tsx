
import { useEffect } from "react";

/**
 * Custom hook to manage scroll behavior when mobile menu is open
 * 
 * Handles:
 * - Locking body scroll when menu is open
 * - Storing and restoring scroll position
 * - Properly handling scrollbar width to prevent layout shift
 * 
 * @param isOpen - Whether the mobile menu is currently open
 */
export const useMobileMenuScroll = (isOpen: boolean) => {
  useEffect(() => {
    let scrollY = 0;
    
    if (isOpen) {
      console.log("Mobile menu opened - locking body scroll");
      // Store the current scroll position
      scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Restore proper padding to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Only unlock if we were previously locked
      if (document.body.style.position === 'fixed') {
        console.log("Mobile menu closed - restoring scroll");
        
        // Remove styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      }
    }
    
    return () => {
      // Cleanup in case component unmounts while menu is open
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen]);
};
