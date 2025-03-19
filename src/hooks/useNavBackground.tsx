
import { useRef } from 'react';
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
  
  // Step 1: Mark sections with appropriate data attributes
  const { isMounted } = useSectionMarkers();
  
  // Step 2: Calculate and cache section positions
  const { sectionPositions } = useSectionPositions();
  
  // Step 3: Detect background based on scroll position
  const { currentBackground } = useBackgroundDetection({
    initialBackground,
    sectionPositions
  });
  
  // Return the current background state
  return currentBackground;
};
