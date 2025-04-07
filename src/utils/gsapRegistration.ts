
// Use the globally loaded GSAP
declare const gsap: any;
declare const ScrollTrigger: any;
declare const ScrollToPlugin: any;

// No need to register plugins as they're already registered via CDN scripts
// Export the global instances for use throughout the app
export { gsap, ScrollTrigger, ScrollToPlugin };

// Export type for easier usage
export type ScrollTriggerType = any; 
