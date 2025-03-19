
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Throttle helper function to limit how often a function can run
 * Improves performance by preventing excessive calculations during scroll
 */
const throttle = (func: Function, limit: number) => {
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
 * Hook to manage navigation background color based on current scroll position
 * Sets appropriate data-nav-background attribute on document.body
 * 
 * Enhanced with:
 * - Instance tracking to prevent duplicate event listeners
 * - Better cleanup of event listeners and DOM attributes
 * - Improved error handling
 */
export const useNavBackground = (initialBackground: 'light' | 'dark' = 'light') => {
  // Generate unique instance ID for this hook usage
  const instanceId = useRef(`nav-bg-${Math.random().toString(36).substring(2, 9)}`);
  
  // Track if this hook instance is mounted to prevent memory leaks
  const isMounted = useRef(true);
  
  // Store scroll handler reference for proper cleanup
  const scrollHandlerRef = useRef<any>(null);
  const resizeHandlerRef = useRef<any>(null);
  
  // Get the current location from react-router
  const location = useLocation();
  const pathname = location.pathname;
  
  // Use layout effect to set initial background before first paint
  // This ensures the navbar has proper contrast immediately on page load
  useLayoutEffect(() => {
    try {
      console.log(`useNavBackground (${instanceId.current}): Initializing for ${pathname}`);
      
      // For index page, we always want to start with light navbar (over dark hero)
      const isIndexPage = pathname === '/' || pathname === '';
      const isApplicationPage = pathname.includes('/studios/apply') || 
                                pathname.includes('/studios/partner');
      const isAboutPage = pathname === '/about';
      
      // Set appropriate background based on page type
      if (isIndexPage) {
        // Force light navbar for index page hero section
        document.body.setAttribute('data-nav-background', 'light');
        console.log(`useNavBackground (${instanceId.current}): Set to light for index page`);
      } else if (isApplicationPage) {
        // Force light navbar for application pages with dark backgrounds
        document.body.setAttribute('data-nav-background', 'light');
        console.log(`useNavBackground (${instanceId.current}): Set to light for application page`);
      } else if (isAboutPage) {
        // For About page, we start with dark background (light navbar)
        document.body.setAttribute('data-nav-background', 'dark');
        console.log(`useNavBackground (${instanceId.current}): Set to dark for about page`);
      } else {
        // For other pages, use the provided initial background
        document.body.setAttribute('data-nav-background', initialBackground);
        console.log(`useNavBackground (${instanceId.current}): Set to ${initialBackground} for other page`);
      }
    } catch (error) {
      console.error(`useNavBackground (${instanceId.current}) layout effect error:`, error);
    }
    
    return () => {
      // Mark as unmounted to prevent updates after cleanup
      isMounted.current = false;
    };
  }, [initialBackground, pathname]);

  useEffect(() => {
    try {
      console.log(`useNavBackground (${instanceId.current}): Setting up sections for ${pathname}`);
      
      // Mark sections with data attributes for light/dark backgrounds
      // DARK BACKGROUND SECTIONS (use light navbar)
      document.querySelectorAll('#hero, #transition-hook, #transition-stat').forEach(section => {
        section.setAttribute('data-background', 'dark');
      });
      
      // Set Innovation Studios hero to dark background for correct navbar display
      document.querySelectorAll('.innovation-studios-hero').forEach(section => {
        section.setAttribute('data-background', 'dark');
      });
      
      // Set About page hero section to dark background
      document.querySelectorAll('.about-hero-section').forEach(section => {
        section.setAttribute('data-background', 'dark');
      });
      
      // LIGHT BACKGROUND SECTIONS (use dark navbar)
      document.querySelectorAll('#conference-promo, #future-showcase, #join').forEach(section => {
        section.setAttribute('data-background', 'light');
      });

      // About page content sections (with light backgrounds)
      document.querySelectorAll('.about-content-section').forEach(section => {
        section.setAttribute('data-background', 'light');
      });
      
      // For the Innovation Studios hero section, specifically set to light
      document.querySelectorAll('.min-h-screen[data-background="light"]').forEach(section => {
        section.setAttribute('data-background', 'light');
      });

      // Cache section positions to avoid recalculating on every scroll
      let sectionPositions: {top: number; bottom: number; background: string}[] = [];
      
      // Function to calculate and cache section positions
      const calculateSectionPositions = () => {
        try {
          if (!isMounted.current) return;
          
          sectionPositions = [];
          document.querySelectorAll('section, div[data-background]').forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrollY = window.scrollY;
            sectionPositions.push({
              top: rect.top + scrollY,
              bottom: rect.bottom + scrollY,
              background: section.getAttribute('data-background') || 'light'
            });
          });
        } catch (error) {
          console.error(`useNavBackground (${instanceId.current}) error calculating positions:`, error);
        }
      };
      
      // Initial calculation
      calculateSectionPositions();
      
      // Recalculate on resize but throttle to avoid performance issues
      const handleResize = throttle(() => {
        if (!isMounted.current) return;
        calculateSectionPositions();
      }, 200);

      // Special handling for About page - make sure the dark background is set
      const isAboutPage = pathname === '/about';
      if (isAboutPage) {
        document.body.setAttribute('data-nav-background', 'dark');
      }

      // Setup background detection for navigation
      const updateNavBackground = () => {
        try {
          // Skip if component unmounted
          if (!isMounted.current) return;
          
          // Skip background calculation for application pages - always use light navbar
          const isApplicationPage = pathname.includes('/studios/apply') || 
                                   pathname.includes('/studios/partner');
          
          if (isApplicationPage) {
            document.body.setAttribute('data-nav-background', 'light');
            return;
          }
          
          // Special handling for About page
          const isAboutPage = pathname === '/about';
          if (isAboutPage && document.body.getAttribute('data-nav-background') !== 'dark') {
            document.body.setAttribute('data-nav-background', 'dark');
          }
          
          const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
          let currentBackground = initialBackground;
          
          // Use cached positions instead of querying DOM on each scroll
          for (const section of sectionPositions) {
            if (scrollPosition >= section.top && scrollPosition < section.bottom) {
              // Type safety: ensure we only assign valid values
              if (section.background === 'dark' || section.background === 'light') {
                currentBackground = section.background;
              }
              break;
            }
          }
          
          // Only update if the background has changed and component is still mounted
          if (isMounted.current) {
            const currentAttr = document.body.getAttribute('data-nav-background');
            if (currentAttr !== currentBackground) {
              document.body.setAttribute('data-nav-background', currentBackground);
            }
          }
        } catch (error) {
          console.error(`useNavBackground (${instanceId.current}) update error:`, error);
        }
      };
      
      // Initial update on component mount
      updateNavBackground();
      
      // Throttled scroll handler to reduce CPU usage
      const throttledScrollHandler = throttle(updateNavBackground, 100);
      
      // Store handlers in refs for proper cleanup
      scrollHandlerRef.current = throttledScrollHandler;
      resizeHandlerRef.current = handleResize;
      
      // Update navigation background on scroll
      window.addEventListener('scroll', throttledScrollHandler, { passive: true });
      window.addEventListener('resize', handleResize);
      
      console.log(`useNavBackground (${instanceId.current}): Attached scroll and resize listeners`);
      
      return () => {
        // Set mounted flag to false to prevent updates after unmount
        isMounted.current = false;
        
        // Clean up event listeners
        if (scrollHandlerRef.current) {
          window.removeEventListener('scroll', scrollHandlerRef.current);
        }
        
        if (resizeHandlerRef.current) {
          window.removeEventListener('resize', resizeHandlerRef.current);
        }
        
        console.log(`useNavBackground (${instanceId.current}): Removed scroll and resize listeners`);
        
        // In some cases, we want to persist the background attribute for page transitions
        // Only remove it if we're not on the about page
        const isAboutPage = pathname === '/about';
        if (!isAboutPage) {
          try {
            document.body.removeAttribute('data-nav-background');
            console.log(`useNavBackground (${instanceId.current}): Cleaned up nav background attribute`);
          } catch (error) {
            console.error(`useNavBackground (${instanceId.current}) cleanup error:`, error);
          }
        }
      };
    } catch (error) {
      console.error(`useNavBackground (${instanceId.current}) critical error:`, error);
      return () => {
        isMounted.current = false;
      };
    }
  }, [initialBackground, pathname, instanceId]);
};
