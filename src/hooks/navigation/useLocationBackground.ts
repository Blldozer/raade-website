
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shouldUseDarkNavbar, shouldUseLightNavbar } from './useNavBackgroundUtils';

/**
 * Hook to determine the appropriate background based on current location/route
 * Handles page-specific navbar styling requirements
 * 
 * @param initialBackground - Default background to use if no route-specific setting applies
 * @returns The current determined background state based on location
 */
export const useLocationBackground = (initialBackground: 'light' | 'dark' = 'light') => {
  const [locationBasedBackground, setLocationBasedBackground] = useState<'light' | 'dark'>(initialBackground);
  const location = useLocation();
  const pathname = location.pathname;
  
  // Set appropriate background based on current page/route
  useEffect(() => {
    try {
      console.log(`useLocationBackground: Checking route ${pathname}`);
      
      // Determine background based on page type
      if (shouldUseLightNavbar(pathname)) {
        // Force light navbar for pages with dark backgrounds
        setLocationBasedBackground('light');
        console.log(`useLocationBackground: Set to light for ${pathname}`);
      } else if (shouldUseDarkNavbar(pathname)) {
        // Force dark navbar for pages with light backgrounds
        setLocationBasedBackground('dark');
        console.log(`useLocationBackground: Set to dark for ${pathname}`);
      } else {
        // For other pages, use the provided initial background
        setLocationBasedBackground(initialBackground);
        console.log(`useLocationBackground: Set to ${initialBackground} for other page`);
      }
    } catch (error) {
      console.error(`useLocationBackground error:`, error);
    }
  }, [initialBackground, pathname]);
  
  return locationBasedBackground;
};
