import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHeroAnimation = (videoRef: React.RefObject<HTMLVideoElement>) => {
  useEffect(() => {
    // Set the initial background state for proper navigation contrast
    document.body.setAttribute('data-nav-background', 'dark');
    
    // Only setup animation if video exists
    if (!videoRef.current) return;
    
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
    
    // Only use GSAP for higher-end devices
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
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [videoRef]);
};

export default useHeroAnimation;
