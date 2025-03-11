
import { useEffect } from 'react';
import { useNavBackground } from './useNavBackground';
import { useOptimizedParallax } from './useOptimizedParallax';
import { useTransitionStatAnimation } from './useTransitionStatAnimation';
import { useTransitionHookAnimation } from './useTransitionHookAnimation';
import { useFutureShowcaseAnimation } from './useFutureShowcaseAnimation';
import { useGeneralSectionAnimations } from './useGeneralSectionAnimations';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionTransitions = () => {
  // Use our navigation background hook
  useNavBackground();
  
  // Use optimized parallax for sections that need it
  useOptimizedParallax();
  
  // Set up ScrollTrigger optimization globally
  useEffect(() => {
    // Global ScrollTrigger settings for better performance
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", // Reduce refresh events
    });
    
    // Initialize all section-specific animations after DOM is fully loaded
    useTransitionStatAnimation();
    useTransitionHookAnimation();
    useFutureShowcaseAnimation();
    useGeneralSectionAnimations();
    
    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, []);
};
