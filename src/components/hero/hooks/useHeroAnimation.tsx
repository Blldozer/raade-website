
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Only register plugin if gsap is available
if (typeof gsap === 'object' && gsap.registerPlugin && typeof ScrollTrigger === 'object') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for hero section animation effects
 * 
 * Features:
 * - Handles parallax scrolling effects for the background video
 * - Respects user's reduced motion preferences
 * - Optimized for mobile devices with simplified animations
 * - Enhanced with error handling and fallbacks
 * 
 * @param videoRef - Reference to the video element
 */
export const useHeroAnimation = (videoRef: React.RefObject<HTMLVideoElement>) => {
  // Verify React is available before trying to use hooks
  if (typeof React !== 'object' || typeof React.useEffect !== 'function') {
    console.warn("useHeroAnimation: React context unavailable");
    return; // Exit early without trying to use hooks
  }
  
  useEffect(() => {
    try {
      // Set the initial background state for proper navigation contrast
      document.body.setAttribute('data-nav-background', 'dark');
      
      // Only setup animation if video exists and GSAP is available
      if (!videoRef?.current || typeof gsap !== 'object') return;
      
      // Check for reduced motion preference and device capability
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;
      
      // Apply CSS-based parallax for better performance
      if (videoRef.current && !prefersReducedMotion) {
        videoRef.current.classList.add('parallax-element');
        
        // Skip GSAP parallax for mobile devices for better performance
        if (isMobile) {
          return;
        }
      }
      
      // If reduced motion is preferred, completely skip animation
      if (prefersReducedMotion) {
        return;
      }
      
      // Only use GSAP for higher-end devices and if ScrollTrigger is properly loaded
      if (typeof gsap.to === 'function' && typeof ScrollTrigger === 'object') {
        const animation = gsap.to(videoRef.current, {
          y: '15vh', // Reduced parallax distance for better performance
          ease: "none",
          force3D: true, // Force 3D transforms for better performance
          overwrite: true, // Prevent animation conflicts
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5, // Increased scrub value for smoother performance
            invalidateOnRefresh: true, // Recalculate on resize
            fastScrollEnd: true, // Optimize for fast scrolling
            preventOverlaps: true // Avoid overlapping animations
          }
        });
        
        return () => {
          // Clean up animation and ScrollTrigger
          try {
            if (animation && animation.scrollTrigger) {
              animation.scrollTrigger.kill();
            }
            animation.kill();
          } catch (cleanupError) {
            console.error("useHeroAnimation: Error during cleanup", cleanupError);
          }
        };
      }
    } catch (error) {
      console.error("useHeroAnimation: Error during setup", error);
      
      // Make sure body attribute is set even if animation fails
      document.body.setAttribute('data-nav-background', 'dark');
    }
    
    return () => {
      // Always try to clean up body attribute
      try {
        document.body.removeAttribute('data-nav-background');
      } catch (error) {
        console.error("useHeroAnimation: Error during attribute cleanup", error);
      }
    };
  }, [videoRef]);
};

export default useHeroAnimation;
