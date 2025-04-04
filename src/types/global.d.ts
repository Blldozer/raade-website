// Extend the Window interface to include our custom properties
interface Window {
  __REACT_INITIALIZED?: boolean;
  __STRIPE_PROMISE?: Promise<any>;
  __STRIPE_ELEMENTS?: any;
  __ANALYTICS_INITIALIZED?: boolean;
  __LOAD_TIME?: number;
}

// Other global type declarations can go here
