
import { useLayoutEffect } from 'react';

/**
 * Custom hook to manage document and background attributes for the About page
 * Handles setting the appropriate background mode for the navbar and page
 */
export const useBackgroundAttributes = () => {
  // Set the initial background to dark immediately for the hero section
  // This ensures light navbar (white text) against the dark hero background
  useLayoutEffect(() => {
    console.log("useBackgroundAttributes: Setting initial dark background");
    try {
      // Set the data attribute for navigation background color
      // This will be picked up by the main navigation
      document.body.setAttribute('data-nav-background', 'dark');
      
      // Add a class to body to indicate we're on the about page
      // This helps with styling and context detection
      document.body.classList.add('about-page');
    } catch (error) {
      console.error("Could not set nav background:", error);
    }
    
    // Return cleanup function
    return () => {
      try {
        document.body.classList.remove('about-page');
        document.body.removeAttribute('data-nav-background');
      } catch (error) {
        console.error("Error cleaning up about page class:", error);
      }
    };
  }, []);
  
  return {};
};
