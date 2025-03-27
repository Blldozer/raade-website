
import React from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence, MotionProps } from 'framer-motion';

/**
 * SafeMotion - A wrapper around framer-motion components that safely checks
 * React initialization state before rendering motion components
 * 
 * This prevents "Cannot read properties of null (reading 'useContext')" errors
 * when framer-motion tries to use React Context before React is fully initialized
 */

// Check if we can safely use framer-motion
const canUseMotion = () => {
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
};

// Create safe versions of all motion components
type SafeMotionComponent = {
  [K in keyof typeof framerMotion]: React.ForwardRefExoticComponent<any>;
};

// Create proxied components that check for safety before rendering
const createSafeComponent = (Component: any) => {
  return React.forwardRef((props: any, ref: React.Ref<any>) => {
    if (!canUseMotion()) {
      // Fall back to regular div/span when motion can't be used safely
      const El = props.href ? 'a' : 'div';
      return <El ref={ref} {...props} animate={undefined} transition={undefined} />;
    }
    return <Component ref={ref} {...props} />;
  });
};

// Create the safe motion object with all components
const initSafeMotion = (): SafeMotionComponent => {
  const safeMotion: Partial<SafeMotionComponent> = {};
  
  // Only attempt to initialize if framer-motion is available
  if (typeof framerMotion === 'object' && framerMotion !== null) {
    for (const key in framerMotion) {
      if (typeof framerMotion[key] === 'function' || typeof framerMotion[key] === 'object') {
        safeMotion[key] = createSafeComponent(framerMotion[key]);
      }
    }
  }
  
  return safeMotion as SafeMotionComponent;
};

// Safely create AnimatePresence wrapper
const SafeAnimatePresence = (props: React.PropsWithChildren<any>) => {
  if (!canUseMotion() || typeof FramerAnimatePresence !== 'function') {
    // Just render children if AnimatePresence can't be used safely
    return <>{props.children}</>;
  }
  return <FramerAnimatePresence {...props} />;
};

// Export safe versions
export const motion = initSafeMotion();
export const AnimatePresence = SafeAnimatePresence;

// Export a utility to check if motion is available
export const isMotionAvailable = canUseMotion;
