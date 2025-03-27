
/**
 * Utility to provide safe access to React hooks and context
 * 
 * This helps prevent "Cannot read properties of null (reading 'useXXX')" errors
 * by safely checking React's initialization state
 */

// Get React from global references if available
export const getSafeReact = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__REACT_GLOBAL_REFERENCE || window.React;
  }
  return null;
};

// Safely check if React hooks can be used
export const canUseReactHooks = () => {
  try {
    const React = getSafeReact();
    if (!React) return false;
    
    // Check if useState exists and is a function
    if (typeof React.useState !== 'function') return false;
    
    // Check if useEffect exists and is a function
    if (typeof React.useEffect !== 'function') return false;
    
    // Check for React initialization flag
    if (typeof window !== 'undefined' && !(window as any).__REACT_INITIALIZED) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking React hooks availability:", error);
    return false;
  }
};

// Create safe versions of common hooks
export const createSafeHooks = () => {
  const React = getSafeReact();
  
  // If React isn't available, return no-op functions
  if (!React || !canUseReactHooks()) {
    return {
      useState: <T>(initialState: T) => [initialState, () => {}] as const,
      useEffect: (effect: Function, deps?: any[]) => {},
      useRef: <T>(initialValue: T) => ({ current: initialValue }),
      useCallback: <T extends Function>(callback: T, deps?: any[]) => callback,
      useMemo: <T>(factory: () => T, deps?: any[]) => factory(),
      useContext: <T>(context: React.Context<T>) => {} as T
    };
  }
  
  // Return the actual React hooks
  return {
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useCallback: React.useCallback,
    useMemo: React.useMemo,
    useContext: React.useContext
  };
};

// Add proper typing for the global window object
declare global {
  interface Window {
    __REACT_INITIALIZED?: boolean;
    __REACT_CONTEXT_ERROR?: boolean;
    __REACT_GLOBAL_REFERENCE?: any;
    React?: any;
  }
}
