
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children?: React.ReactNode;
}

/**
 * ScrollToTop component
 * 
 * Scrolls to the top of the page on route changes
 * Also handles navigation to specific sections using URL hash or location state
 */
const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // Handle basic scrolling to top on route change
    if (!hash) {
      window.scrollTo(0, 0);
    }

    // Handle hash navigation
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Handle scrollToSection from state (used in some components)
    if (state && state.scrollToSection) {
      setTimeout(() => {
        const section = document.getElementById(state.scrollToSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Handle scrollToJoin state specifically (used by the navigation)
    if (state && state.scrollToJoin) {
      setTimeout(() => {
        const joinSection = document.getElementById('join');
        if (joinSection) {
          joinSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash, state]);

  return <>{children}</>;
};

export default ScrollToTop;
