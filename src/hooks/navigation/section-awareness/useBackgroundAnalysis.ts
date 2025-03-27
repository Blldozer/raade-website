
import { useState, useEffect } from 'react';
import { getElementBackgroundColor, isLightColor } from '@/utils/colorUtils';

/**
 * Hook to analyze the background color of the current section
 * Enhanced with proper SSR handling
 */
export const useBackgroundAnalysis = (currentSection: Element | null) => {
  const [isLightBackground, setIsLightBackground] = useState(true);
  
  useEffect(() => {
    // Skip in SSR environment
    if (typeof window === 'undefined') return;
    
    // No section to analyze
    if (!currentSection) return;
    
    try {
      // Get the computed background color
      const bgColor = getElementBackgroundColor(currentSection as HTMLElement);
      
      // Determine if it's a light color
      const isLight = isLightColor(bgColor);
      setIsLightBackground(isLight);
    } catch (error) {
      // Fallback to default (light background) in case of errors
      console.error('Error analyzing background:', error);
      setIsLightBackground(true);
    }
  }, [currentSection]);
  
  return { isLightBackground };
};
