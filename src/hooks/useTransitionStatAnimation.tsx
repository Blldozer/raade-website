import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins, safeKillTimeline, safeKillScrollTrigger, isElementInDOM } from '@/utils/gsapUtils';

// Register plugins once with our centralized utility
registerGsapPlugins();

/**
 * Animation hook for the TransitionStat component
 * Creates animated entrance effects for the statistics section
 * 
 * @param abortSignal - Optional AbortController signal for cleanup
 * @returns void
 */
export const useTransitionStatAnimation = (abortSignal?: AbortSignal) => {
  // Create refs outside useEffect to avoid issues with React initialization
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const isInitialized = useRef<boolean>(false);
  
  useEffect(() => {
    // Skip initialization if the component is already being unmounted
    if (abortSignal && abortSignal.aborted) {
      console.log("TransitionStatAnimation: Abort signal received, skipping initialization");
      return;
    }
    
    // Use a small timeout to ensure React is fully initialized
    const initTimeout = setTimeout(() => {
      try {
        console.log("TransitionStatAnimation: Initializing");
        
        // Check if already initialized to prevent duplicate initialization
        if (isInitialized.current) {
          console.log("TransitionStatAnimation: Already initialized, skipping");
          return;
        }
        
        // Get responsive state directly within the effect
        const isMobile = window.innerWidth < 768;
        
        const section = document.querySelector('#transition-stat');
        
        if (!isElementInDOM(section)) {
          console.warn("TransitionStatAnimation: Section not found");
          return;
        }
        
        // Create a single animation timeline for better performance
        const tl = gsap.timeline({
          paused: true,
          defaults: { 
            ease: "power2.out",
            clearProps: "scale" // Important for performance
          },
          onComplete: () => {
            // Optional: Clean up will-change property after animation completes
            if (!section) return;
            const elements = section.querySelectorAll('.stat-counter, .content-element');
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.willChange = 'auto';
              }
            });
          }
        });
        
        timelineRef.current = tl;
        
        // Batch animations in a single timeline
        if (!section) return;
        const statCounter = section.querySelector(".stat-counter");
        // Target all content elements regardless of their opacity class
        const contentElements = section.querySelectorAll(".content-element");
        
        // Set will-change for elements that will be animated
        if (statCounter && statCounter instanceof HTMLElement) {
          statCounter.style.willChange = 'opacity, transform';
        }
        
        contentElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.willChange = 'opacity, transform';
          }
        });
        
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
        try {
          triggerRef.current = ScrollTrigger.create({
            trigger: section,
            start: isMobile ? "top 85%" : "top 75%", // Trigger earlier
            once: true, // Only trigger once for better performance
            fastScrollEnd: true,
            onEnter: () => {
              if (!abortSignal?.aborted && timelineRef.current) {
                // Use RAF for smoother animation start
                requestAnimationFrame(() => {
                  if (timelineRef.current && !abortSignal?.aborted) {
                    timelineRef.current.play();
                  }
                });
              }
            }
          });
          
          isInitialized.current = true;
          console.log("TransitionStatAnimation: Initialized successfully");
        } catch (err) {
          console.error("Error creating ScrollTrigger:", err);
        }
      } catch (error) {
        console.error("Error in TransitionStatAnimation:", error);
      }
    }, 100); // Small delay to ensure React is ready
    
    // Cleanup function with error handling
    return () => {
      clearTimeout(initTimeout);
      
      try {
        console.log("TransitionStatAnimation: Cleaning up");
        
        // Safely kill the timeline
        safeKillTimeline(timelineRef.current);
        timelineRef.current = null;
        
        // Safely kill the ScrollTrigger
        safeKillScrollTrigger(triggerRef.current);
        triggerRef.current = null;
        
        isInitialized.current = false;
      } catch (error) {
        console.error("Error cleaning up TransitionStatAnimation:", error);
      }
    };
  }, [abortSignal]); // Only re-run if abort signal changes
};
