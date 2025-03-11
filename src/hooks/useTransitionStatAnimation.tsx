
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useTransitionStatAnimation = () => {
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    const section = document.querySelector('#transition-stat');
    
    if (!section) return;
    
    // Create a single animation timeline for better performance
    const tl = gsap.timeline({
      paused: true,
      defaults: { 
        ease: "power2.out",
        clearProps: "scale" // Important for performance
      }
    });
    
    // Batch animations in a single timeline
    const statCounter = section.querySelector(".stat-counter");
    // Target all content elements regardless of their opacity class
    const contentElements = section.querySelectorAll(".content-element");
    
    if (statCounter) {
      tl.fromTo(statCounter, 
        { scale: 0.95, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "back.out(1.1)" }
      );
    }
    
    // Only animate content elements if they exist
    if (contentElements.length) {
      tl.fromTo(contentElements,
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.25 },
        "-=0.3" // Overlap with previous animation
      );
    }
    
    // Create a single ScrollTrigger with optimization settings
    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? "top 85%" : "top 75%", // Trigger earlier
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
