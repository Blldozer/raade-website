/**
 * React type declarations file
 * This provides proper typing for React components and JSX in the project
 */

import * as React from 'react';

declare global {
  // Declare the global JSX namespace to ensure JSX is properly recognized
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
}

// Re-export React to make it available as a global
declare module 'react' {
  export = React;
}

// Add declarations for framer-motion
declare module 'framer-motion' {
  export const motion: {
    div: React.ForwardRefExoticComponent<any>;
    span: React.ForwardRefExoticComponent<any>;
    section: React.ForwardRefExoticComponent<any>;
    button: React.ForwardRefExoticComponent<any>;
    a: React.ForwardRefExoticComponent<any>;
    header: React.ForwardRefExoticComponent<any>;
    footer: React.ForwardRefExoticComponent<any>;
    img: React.ForwardRefExoticComponent<any>;
    svg: React.ForwardRefExoticComponent<any>;
    path: React.ForwardRefExoticComponent<any>;
    [key: string]: React.ForwardRefExoticComponent<any>;
  };
  export const AnimatePresence: React.FC<any>;
  export const useAnimation: () => any;
  export const useMotionValue: (initialValue: number) => any;
  export const useTransform: (value: any, input: number[], output: any[]) => any;
  export const useCycle: <T>(...args: T[]) => [T, (i?: number) => void];
}

// Add declarations for lucide-react
declare module 'lucide-react' {
  export const ArrowLeftRight: React.FC<any>;
  export const ArrowRight: React.FC<any>;
  export const ArrowLeft: React.FC<any>;
  export const ChevronDown: React.FC<any>;
  export const ChevronUp: React.FC<any>;
  export const ChevronRight: React.FC<any>;
  export const ChevronLeft: React.FC<any>;
  export const X: React.FC<any>;
  export const Menu: React.FC<any>;
  
  // Add a catch-all for other icons - export as namespace instead of invalid syntax
  interface IconComponent extends React.FC<any> {}
  const Icon: { [key: string]: IconComponent };
  export default Icon;
}
