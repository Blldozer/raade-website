
/**
 * Navigation background utility functions
 * Contains helper functions for background detection and management
 */

/**
 * Throttle helper function to limit how often a function can run
 * Improves performance by preventing excessive calculations during scroll
 */
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Determine if a page should use dark navbar by default
 * Based on the page path and whether it contains dark background elements
 * 
 * @param pathname Current route pathname
 */
export const shouldUseDarkNavbar = (pathname: string): boolean => {
  return (
    pathname === '/about' ||
    pathname === '/conference/register' ||
    pathname.includes('/projects/') ||
    pathname.includes('/studios') || // Studios pages use dark navbar
    pathname === '/' || // Main homepage uses dark navbar due to hero section
    pathname === ''     // Also handle empty path case
  );
};

/**
 * Determine if a page should use light navbar (white text) by default
 * These pages have dark backgrounds that require light text for contrast
 * 
 * @param pathname Current route pathname
 */
export const shouldUseLightNavbar = (pathname: string): boolean => {
  const isIndexPage = pathname === '/' || pathname === '';
  const isApplicationPage = 
    pathname.includes('/studios/apply') || 
    pathname.includes('/studios/partner');
  const isStudioPage = pathname.includes('/studios');
  const isConferencePage = pathname.includes('/conference');
  
  return isIndexPage || isApplicationPage || isStudioPage || isConferencePage;
};

/**
 * Determine if a page should maintain a fixed navbar style
 * regardless of scroll position
 * 
 * Studio application pages should have fixed navbar styling
 */
export const hasFixedNavbarStyle = (pathname: string): boolean => {
  return (
    pathname.includes('/studios/apply') || 
    pathname.includes('/studios/partner')
  );
};
