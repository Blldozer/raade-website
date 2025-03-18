
/// <reference types="vite/client" />

// Extend Window interface to include our custom properties
interface Window {
  __REACT_INITIALIZED?: boolean;
}
