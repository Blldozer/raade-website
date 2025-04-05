
import React from 'react';

/**
 * Helper function to safely use hooks when there might be React context issues
 * This pattern helps prevent "React hooks can only be called inside of the body of a function component" errors
 * 
 * @param hookFn The hook function to safely execute
 * @param fallbackValue The fallback value to return if the hook cannot be executed
 * @returns The result of the hook or the fallback value
 */
export function useSafeHook<T>(hookFn: () => T, fallbackValue: T): T {
  // First check if we're in a valid React context
  if (typeof React !== 'object' || !React || typeof React.useState !== 'function') {
    console.warn("React hooks not available in this context");
    return fallbackValue;
  }
  
  try {
    // Try to execute the hook
    return hookFn();
  } catch (error) {
    console.error("Error executing React hook:", error);
    return fallbackValue;
  }
}

/**
 * Safely initializes a React reference only if React is available
 * 
 * @param initialValue The initial value for the ref
 * @returns A React ref object or a plain object with a current property
 */
export function safeUseRef<T>(initialValue: T): React.RefObject<T> | { current: T } {
  if (typeof React !== 'object' || !React || typeof React.useRef !== 'function') {
    return { current: initialValue };
  }
  
  try {
    return React.useRef(initialValue);
  } catch (error) {
    console.error("Error creating React ref:", error);
    return { current: initialValue };
  }
}

/**
 * Global type declaration for window to include the React initialization flag
 */
declare global {
  interface Window {
    __REACT_INITIALIZED: boolean;
    React: typeof React;
  }
}
