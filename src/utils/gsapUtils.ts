
// Import from our centralized registration file instead of directly
import { gsap, ScrollTrigger, ScrollTriggerType, ScrollToPlugin } from './gsapRegistration';

/**
 * Centralized GSAP plugin registration
 * This ensures plugins are only registered once, preventing "already registered" errors
 */
let pluginsRegistered = true; // Changed to true since we register in gsapRegistration

export const registerGsapPlugins = () => {
  // This function is kept for backward compatibility but plugins are already registered
  return pluginsRegistered;
};

/**
 * Safely kills a GSAP timeline with proper error handling
 */
export const safeKillTimeline = (timeline: gsap.core.Timeline | null) => {
  if (timeline && timeline.kill) {
    try {
      timeline.kill();
      return true;
    } catch (error) {
      console.error("Error killing GSAP timeline:", error);
      return false;
    }
  }
  return false;
};

/**
 * Safely kills a ScrollTrigger instance with proper error handling
 */
export const safeKillScrollTrigger = (trigger: ScrollTriggerType | null) => {
  if (trigger && typeof trigger.kill === 'function') {
    try {
      trigger.kill();
      return true;
    } catch (error) {
      console.error("Error killing ScrollTrigger:", error);
      return false;
    }
  }
  return false;
};

/**
 * Helper to check if an element exists and is in the DOM
 */
export const isElementInDOM = (element: Element | null): boolean => {
  return Boolean(element && element.isConnected);
};

/**
 * Create a debounced function that limits how often a function can be called
 */
export const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null;
  return (...args: any[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

// Type definition for GSAP context function
type GsapContextFunc = (self: gsap.Context) => void;

/**
 * Creates a GSAP context and ensures proper cleanup
 * @param fn Function containing GSAP animations
 * @param scope DOM element to scope animations to
 * @returns Cleanup function
 */
export const createSafeGsapContext = (fn: GsapContextFunc, scope?: Element | null) => {
  try {
    // Create context only if GSAP is properly loaded
    if (gsap && gsap.context) {
      const context = gsap.context(fn, scope);
      
      return () => {
        try {
          context.revert();
        } catch (error) {
          console.error("Error reverting GSAP context:", error);
        }
      };
    }
    
    // If GSAP context not available, just run the function
    fn({} as gsap.Context);
    return () => {};
  } catch (error) {
    console.error("Error creating GSAP context:", error);
    return () => {};
  }
};
