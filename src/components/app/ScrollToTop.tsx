
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * ScrollToTop component
 * Handles scroll restoration and navigation to hash links
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ScrollToTop: Pathname changed to", pathname);
    
    // If no hash is present, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Handle anchor links after the page has fully loaded
    const scrollToElement = () => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        console.log("ScrollToTop: Scrolling to element", hash);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If element not found, scroll to top as fallback
        console.log("ScrollToTop: Element not found, scrolling to top");
        window.scrollTo(0, 0);
      }
    };

    // Small delay to ensure the DOM is fully loaded
    setTimeout(scrollToElement, 100);

  }, [pathname, hash, navigate]);

  return null;
};

export default ScrollToTop;
