
import { useEffect, useLayoutEffect } from 'react';

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
 * Section background color mapping:
 * - Dark sections (blue/dark backgrounds): Hero, Transition Stat, Transition Hook
 * - Light sections (white/light backgrounds): Conference Promo, Future Showcase, Join
 * 
 * Navbar color mapping:
 * - When over dark sections: Light navbar (white text)
 * - When over light sections: Dark navbar (navy text)
 * 
 * Enhanced with better error handling and initialization checks
 */
export const useNavBackground = (initialBackground: 'light' | 'dark' = 'light') => {
  // Use layout effect to set initial background before first paint
  // This ensures the navbar has proper contrast immediately on page load
  useLayoutEffect(() => {
    try {
      // For index page, we always want to start with light navbar (over dark hero)
      const pathname = window.location.pathname;
      const isIndexPage = pathname === '/' || pathname === '';
      const isApplicationPage = pathname.includes('/studios/apply') || 
                                pathname.includes('/studios/partner');
      const isAboutPage = pathname === '/about';
      
      if (isIndexPage) {
        // Force light navbar for index page hero section
        document.body.setAttribute('data-nav-background', 'light');
      } else if (isApplicationPage) {
        // Force light navbar for application pages with dark backgrounds
        document.body.setAttribute('data-nav-background', 'light');
      } else if (isAboutPage) {
        // For About page, we start with dark background (light navbar)
        document.body.setAttribute('data-nav-background', 'dark');
      } else {
        // For other pages, use the provided initial background
        document.body.setAttribute('data-nav-background', initialBackground);
      }
      
      console.log("useNavBackground: Initial background set to", 
        isAboutPage ? 'dark' : (isIndexPage || isApplicationPage ? 'light' : initialBackground));
    } catch (error) {
      console.error("Error in useNavBackground layout effect:", error);
    }
  }, [initialBackground]);

  useEffect(() => {
    try {
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
          console.error("Error calculating section positions:", error);
        }
      };
      
      // Initial calculation
      calculateSectionPositions();
      
      // Recalculate on resize but throttle to avoid performance issues
      const handleResize = throttle(() => {
        calculateSectionPositions();
      }, 200);

      // Special handling for About page - make sure the dark background is set
      const isAboutPage = window.location.pathname === '/about';
      if (isAboutPage) {
        document.body.setAttribute('data-nav-background', 'dark');
      }

      // Setup background detection for navigation
      const updateNavBackground = () => {
        try {
          // Get current pathname
          const pathname = window.location.pathname;
          
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
          
          // Only update if the background has changed
          const currentAttr = document.body.getAttribute('data-nav-background');
          if (currentAttr !== currentBackground) {
            document.body.setAttribute('data-nav-background', currentBackground);
          }
        } catch (error) {
          console.error("Error updating navigation background:", error);
        }
      };
      
      // Initial update on component mount
      updateNavBackground();
      
      // Throttled scroll handler to reduce CPU usage
      const throttledScrollHandler = throttle(updateNavBackground, 100);
      
      // Update navigation background on scroll
      window.addEventListener('scroll', throttledScrollHandler);
      window.addEventListener('resize', handleResize);
      
      return () => {
        console.log("useNavBackground cleanup");
        window.removeEventListener('scroll', throttledScrollHandler);
        window.removeEventListener('resize', handleResize);
        
        // In some cases, we want to persist the background attribute for page transitions
        // Only remove it if we're not on the about page
        const isAboutPage = window.location.pathname === '/about';
        if (!isAboutPage) {
          try {
            document.body.removeAttribute('data-nav-background');
          } catch (error) {
            console.error("Error cleaning up nav background attribute:", error);
          }
        }
      };
    } catch (error) {
      console.error("Critical error in useNavBackground:", error);
      return () => {}; // Return empty cleanup function
    }
  }, [initialBackground]);
};
