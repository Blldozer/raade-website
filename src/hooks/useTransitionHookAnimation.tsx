import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins, safeKillTimeline, safeKillScrollTrigger, isElementInDOM } from '@/utils/gsapUtils';

// Register plugins using our centralized utility
registerGsapPlugins();

/**
 * Custom hook for transition hook animations
 * Handles animations with proper error handling and cleanup
 * 
 * @param abortSignal - Optional AbortController signal for cleanup
 * @returns void
 */
export const useTransitionHookAnimation = (abortSignal?: AbortSignal) => {
  // Create refs outside useEffect to avoid issues with React initialization
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isInitialized = useRef<boolean>(false);
  
  useEffect(() => {
    // Skip initialization if the component is already being unmounted
    if (abortSignal && abortSignal.aborted) {
      console.log("TransitionHookAnimation: Abort signal received, skipping initialization");
      return;
    }

    // Use a small timeout to ensure React is fully initialized
    const initTimeout = setTimeout(() => {
      try {
        console.log("TransitionHookAnimation: Initializing");
        
        // Check if already initialized to prevent duplicate initialization
        if (isInitialized.current) {
          console.log("TransitionHookAnimation: Already initialized, skipping");
          return;
        }
        
        // Get responsive state directly within the effect rather than using the hook
        const isMobile = window.innerWidth < 768;
        
        const section = document.querySelector('#transition-hook');
        
        if (!isElementInDOM(section)) {
          console.warn("TransitionHookAnimation: Section not found");
          return;
        }
        
        // Create a timeline for this section
        const tl = gsap.timeline({ 
          paused: true,
          defaults: { 
            ease: "power2.out",
            clearProps: "opacity" // Clear properties after animation for better performance
          },
          onComplete: () => {
            // Optional: Clean up will-change property after animation completes
            if (!section) return;
            const elements = section.querySelectorAll('h2, p, button');
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.willChange = 'auto';
              }
            });
          }
        });
        
        timeline.current = tl;
        
        // Get all elements we need to animate
        if (!section) return;
        const heading = section.querySelector("h2");
        const paragraphText = section.querySelector("p");
        const scrollButton = section.querySelector("button");
        
        // Set will-change for elements that will be animated for better performance
        [heading, paragraphText, scrollButton].forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.willChange = 'opacity, transform';
          }
        });
        
        // Add animations to timeline if elements exist
        if (heading) {
          tl.fromTo(heading, 
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 }
          );
        }
        
        if (paragraphText) {
          tl.fromTo(paragraphText,
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 },
            "-=0.2" // Slight overlap
          );
        }
        
        if (scrollButton) {
          tl.fromTo(scrollButton,
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 },
            "-=0.2" // Slight overlap
          );
        }
        
        // Create a ScrollTrigger with error handling
        try {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: section,
            start: isMobile ? "top 85%" : "top 75%",
            once: true, // Only trigger once for better performance
            onEnter: () => {
              try {
                if (timeline.current && !abortSignal?.aborted) {
                  // Use RAF for smoother animation
                  requestAnimationFrame(() => {
                    if (timeline.current && !abortSignal?.aborted) {
                      timeline.current.play();
                    }
                  });
                }
              } catch (err) {
                console.error("Error playing animation:", err);
              }
            }
          });
          
          isInitialized.current = true;
        } catch (err) {
          console.error("Error creating ScrollTrigger:", err);
        }
        
        console.log("TransitionHookAnimation: Initialized successfully");
      } catch (error) {
        console.error("Error in TransitionHookAnimation:", error);
      }
    }, 100); // Small delay to ensure React is ready
    
    // Cleanup function with error handling
    return () => {
      clearTimeout(initTimeout);
      
      try {
        console.log("TransitionHookAnimation: Cleaning up");
        
        // Kill the timeline safely
        safeKillTimeline(timeline.current);
        timeline.current = null;
        
        // Kill the ScrollTrigger safely
        safeKillScrollTrigger(scrollTriggerRef.current);
        scrollTriggerRef.current = null;
        
        isInitialized.current = false;
      } catch (error) {
        console.error("Error cleaning up TransitionHookAnimation:", error);
      }
    };
  }, [abortSignal]); // Only re-run if abort signal changes
};
