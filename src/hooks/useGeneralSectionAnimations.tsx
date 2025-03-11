
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useGeneralSectionAnimations = () => {
  const { isMobile } = useResponsive();
  const animationsSet = useRef(new Set());
  
  useEffect(() => {
    // Get sections that aren't handled by specific hooks
    const sections = document.querySelectorAll('section:not(#hero, #transition-stat, #transition-hook, #future-showcase)');
    
    // Create one timeline per section for better performance
    sections.forEach((section) => {
      const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
      if (!contentElements.length) return;
      
      // Create a timeline for this section
      const tl = gsap.timeline({ 
        paused: true,
        defaults: { 
          ease: "power2.out",
          clearProps: "opacity" // Clear props after animation
        }
      });
      
      // Add animations with reduced values on mobile
      const yOffset = isMobile ? 10 : 20;
      const staggerAmount = isMobile ? 0.15 : 0.3;
      
      tl.fromTo(contentElements,
        { y: yOffset, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: staggerAmount }
      );
      
      // Track this timeline to ensure proper cleanup
      animationsSet.current.add(tl);
      
      // Create a ScrollTrigger with performance flags
      ScrollTrigger.create({
        trigger: section,
        start: isMobile ? "top 90%" : "top 80%",
        once: true, // Only trigger once
        fastScrollEnd: true,
        onEnter: () => {
          // Use RAF for smoother animation
          requestAnimationFrame(() => {
            tl.play();
          });
        }
      });
    });
    
    // Improved cleanup function
    return () => {
      // Kill all timelines we created
      animationsSet.current.forEach(tl => {
        if (tl && typeof tl.kill === 'function') {
          tl.kill();
        }
      });
      
      // Clear the set
      animationsSet.current.clear();
      
      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerElement = trigger.vars.trigger;
        if (triggerElement instanceof Element &&
            !triggerElement.matches('#hero, #transition-stat, #transition-hook, #future-showcase')) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);
};
