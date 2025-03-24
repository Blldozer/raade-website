
import { useState, useEffect, useRef } from 'react';
import { useSectionMarkers } from './navigation/useSectionMarkers';
import { useSectionPositions } from './navigation/useSectionPositions';
import { useBackgroundDetection } from './navigation/useBackgroundDetection';

/**
 * Main hook to manage navigation background color based on current scroll position
 * This is a compositor hook that combines multiple smaller hooks for better maintainability
 * 
 * @param initialBackground - The initial background to use ('light' or 'dark')
 */
export const useNavBackground = (initialBackground: 'light' | 'dark' = 'light') => {
  // Generate unique instance ID for this hook usage
  const instanceId = useRef(`nav-bg-${Math.random().toString(36).substring(2, 9)}`);
  const [currentBackground, setCurrentBackground] = useState(initialBackground);
  
  // Step 1: Mark sections with appropriate data attributes
  const { isMounted } = useSectionMarkers();
  
  // Step 2: Calculate and cache section positions
  const { sectionPositions } = useSectionPositions();
  
  // Step 3: Detect background based on scroll position
  useEffect(() => {
    const detectBackgroundChange = () => {
      try {
        // Detection logic moved here from useBackgroundDetection to avoid hook inside hook
        const scrollY = window.scrollY;
        let newBackground = initialBackground;
        
        // Find which section we're currently in based on scroll position
        sectionPositions.forEach(section => {
          if (scrollY >= section.top && scrollY < section.bottom) {
            newBackground = section.background as 'light' | 'dark';
          }
        });
        
        // Update if changed
        if (newBackground !== currentBackground) {
          setCurrentBackground(newBackground);
          document.body.setAttribute('data-nav-background', newBackground);
        }
      } catch (error) {
        console.error("Error detecting background:", error);
      }
    };
    
    // Initial check
    detectBackgroundChange();
    
    // Set up listener for scroll events
    window.addEventListener('scroll', detectBackgroundChange, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', detectBackgroundChange);
    };
  }, [initialBackground, sectionPositions, currentBackground]);
  
  // Return the current background state
  return currentBackground;
};
