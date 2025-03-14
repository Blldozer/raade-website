import { useEffect } from 'react';
import gsap from 'gsap';

export const useContentAnimation = (contentRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!contentRef.current) return;
    
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
  }, [contentRef]);
};

export default useContentAnimation;
