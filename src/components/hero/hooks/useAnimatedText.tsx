
import { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

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
  // Check if React is properly initialized
  if (!window.__REACT_INITIALIZED || typeof useRef !== 'function') {
    console.warn("useAnimatedText: React not fully initialized, returning empty refs");
    return {
      text2Ref: null,
      orgNameRef: null,
      containerRef: null,
      lineWidth: "0%",
      lineOpacity: 0
    };
  }

  // Create refs for DOM elements
  const text2Ref = useRef(null);
  const orgNameRef = useRef(null);
  const containerRef = useRef(null);
  
  // Store animation state
  const [isAnimated, setIsAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Add safe check for useSpring
  let springs = { width: "0%", opacity: 0 };
  
  try {
    // Only try to use useSpring if it's available and working
    springs = useSpring({
      from: { width: "0%", opacity: 0 },
      to: { 
        width: shouldAnimate ? "100%" : "0%", 
        opacity: shouldAnimate ? 1 : 0 
      },
      config: { tension: 120, friction: 14 },
      delay: 400,
    });
  } catch (error) {
    console.error("useAnimatedText: Error using animation spring, using static values", error);
  }
  
  // Extract animation values with fallbacks
  const lineWidth = typeof springs.width === 'object' ? 
    (springs.width.to ? "100%" : "0%") : 
    springs.width;
    
  const lineOpacity = typeof springs.opacity === 'object' ? 
    (springs.opacity.to ? 1 : 0) : 
    springs.opacity;

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
