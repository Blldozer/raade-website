
import { useState, useCallback, useEffect } from 'react';
import { isLightColor, getElementBackgroundColor } from '@/utils/colorUtils';

/**
 * Hook to analyze the background color of a section element
 * 
 * @param section - The DOM element to analyze
 * @returns Whether the background is light colored
 */
export const useBackgroundAnalysis = (section: Element | null) => {
  const [isLightBackground, setIsLightBackground] = useState(false);
  
  // Analyze the background color of the current section
  const analyzeSectionBackground = useCallback((element: Element | null) => {
    if (!element) return;
    
    // Default to dark background if we can't determine the color
    let lightBackground = false;
    
    try {
      // First check if section has explicit data-background attribute
      const backgroundAttr = element.getAttribute('data-background');
      
      if (backgroundAttr === 'light') {
        lightBackground = true;
      } else if (backgroundAttr === 'dark') {
        lightBackground = false;
      } else {
        // If no explicit attribute, analyze the actual background color
        const backgroundColor = getElementBackgroundColor(element as HTMLElement);
        lightBackground = isLightColor(backgroundColor);
      }
      
      // Update the state based on our analysis
      setIsLightBackground(lightBackground);
      
      // For debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`Section ${element.id || 'unnamed'} background: ${lightBackground ? 'light' : 'dark'}`);
      }
    } catch (error) {
      console.error('Error analyzing section background:', error);
    }
  }, []);
  
  // Run analysis whenever the section changes
  useEffect(() => {
    analyzeSectionBackground(section);
  }, [section, analyzeSectionBackground]);
  
  return { isLightBackground };
};
