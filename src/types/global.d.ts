
// Extend the Window interface to include our custom properties
// This is the single source of truth for all global window properties
interface Window {
  React: any;
  __REACT_INITIALIZED: boolean;
  __REACT_CONTEXT_ERROR: boolean;
  __REACT_HOOK_INITIALIZATION_STARTED?: boolean;
  __REACT_HOOK_INITIALIZATION_COMPLETED?: boolean;
}

// Add support for module augmentation
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
}

// Define module resolution for various file types
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.webm" {
  const content: string;
  export default content;
}

declare module "*.mp4" {
  const content: string;
  export default content;
}

// Define module resolution for CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}
