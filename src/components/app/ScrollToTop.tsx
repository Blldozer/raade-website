
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Scrolls to the top of the page when the route changes
 * - Watches for location changes using React Router
 * - Automatically scrolls to top on navigation
 * - Preserves smooth scrolling behavior
 * - Must be used inside Router context (BrowserRouter)
 * - Enhanced with proper router context error handling
 * 
 * @param children - Child components to render
 */
interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  // Safe router context check - will help with debugging
  const isRouterAvailable = typeof window !== 'undefined' && 
    window.location && 
    document && 
    document.querySelector('[data-reactroot]');
  
  try {
    // Get current location from React Router - will throw if no router context
    const { pathname } = useLocation();
    
    // When pathname changes, scroll to top
    useEffect(() => {
      console.log("ScrollToTop: Path changed to", pathname);
      try {
        // Use smooth scrolling for better user experience
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for older browsers that don't support smooth scrolling
        console.warn("Smooth scrolling not supported, using instant scroll");
        window.scrollTo(0, 0);
      }
    }, [pathname]);
    
    // Render children normally if everything worked
    return <>{children}</>;
  } catch (error) {
    // If we hit an error during hook usage, log it and return children anyway
    console.error("ScrollToTop: Error using router hooks - is this component inside a Router?", error);
    
    if (!isRouterAvailable) {
      console.warn("ScrollToTop: Router context not detected. Make sure this component is used inside BrowserRouter.");
    }
    
    // Render children even if ScrollToTop functionality fails
    return <>{children}</>;
  }
};

export default ScrollToTop;
