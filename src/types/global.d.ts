/**
 * Global TypeScript declarations
 * 
 * This file extends global interfaces with properties used throughout the application.
 * TypeScript will recognize these declarations across all files.
 */

// Import React types directly
import * as React from 'react';

declare global {
  // Define JSX namespace to fix 'section' and other HTML elements
  namespace JSX {
    interface IntrinsicElements {
      // Common HTML elements
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      
      // Fallback for other HTML elements
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  // Used to track React initialization status to prevent "React not available" errors
  interface Window {
    __REACT_INITIALIZED?: boolean;
    
    // Make React globally available for fallback access
    React?: typeof import('react');
  }

  // Define global namespace for CSS custom properties
  namespace CSSStyleDeclaration {
    interface Properties {
      // Add CSS variables used in the project
      'navbar-height': string;
      'fluid-body': string;
      'fluid-heading': string;
    }
  }
}

// Export empty to treat as a module
export {};
