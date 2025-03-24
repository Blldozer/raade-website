
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Scrolls to the top of the page when the route changes
 * - Watches for location changes using React Router
 * - Automatically scrolls to top on navigation
 * - Preserves smooth scrolling behavior
 * 
 * @param children - Child components to render
 */
interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
