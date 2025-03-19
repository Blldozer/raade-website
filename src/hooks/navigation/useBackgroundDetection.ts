import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { hasFixedNavbarStyle } from './useNavBackgroundUtils';
import { useLocationBackground } from './useLocationBackground';
import { useDocumentAttributes } from './useDocumentAttributes';
import { useScrollBackgroundDetection } from './useScrollBackgroundDetection';

interface BackgroundDetectionProps {
  initialBackground?: 'light' | 'dark';
  sectionPositions: { top: number; bottom: number; background: string }[];
}

/**
 * Hook to detect and manage the current background state for navigation
 * Composes smaller hooks to handle different aspects of background detection:
 * - Location-based background settings
 * - Scroll-based background detection
 * - Document attribute management
 */
export const useBackgroundDetection = ({ 
  initialBackground = 'light',
  sectionPositions 
}: BackgroundDetectionProps) => {
  const [currentBackground, setCurrentBackground] = useState<'light' | 'dark'>(initialBackground);
  const location = useLocation();
  const pathname = location.pathname;
  
  // Track if this hook instance is mounted
  const isMounted = useRef(true);
  
  // 1. Get location-based background setting
  const locationBasedBackground = useLocationBackground(initialBackground);
  
  // 2. Determine if we should use scroll-based detection
  const shouldUseScrollDetection = !hasFixedNavbarStyle(pathname);
  
  // 3. Get scroll-based background (if enabled)
  const scrollBasedBackground = useScrollBackgroundDetection({
    sectionPositions,
    initialBackground: locationBasedBackground,
    isEnabled: shouldUseScrollDetection
  });
  
  // 4. Combine location and scroll detection to determine final background
  useEffect(() => {
    // If we have fixed navbar style, just use location-based background
    if (!shouldUseScrollDetection) {
      setCurrentBackground(locationBasedBackground);
    } else {
      // Otherwise, use scroll-based background
      setCurrentBackground(scrollBasedBackground);
    }
  }, [locationBasedBackground, scrollBasedBackground, shouldUseScrollDetection]);
  
  // 5. Apply the current background to document
  useDocumentAttributes({
    attributeName: 'data-nav-background',
    attributeValue: currentBackground,
    shouldApply: true,
    cleanup: !hasFixedNavbarStyle(pathname) // Don't clean up for fixed navbar pages
  });
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return { currentBackground };
};
