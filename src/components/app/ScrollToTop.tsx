
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

/**
 * ScrollToTop component
 * Handles scroll restoration and navigation to hash links
 * 
 * Features:
 * - Automatically scrolls to top when navigating to a new page
 * - Supports smooth scrolling to sections identified by hash fragments
 * - Includes console logging for easier debugging
 * - Handles cases where elements may not be immediately available
 * - Special handling for 'join' section navigation
 */
const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname, hash, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ScrollToTop: Pathname changed to", pathname, "with hash", hash, "and state", state);
    
    // Handle location.state.scrollToJoin (for join section navigation)
    if (state && state.scrollToJoin && pathname === '/') {
      console.log("ScrollToTop: scrollToJoin state detected");
      setTimeout(() => {
        const joinElement = document.getElementById('join');
        if (joinElement) {
          console.log("ScrollToTop: Scrolling to join section");
          joinElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("ScrollToTop: Join section element not found");
        }
      }, 300);
      return;
    }
    
    // Handle location.state.scrollToSection (for other section navigation)
    if (state && state.scrollToSection) {
      console.log("ScrollToTop: scrollToSection state detected:", state.scrollToSection);
      setTimeout(() => {
        const element = document.getElementById(state.scrollToSection);
        if (element) {
          console.log(`ScrollToTop: Scrolling to ${state.scrollToSection} section`);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`ScrollToTop: Element #${state.scrollToSection} not found`);
        }
      }, 300);
      return;
    }
    
    // If no hash is present, scroll to top
    if (!hash) {
      console.log("ScrollToTop: No hash, scrolling to top");
      window.scrollTo(0, 0);
      return;
    }

    // Handle anchor links after the page has fully loaded
    const scrollToElement = () => {
      try {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          console.log("ScrollToTop: Scrolling to element", hash);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.log("ScrollToTop: Element not found for hash", hash);
          // If element not found, try again after a longer delay
          // This helps with dynamically rendered content
          setTimeout(() => {
            const retryElement = document.getElementById(hash.substring(1));
            if (retryElement) {
              retryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              // If still not found after retry, scroll to top as fallback
              console.log("ScrollToTop: Element not found after retry, scrolling to top");
              window.scrollTo(0, 0);
            }
          }, 500);
        }
      } catch (error) {
        console.error("ScrollToTop: Error scrolling to element", error);
        window.scrollTo(0, 0);
      }
    };

    // Small delay to ensure the DOM is fully loaded
    setTimeout(scrollToElement, 300);

  }, [pathname, hash, state, navigate]);

  return <>{children}</>;
};

export default ScrollToTop;
