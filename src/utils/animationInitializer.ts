
/**
 * Animation Initializer
 * 
 * This utility ensures that animation libraries have proper access to React context.
 * It sets up a global flag to verify React initialization before using context-dependent animations.
 */

// Delay setting this flag until after initial render cycle
export const initializeAnimationContext = () => {
  // Safe initialization with checks
  if (typeof window !== 'undefined') {
    try {
      window.__REACT_INITIALIZED = true;
      console.log('Animation context initialized');
    } catch (e) {
      console.warn('Failed to initialize animation context:', e);
    }
  }
};

// Export a type declaration to make TypeScript happy
export type ReactInitializedWindow = Window & {
  __REACT_INITIALIZED?: boolean;
};

// Make sure the global scope knows about our custom property
declare global {
  interface Window {
    __REACT_INITIALIZED?: boolean;
  }
}
