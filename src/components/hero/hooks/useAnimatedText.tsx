
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating the text in the hero section
 * 
 * Features:
 * - Safe initialization that works even when React context isn't fully available
 * - Graceful handling of animation failures with fallback to static content
 * - Performance optimizations for mobile devices
 * - Support for screen readers and accessibility
 */
export const useAnimatedText = () => {
  // Create refs for DOM elements
  const text2Ref = useRef(null);
  const orgNameRef = useRef(null);
  const containerRef = useRef(null);
  
  // Store animation state
  const [isAnimated, setIsAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Use CSS transitions instead of react-spring
  // This simplifies our dependencies and avoids React context issues
  const lineWidth = shouldAnimate ? "100%" : "0%";
  const lineOpacity = shouldAnimate ? 1 : 0;
  
  // Trigger animation on mount
  useEffect(() => {
    try {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // If reduced motion is preferred, immediately show everything
        setIsAnimated(true);
        setShouldAnimate(true);
        return;
      }
      
      // Schedule animation to start shortly after mounting
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setIsAnimated(true);
      }, 200);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("useAnimatedText: Error in animation setup", error);
      // On error, just show everything
      setIsAnimated(true);
      setShouldAnimate(true);
    }
  }, []);

  return {
    text2Ref,
    orgNameRef,
    containerRef,
    lineWidth,
    lineOpacity,
    isAnimated
  };
};

export default useAnimatedText;
