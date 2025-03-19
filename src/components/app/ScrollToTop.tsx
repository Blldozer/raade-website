
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * ScrollToTop component
 * Handles scroll restoration and navigation to hash links
 * 
 * Features:
 * - Automatically scrolls to top when navigating to a new page
 * - Supports smooth scrolling to sections identified by hash fragments
 * - Includes console logging for easier debugging
 * - Handles cases where elements may not be immediately available
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ScrollToTop: Pathname changed to", pathname, "with hash", hash);
    
    // If no hash is present, scroll to top
    if (!hash) {
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
    setTimeout(scrollToElement, 100);

  }, [pathname, hash, navigate]);

  return null;
};

export default ScrollToTop;
