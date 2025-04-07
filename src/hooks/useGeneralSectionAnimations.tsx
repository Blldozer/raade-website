import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useGeneralSectionAnimations = () => {
  const { isMobile } = useResponsive();
  // Fix the type of the Set to properly store gsap timelines
  const animationsSet = useRef<Set<gsap.core.Timeline>>(new Set());
  
  useEffect(() => {
    // OPTIMIZATION: Reduce animations by focusing only on visible sections
    // Remove future-showcase from this list to prevent animation conflicts
    const visibleSections = ['conference-promo', 'join'];
    
    // Get specific sections instead of all sections
    const sections = visibleSections.map(id => document.getElementById(id)).filter(Boolean);
    
    // Create one timeline per section for better performance
    sections.forEach((section) => {
      if (!section) return;
      
      const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
      if (!contentElements.length) return;
      
      // Create a timeline for this section
      const tl = gsap.timeline({ 
        paused: true,
        defaults: { 
          ease: "power1.out", // Simpler easing function for better performance
          clearProps: "opacity" // Clear props after animation
        }
      });
      
      // Add animations with reduced values on mobile
      const yOffset = isMobile ? 10 : 15; // Reduced movement for better performance
      const staggerAmount = isMobile ? 0.15 : 0.2; // Smaller stagger
      
      tl.fromTo(contentElements,
        { y: yOffset, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: staggerAmount }
      );
      
      // Track this timeline to ensure proper cleanup
      animationsSet.current.add(tl);
      
      // Create a ScrollTrigger with performance flags
      ScrollTrigger.create({
        trigger: section,
        start: isMobile ? "top 90%" : "top 85%",
        once: true, // OPTIMIZATION: Only trigger animations once
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
      animationsSet.current.forEach((tl: any) => {
        if (tl && typeof tl.kill === 'function') {
          tl.kill();
        }
      });
      
      // Clear the set
      animationsSet.current.clear();
      
      // Kill ScrollTriggers
      ScrollTrigger.getAll()
        .filter(trigger => {
          const triggerElement = trigger.vars.trigger;
          return triggerElement instanceof Element && 
                 visibleSections.some(id => triggerElement.id === id);
        })
        .forEach(trigger => trigger.kill());
    };
  }, [isMobile]);
};
