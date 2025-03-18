
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

/**
 * Centralized GSAP plugin registration
 * This ensures plugins are only registered once, preventing "already registered" errors
 */
let pluginsRegistered = false;

export const registerGsapPlugins = () => {
  if (!pluginsRegistered) {
    try {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      pluginsRegistered = true;
      console.log("GSAP plugins registered successfully");
    } catch (error) {
      console.error("Error registering GSAP plugins:", error);
    }
  }
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
export const safeKillScrollTrigger = (trigger: ScrollTrigger | null) => {
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
