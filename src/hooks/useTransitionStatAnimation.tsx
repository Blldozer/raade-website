
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation hook for the TransitionStat component
 * Creates animated entrance effects for the statistics section
 * 
 * Modified to avoid circular dependency issues and ensure proper initialization
 * with better error handling
 */
export const useTransitionStatAnimation = () => {
  // Create refs outside useEffect to avoid issues with React initialization
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    // Use a small timeout to ensure React is fully initialized
    const initTimeout = setTimeout(() => {
      try {
        console.log("TransitionStatAnimation: Initializing");
        
        // Check if window exists to prevent SSR issues
        if (typeof window === 'undefined') {
          console.warn("TransitionStatAnimation: Window not available");
          return;
        }
        
        // Get responsive state directly within the effect
        const isMobile = window.innerWidth < 768;
        
        const section = document.querySelector('#transition-stat');
        
        if (!section) {
          console.warn("TransitionStatAnimation: Section not found");
          return;
        }
        
        // Create a single animation timeline for better performance
        const tl = gsap.timeline({
          paused: true,
          defaults: { 
            ease: "power2.out",
            clearProps: "scale" // Important for performance
          }
        });
        
        timelineRef.current = tl;
        
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
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 75%", // Trigger earlier
          once: true, // Only trigger once for better performance
          fastScrollEnd: true,
          onEnter: () => {
            // Use RAF for smoother animation start
            requestAnimationFrame(() => {
              if (timelineRef.current) {
                timelineRef.current.play();
              }
            });
          }
        });
        
        triggerRef.current = trigger;
        
        console.log("TransitionStatAnimation: Initialized successfully");
      } catch (error) {
        console.error("Error in TransitionStatAnimation:", error);
      }
    }, 300); // Small delay to ensure React is ready
    
    return () => {
      clearTimeout(initTimeout);
      
      try {
        console.log("TransitionStatAnimation: Cleaning up");
        
        // Proper cleanup
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        
        if (triggerRef.current) {
          triggerRef.current.kill();
          triggerRef.current = null;
        }
      } catch (error) {
        console.error("Error cleaning up TransitionStatAnimation:", error);
      }
    };
  }, []);
};

export default useTransitionStatAnimation;
