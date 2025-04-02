
// Extend Window interface to include our custom properties
interface Window {
  __REACT_INITIALIZED?: boolean;
  // Add any other global window properties used in the application here
}

// Augment React JSX types if needed for custom components
// Example: declare namespace JSX { interface IntrinsicElements { 'custom-element': any } }

// Global type definitions for modules without TypeScript definitions
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}
