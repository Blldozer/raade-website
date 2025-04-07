import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register all GSAP plugins first thing
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Export GSAP and plugins for use throughout the app
export { gsap, ScrollTrigger, ScrollToPlugin };

// Export type for easier usage
export type ScrollTriggerType = any; 
