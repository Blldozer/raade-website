
/**
 * Global TypeScript declarations
 * 
 * This file extends global interfaces with properties used throughout the application.
 * TypeScript will recognize these declarations across all files.
 */

// Add global JSX namespace
import * as React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    
    // Adds intrinsic elements like 'div', 'span', etc.
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  
  // Used to track React initialization status to prevent "React not available" errors
  interface Window {
    __REACT_INITIALIZED?: boolean;
    
    // Make React globally available for fallback access
    React?: typeof import('react');
  }
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

export {};
