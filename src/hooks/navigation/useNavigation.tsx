
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook to handle navigation with section scrolling
 * 
 * Provides:
 * - Proper handling of hash-based navigation
 * - Cross-page section navigation
 * - Event handling for navigation links
 * - Smooth scrolling to page top for main navigation items
 * - Consistent handling of 'join' section navigation
 * - Error handling for router context issues
 */
export const useNavigation = () => {
  try {
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
      
      // Special handling for join section navigation - always navigate to the index page and scroll to join
      if (hash === 'join') {
        if (location.pathname === '/') {
          // If we're already on the index page, just scroll to the join section
          console.log("Navigation: Already on index page, scrolling to join section");
          setTimeout(() => {
            const joinSection = document.getElementById('join');
            if (joinSection) {
              joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              console.warn("Navigation: Couldn't find join section element");
            }
          }, 100);
        } else {
          // If we're on a different page, navigate to index with scrollToJoin state
          console.log("Navigation: Not on index page, navigating with scrollToJoin state");
          navigate('/', { state: { scrollToJoin: true } });
        }
        return;
      }
      
      // Check if this is one of the main navigation links
      const isMainNavLink = ['/about', '/studios', '/conference'].includes(href);
      
      if (isMainNavLink) {
        // Direct navigation to main sections - always go to top of page
        console.log(`Main nav link clicked: ${href} - going to top of page`);
        navigate(href);
        
        // Ensure we're at the top of the page
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
        return;
      }
      
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
        // Regular navigation to a page root
        console.log(`Regular navigation to ${href} (top of page)`);
        navigate(basePath);
        
        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }
    };
    
    return { handleNavigation };
  } catch (error) {
    console.error("useNavigation: Error initializing - router context may be missing", error);
    
    // Provide a fallback implementation that doesn't use router hooks
    return {
      handleNavigation: (href: string) => {
        console.warn("useNavigation: Using fallback navigation to", href);
        // Simple fallback that uses window.location
        window.location.href = href;
      }
    };
  }
};

export default useNavigation;
