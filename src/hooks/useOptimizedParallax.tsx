
import { useEffect, useRef } from 'react';
import { useResponsive } from './useResponsive';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins } from '@/utils/gsapUtils';

/**
 * useOptimizedParallax Hook
 * 
 * Creates performant parallax effects for specific sections
 * Automatically adapts based on device capabilities
 */
export const useOptimizedParallax = () => {
  const { isMobile, isTablet } = useResponsive();
  const mountedRef = useRef(true);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);
  
  useEffect(() => {
    console.log("useOptimizedParallax: Initializing");
    mountedRef.current = true;
    
    // Register GSAP plugins safely
    try {
      registerGsapPlugins();
    } catch (error) {
      console.error("Failed to register GSAP plugins:", error);
      return;
    }
    
    // Skip parallax on mobile for better performance
    if (isMobile) {
      applySimplifiedParallax();
      return () => {
        mountedRef.current = false;
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }
    
    const sections = [
      { id: 'conference-promo', depth: 0.15 },
      { id: 'transition-stat', depth: 0.1 },
      { id: 'future-showcase', depth: 0.15 }
    ];
    
    const createdTriggers: ScrollTrigger[] = [];
    
    // Apply parallax to each section
    sections.forEach(({ id, depth }) => {
      try {
        const section = document.getElementById(id);
        if (!section) return;
        
        const parallaxElements = section.querySelectorAll('.parallax-element');
        if (parallaxElements.length === 0) return;
        
        const adjustedDepth = isTablet ? depth * 0.5 : depth;
        
        // Create a GSAP context for better cleanup
        const ctx = gsap.context(() => {
          // Create timeline with ScrollTrigger
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!mountedRef.current) return;
                
                if (!ticking.current) {
                  ticking.current = true;
                  
                  if (rafId.current) {
                    cancelAnimationFrame(rafId.current);
                  }
                  
                  rafId.current = requestAnimationFrame(() => {
                    if (!mountedRef.current) return;
                    
                    // Optimize rendering with will-change
                    parallaxElements.forEach(el => {
                      if (el instanceof HTMLElement) {
                        el.style.willChange = 'transform';
                      }
                    });
                    
                    ticking.current = false;
                  });
                }
              },
              onLeave: () => {
                if (!mountedRef.current) return;
                
                // Reset will-change when element is out of view
                parallaxElements.forEach(el => {
                  if (el instanceof HTMLElement) {
                    el.style.willChange = 'auto';
                  }
                });
              }
            }
          });
          
          // Add to created triggers for cleanup
          if (tl.scrollTrigger) {
            createdTriggers.push(tl.scrollTrigger);
          }
          
          // Apply parallax effect to each element
          parallaxElements.forEach((element, index) => {
            const elementDepth = adjustedDepth * (1 + (index * 0.05));
            tl.to(element, {
              y: `${elementDepth * 100}%`,
              ease: "none",
            }, 0);
          });
        }, section); // Scope to section for proper cleanup
        
      } catch (error) {
        console.error(`Error setting up parallax for section ${id}:`, error);
      }
    });
    
    return () => {
      console.log("useOptimizedParallax: Cleanup");
      mountedRef.current = false;
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      
      // Clean up all triggers
      createdTriggers.forEach(trigger => {
        try {
          if (trigger && typeof trigger.kill === 'function') {
            trigger.kill();
          }
        } catch (error) {
          console.error("Error killing ScrollTrigger during cleanup:", error);
        }
      });
    };
  }, [isMobile, isTablet]);
  
  // Simplified animation for mobile devices
  const applySimplifiedParallax = () => {
    console.log("Applying simplified parallax for mobile");
    const createdTriggers: ScrollTrigger[] = [];
    
    const sections = ['conference-promo', 'transition-stat', 'future-showcase'];
    
    sections.forEach(id => {
      try {
        const section = document.getElementById(id);
        if (!section) return;
        
        const parallaxElements = section.querySelectorAll('.parallax-element');
        if (parallaxElements.length === 0) return;
        
        // Create context for cleanup
        const ctx = gsap.context(() => {
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            once: true,
            onEnter: () => {
              if (!mountedRef.current) return;
              
              gsap.to(parallaxElements, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power1.out"
              });
            }
          });
          
          if (trigger) createdTriggers.push(trigger);
        }, section);
        
      } catch (error) {
        console.error(`Error setting up simplified parallax for section ${id}:`, error);
      }
    });
    
    return () => {
      console.log("Simplified parallax cleanup");
      createdTriggers.forEach(trigger => {
        try {
          if (trigger && typeof trigger.kill === 'function') {
            trigger.kill();
          }
        } catch (error) {
          console.error("Error killing ScrollTrigger during cleanup:", error);
        }
      });
    };
  };
};
