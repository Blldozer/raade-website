
import React from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';

/**
 * SafeMotion - A wrapper around framer-motion components that safely checks
 * React initialization state before rendering motion components
 * 
 * Enhanced with better type safety and more robust initialization checks
 */

// Get React from window if available as a fallback
const getReact = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__REACT_GLOBAL_REFERENCE || window.React || React;
  }
  return React;
};

// Check if we can safely use framer-motion
const canUseMotion = () => {
  try {
    const React = getReact();
    
    // Verify React is properly initialized
    if (typeof React !== 'object' || React === null) {
      return false;
    }

    // Verify window and initialization flag exists
    if (typeof window === 'undefined' || !(window as any).__REACT_INITIALIZED) {
      return false;
    }

    // Verify framer-motion is available
    if (typeof framerMotion !== 'object' || framerMotion === null) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("SafeMotion: Error checking motion availability", error);
    return false;
  }
};

// Create safe versions of all motion components
const initSafeMotion = () => {
  try {
    const safeMotion: Record<string, any> = {};
    
    // Only attempt to initialize if framer-motion is available
    if (typeof framerMotion === 'object' && framerMotion !== null) {
      // TypeScript safety: Check that framerMotion is not null before accessing keys
      const motionObj = framerMotion as Record<string, any>;
      
      for (const key in motionObj) {
        if (Object.prototype.hasOwnProperty.call(motionObj, key)) {
          const Component = motionObj[key];
          if (typeof Component === 'function' || typeof Component === 'object') {
            // Use proper typing for the forwardRef
            safeMotion[key] = React.forwardRef((props: any, ref: React.Ref<any>) => {
              if (!canUseMotion()) {
                // Fall back to regular div/span/a when motion can't be used safely
                const El = props.href ? 'a' : 'div';
                return React.createElement(El, { ...props, ref, animate: undefined, transition: undefined });
              }
              return React.createElement(Component, { ...props, ref });
            });
          }
        }
      }
    }
    
    return safeMotion;
  } catch (error) {
    console.error("SafeMotion: Error initializing", error);
    return {}; // Return empty object in case of error
  }
};

// Safely create AnimatePresence wrapper
const SafeAnimatePresence = (props: React.PropsWithChildren<any>) => {
  try {
    if (!canUseMotion() || typeof FramerAnimatePresence !== 'function') {
      // Just render children if AnimatePresence can't be used safely
      return <>{props.children}</>;
    }
    return <FramerAnimatePresence {...props} />;
  } catch (error) {
    console.error("SafeAnimatePresence: Error rendering", error);
    return <>{props.children}</>;
  }
};

// Export safe versions
export const motion = initSafeMotion();
export const AnimatePresence = SafeAnimatePresence;

// Export a utility to check if motion is available
export const isMotionAvailable = canUseMotion;

// Add proper typing for the global window object
declare global {
  interface Window {
    __REACT_INITIALIZED?: boolean;
    __REACT_CONTEXT_ERROR?: boolean;
    __REACT_GLOBAL_REFERENCE?: typeof React;
    React?: typeof React;
  }
}
