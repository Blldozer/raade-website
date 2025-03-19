
import { useEffect, useRef } from 'react';

/**
 * Hook to mark sections with appropriate data attributes for background detection
 * This helps the navigation know which background to use when scrolling
 */
export const useSectionMarkers = () => {
  // Track if this component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    try {
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
    } catch (error) {
      console.error('Error marking sections:', error);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return { isMounted };
};
