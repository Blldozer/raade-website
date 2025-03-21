
import { useState, useEffect } from "react";

/**
 * Hook for detecting input capabilities with improved error handling
 * 
 * Features:
 * - Detects touch, hover, and pointer capabilities
 * - Gracefully handles cases where window/navigator is not available
 * - Better error recovery for mobile devices
 */
export const useInputCapabilities = () => {
  // Safe environment detection
  const hasWindow = typeof window !== 'undefined';
  const hasNavigator = typeof navigator !== 'undefined';
  
  // Initialize with sensible defaults
  const [hasTouch, setHasTouch] = useState(() => {
    if (!hasWindow || !hasNavigator) return false;
    try {
      return 'ontouchstart' in window || 
          navigator.maxTouchPoints > 0 || 
          (navigator as any).msMaxTouchPoints > 0;
    } catch (e) {
      console.warn("Error detecting touch capability:", e);
      return false;
    }
  });
  
  const [canHover, setCanHover] = useState(() => {
    if (!hasWindow) return true; // Default to true as fallback
    try {
      // matchMedia might not be available in all browsers
      return window.matchMedia('(hover: hover)').matches;
    } catch (e) {
      console.warn("Error detecting hover capability:", e);
      return !hasTouch; // Fallback based on touch
    }
  });
  
  const [hasPointer, setHasPointer] = useState(() => {
    if (!hasWindow) return true; // Default to true as fallback
    try {
      return window.matchMedia('(pointer: fine)').matches;
    } catch (e) {
      console.warn("Error detecting pointer capability:", e);
      return !hasTouch; // Fallback based on touch
    }
  });

  // Update capabilities when environment changes
  useEffect(() => {
    if (!hasWindow) return;
    
    try {
      // Function to update capabilities
      const updateCapabilities = () => {
        try {
          // Touch detection
          setHasTouch(
            'ontouchstart' in window || 
            (navigator && navigator.maxTouchPoints > 0) || 
            (navigator && (navigator as any).msMaxTouchPoints > 0)
          );
          
          // Hover detection (with fallback)
          try {
            setCanHover(window.matchMedia('(hover: hover)').matches);
          } catch (e) {
            console.warn("matchMedia hover detection failed:", e);
          }
          
          // Pointer detection (with fallback)
          try {
            setHasPointer(window.matchMedia('(pointer: fine)').matches);
          } catch (e) {
            console.warn("matchMedia pointer detection failed:", e);
          }
        } catch (e) {
          console.error("Error in updateCapabilities:", e);
        }
      };
      
      // Call once to ensure initial state is correct
      updateCapabilities();
      
      // Additional touch event listeners for more accurate detection
      const touchStartHandler = () => {
        if (!hasTouch) setHasTouch(true);
        // Remove listener once we've detected touch
        window.removeEventListener('touchstart', touchStartHandler);
      };
      
      // Monitor for touch events
      window.addEventListener('touchstart', touchStartHandler, { once: true });
      
      // Clean up
      return () => {
        window.removeEventListener('touchstart', touchStartHandler);
      };
    } catch (error) {
      console.error("Critical error in useInputCapabilities:", error);
      // Return default values if we can't detect
      return () => {};
    }
  }, [hasWindow, hasNavigator, hasTouch]);

  return {
    hasTouch,
    canHover,
    hasPointer,
    // Simplified input type detection
    inputType: hasPointer ? (canHover ? 'mouse' : 'stylus') : (hasTouch ? 'touch' : 'unknown')
  };
};
