
import { useState, useEffect } from 'react';

/**
 * Hook to detect input capabilities of the device
 * 
 * Features:
 * - Detects touch screen support
 * - Checks pointer precision (coarse vs fine)
 * - Determines hover capability
 * - Enhanced with proper SSR handling
 */
export const useInputCapabilities = () => {
  // Initialize with safe defaults for SSR
  const [hasTouch, setHasTouch] = useState(false);
  const [hasCoarsePointer, setHasCoarsePointer] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Check for touch capability
    setHasTouch('ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0);
    
    // Check for pointer precision using media queries if available
    if (window.matchMedia) {
      // Check for coarse pointer (typically touch devices)
      setHasCoarsePointer(window.matchMedia('(pointer: coarse)').matches);
      
      // Check for hover capability
      setHasHover(window.matchMedia('(hover: hover)').matches);
    }
  }, []);

  return {
    hasTouch,
    hasCoarsePointer,
    hasHover
  };
};

export default useInputCapabilities;
