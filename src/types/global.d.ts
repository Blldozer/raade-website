
interface Window {
  // React initialization flags
  __REACT_INITIALIZED: boolean;
  __REACT_CONTEXT_ERROR: boolean;
  
  // Global React reference for early access
  React: typeof import('react');
  
  // Any other global variables your app needs
}
