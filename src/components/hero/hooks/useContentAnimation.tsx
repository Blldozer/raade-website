
import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Custom hook to animate the hero content
 * 
 * Features:
 * - Respects user's reduced motion preferences
 * - Falls back to CSS animations when possible for better performance
 * - Adds will-change hints for better rendering performance
 * - Enhanced with error handling for React context issues
 * 
 * @param contentRef - Reference to the content element to animate
 */
export const useContentAnimation = (contentRef: React.RefObject<HTMLDivElement>) => {
  // Verify React is available before trying to use hooks
  if (typeof React !== 'object' || typeof React.useEffect !== 'function') {
    console.warn("useContentAnimation: React context unavailable");
    return; // Exit early without trying to use hooks
  }
  
  useEffect(() => {
    // Safety check for contentRef and gsap availability
    if (!contentRef?.current || typeof gsap !== 'object') return;
    
    try {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Use CSS animation for better performance when possible
      if (contentRef.current) {
        if (prefersReducedMotion) {
          // Skip animation for users who prefer reduced motion
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'none';
        } else {
          // Add class for CSS-based animation instead of GSAP
          contentRef.current.classList.add('content-fade-in');
          return;
        }
      }
      
      // Fall back to GSAP only if needed for browsers that don't support our CSS animation
      // and if GSAP is properly loaded
      if (typeof gsap.timeline === 'function') {
        const tl = gsap.timeline({
          onStart: () => {
            if (contentRef.current) {
              // Add will-change hint before animation starts
              contentRef.current.style.willChange = 'opacity, transform';
            }
          },
          onComplete: () => {
            if (contentRef.current) {
              // Remove will-change after animation completes to free up resources
              contentRef.current.style.willChange = 'auto';
            }
          }
        });
        
        tl.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", force3D: true }
        );
        
        return () => {
          tl.kill();
        };
      }
    } catch (error) {
      console.error("useContentAnimation: Error during animation setup", error);
      
      // Ensure content is visible even if animation fails
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
      }
    }
  }, [contentRef]);
};

export default useContentAnimation;
