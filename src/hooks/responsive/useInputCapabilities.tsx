
import { useState, useEffect } from "react";

/**
 * Hook for detecting input capabilities of the device
 * 
 * Provides information about:
 * - Pointer type (coarse/fine)
 * - Hover capabilities
 * - Touch support
 * - Motion preferences
 * 
 * Enhanced with proper SSR checks to prevent "Cannot read properties of null" errors
 */
export const useInputCapabilities = () => {
  // Initialize with safe default values
  const [hasPrecisePointer, setHasPrecisePointer] = useState(true);
  const [hasHoverCapability, setHasHoverCapability] = useState(true);
  const [hasCoarsePointer, setHasCoarsePointer] = useState(false);
  const [touchCapability, setTouchCapability] = useState<'none' | 'limited' | 'full'>('none');
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);

  // Only run this effect in the browser environment
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Check for pointer capabilities
    if (window.matchMedia) {
      // Check if the device has hover capability
      const hasHoverQuery = window.matchMedia('(hover: hover)');
      setHasHoverCapability(hasHoverQuery.matches);
      
      // Check if the device has a coarse pointer (typically touch)
      const hasCoarsePointerQuery = window.matchMedia('(pointer: coarse)');
      setHasCoarsePointer(hasCoarsePointerQuery.matches);
      
      // Check if the device has a fine pointer (mouse, stylus)
      const hasFinePointerQuery = window.matchMedia('(pointer: fine)');
      setHasPrecisePointer(hasFinePointerQuery.matches);
      
      // Check if user prefers reduced motion
      const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPreferReducedMotion(prefersReducedMotionQuery.matches);
    }
    
    // Determine touch capability
    if ('ontouchstart' in window) {
      setTouchCapability(hasCoarsePointer ? 'full' : 'limited');
    } else {
      setTouchCapability('none');
    }
  }, [hasCoarsePointer]);

  return {
    hasPrecisePointer,
    hasHoverCapability,
    hasCoarsePointer,
    touchCapability,
    preferReducedMotion
  };
};
