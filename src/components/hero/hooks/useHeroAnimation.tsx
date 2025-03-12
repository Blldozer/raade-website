
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
    
    // Optimize scroll animation with reduced impact
    const animation = gsap.to(videoRef.current, {
      y: '20vh',
      ease: "none",
      force3D: true, // Force 3D transforms for better performance
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5 // Slightly smoother scrubbing for better performance
      }
    });
    
    return () => {
      // Clean up animation
      animation.kill();
    };
  }, [videoRef]);
};

export default useHeroAnimation;
