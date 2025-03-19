import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook to handle navigation with section scrolling
 * 
 * Provides:
 * - Proper handling of hash-based navigation
 * - Cross-page section navigation
 * - Event handling for navigation links
 * - Smooth scrolling to page top for main navigation items
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  /**
   * Handle navigation with proper section scrolling behavior
   * 
   * @param href - The target URL to navigate to
   */
  const handleNavigation = (href: string) => {
    // Parse the URL and hash
    const hasHash = href.includes('#');
    const [path, hash] = hasHash ? href.split('#') : [href, ''];
    const basePath = path === "" ? "/" : path;
    const isSamePage = location.pathname === basePath || 
                      (location.pathname === "/" && basePath === "/");
    
    console.log(`Navigation request: ${href} (path: ${basePath}, hash: ${hash}, isSamePage: ${isSamePage})`);
    
    if (isSamePage && hash) {
      // If we're on the same page, just scroll to the element
      console.log(`Scrolling to section #${hash} on current page`);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element #${hash} not found on current page`);
        }
      }, 100);
    } else if (hasHash) {
      // If we're navigating to a different page with a hash, use state
      console.log(`Navigating to ${basePath} with scrollToSection=${hash}`);
      navigate(basePath, { 
        state: { scrollToSection: hash }
      });
    } else {
      // Regular navigation to a page root (hero section)
      console.log(`Regular navigation to ${href} (top of page)`);
      navigate(basePath);
      
      // Scroll to top after navigation
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  };
  
  return { handleNavigation };
};
