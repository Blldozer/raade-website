
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useFutureShowcaseAnimation = () => {
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    const section = document.querySelector('#future-showcase');
    
    if (!section) return;
    
    // Create a single animation timeline for better performance
    const tl = gsap.timeline({
      paused: true,
      defaults: { 
        ease: "power2.out",
        clearProps: "opacity" // Clear opacity after animation for better performance
      }
    });
    
    // Get all elements we need to animate
    const header = section.querySelector('.content-element:not(.opacity-100)');
    const projectCards = section.querySelectorAll('.project-card');
    
    // Add animations to timeline
    if (header) {
      tl.fromTo(header,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 }
      );
    }
    
    // Reduce staggering on mobile for better performance
    const staggerAmount = isMobile ? 0.1 : 0.15;
    
    // Add project cards with staggered animations
    if (projectCards.length) {
      // Simpler animation for mobile (just fade in)
      if (isMobile) {
        tl.fromTo(projectCards,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, stagger: staggerAmount },
          "-=0.1"
        );
      } else {
        // More complex animation for desktop
        projectCards.forEach((card, i) => {
          tl.fromTo(card,
            { x: i % 2 === 0 ? -30 : 30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.6 },
            i === 0 ? "-=0.1" : "-=0.3" // Overlap animations slightly
          );
        });
      }
    }
    
    // Create a single ScrollTrigger with optimization flags
    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? "top 85%" : "top 75%",
      once: true, // Only trigger once for better performance
      fastScrollEnd: true,
      onEnter: () => {
        // Use RAF for smoother animation start
        requestAnimationFrame(() => {
          tl.play();
        });
      }
    });
    
    return () => {
      // Proper cleanup
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);
};
