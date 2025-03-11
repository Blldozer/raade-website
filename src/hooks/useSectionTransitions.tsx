
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
  // Call all animation hooks at the top level of the component
  // This ensures React's rules of hooks are followed
  useNavBackground();
  useOptimizedParallax();
  useTransitionStatAnimation();
  useTransitionHookAnimation();
  useFutureShowcaseAnimation();
  useGeneralSectionAnimations();
  
  useEffect(() => {
    // Set up ScrollTrigger optimization globally
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", // Reduce refresh events
    });
    
    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, []);
};
