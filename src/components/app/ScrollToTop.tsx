
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
 * 
 * @param children - Child components to render
 */
interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  // Get current location from React Router
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

  return <>{children}</>;
};

export default ScrollToTop;
