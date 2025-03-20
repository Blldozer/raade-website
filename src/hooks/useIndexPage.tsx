
import { useEffect, useLayoutEffect } from 'react';
import { useSectionTransitions } from "@/hooks/useSectionTransitions";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocation } from 'react-router-dom';
import { useNavBackground } from "@/hooks/useNavBackground";

/**
 * Custom hook to handle Index page initialization and behavior
 * 
 * Manages:
 * - Section transitions
 * - Navigation background settings
 * - Scroll behavior for direct section navigation
 * - Performance optimizations
 */
export const useIndexPage = () => {
  // Use our optimized hook for section transitions
  useSectionTransitions();
  const { isMobile } = useResponsive();
  const location = useLocation();
  
  // Use the hook to manage navbar background colors based on section visibility
  // Initialize with 'light' since the hero section has a dark background
  useNavBackground('light');
  
  // Set initial background state before any scroll happens
  useLayoutEffect(() => {
    try {
      // Force light navbar for index page hero section
      document.body.setAttribute('data-nav-background', 'light');
      
      // Log initialization for debugging purposes
      console.log("Index page initialized, nav background set to light");
    } catch (error) {
      console.error("Error in Index layout effect:", error);
    }
  }, []);
  
  useEffect(() => {
    try {
      console.log("Index page mount effect running");
      
      // Add passive:true to touch events for better scroll performance
      const options = {
        passive: true
      };
      
      const noopHandler = () => {};
      
      document.addEventListener('touchstart', noopHandler, options);
      document.addEventListener('touchmove', noopHandler, options);
      
      // Set performance hint for the browser
      if ('contentVisibilityAutoStateChange' in document.documentElement.style) {
        document.documentElement.style.contentVisibility = 'auto';
      }
      
      // Log for debugging
      console.log("Index page event listeners attached");
      
      return () => {
        document.removeEventListener('touchstart', noopHandler);
        document.removeEventListener('touchmove', noopHandler);
        document.body.removeAttribute('data-nav-background');
        console.log("Index page cleanup completed");
      };
    } catch (error) {
      console.error("Error in Index effect:", error);
    }
  }, []);
  
  // Handle scrolling to the join section when navigating from another page
  useEffect(() => {
    try {
      console.log("Index scroll effect running with location:", location);
      
      const handleScrollToJoin = () => {
        // Small delay to ensure the section is rendered
        const timer = setTimeout(() => {
          const joinSection = document.getElementById('join');
          if (joinSection) {
            console.log("Index page: Scrolling to join section");
            joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.warn("Index page: Join section element not found");
          }
        }, 500);
        
        return timer;
      };
      
      // Check location state for scroll target
      if (location.state && location.state.scrollToJoin) {
        console.log("Index page: scrollToJoin state detected");
        const timer = handleScrollToJoin();
        return () => clearTimeout(timer);
      }
      
      // Check if URL has #join hash
      if (window.location.hash === '#join') {
        console.log("Index page: #join hash detected in URL");
        const timer = handleScrollToJoin();
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Error in scroll effect:", error);
    }
  }, [location]);
  
  return { isMobile };
};

export default useIndexPage;
