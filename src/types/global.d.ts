
/**
 * Global TypeScript declarations
 * 
 * This file extends global interfaces with properties used throughout the application.
 * TypeScript will recognize these declarations across all files.
 */

interface Window {
  // Used to track React initialization status to prevent "React not available" errors
  __REACT_INITIALIZED?: boolean;
  
  // Make React globally available for fallback access
  React?: typeof import('react');
}

// Define global namespace for CSS custom properties
declare namespace CSSStyleDeclaration {
  interface Properties {
    // Add CSS variables used in the project
    'navbar-height': string;
    'fluid-body': string;
    'fluid-heading': string;
  }
}
