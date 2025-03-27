
import React from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';

/**
 * SafeMotion - A wrapper around framer-motion components that safely checks
 * React initialization state before rendering motion components
 * 
 * This prevents "Cannot read properties of null (reading 'useContext')" errors
 * when framer-motion tries to use React Context before React is fully initialized
 */

// Check if we can safely use framer-motion
const canUseMotion = () => {
  try {
    // Verify React is properly initialized
    if (typeof React !== 'object' || React === null) {
      return false;
    }

    // Verify window and initialization flag exists
    if (typeof window === 'undefined' || !window.__REACT_INITIALIZED) {
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
    const safeMotion = {};
    
    // Only attempt to initialize if framer-motion is available
    if (typeof framerMotion === 'object' && framerMotion !== null) {
      // TypeScript safety: Check that framerMotion is not null before accessing keys
      const motionObj = framerMotion as object;
      
      for (const key in motionObj) {
        if (Object.prototype.hasOwnProperty.call(motionObj, key)) {
          const value = (motionObj as any)[key];
          if (typeof value === 'function' || typeof value === 'object') {
            (safeMotion as any)[key] = React.forwardRef((props: any, ref: React.Ref<any>) => {
              if (!canUseMotion()) {
                // Fall back to regular div/span when motion can't be used safely
                const El = props.href ? 'a' : 'div';
                return <El ref={ref} {...props} animate={undefined} transition={undefined} />;
              }
              return <value ref={ref} {...props} />;
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
