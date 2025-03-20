
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
 * @param pathname Current route pathname
 */
export const shouldUseDarkNavbar = (pathname: string): boolean => {
  return (
    pathname === '/about' ||
    pathname === '/conference/register' ||
    pathname.includes('/projects/')
  );
};

/**
 * Determine if a page should use light navbar (white text) by default
 * @param pathname Current route pathname
 */
export const shouldUseLightNavbar = (pathname: string): boolean => {
  const isIndexPage = pathname === '/' || pathname === '';
  const isApplicationPage = 
    pathname.includes('/studios/apply') || 
    pathname.includes('/studios/partner');
  
  return isIndexPage || isApplicationPage;
};

/**
 * Determine if a page should maintain a fixed navbar style
 * regardless of scroll position
 * 
 * Conference pages should now have transparent navbar at the top
 * and only apply special styling when scrolled
 */
export const hasFixedNavbarStyle = (pathname: string): boolean => {
  // We've removed conference pages from this list as they should now 
  // have transparent navbar at the top
  return (
    pathname.includes('/studios/apply') || 
    pathname.includes('/studios/partner')
  );
};
