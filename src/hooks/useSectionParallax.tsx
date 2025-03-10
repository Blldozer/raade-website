
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useSectionParallax = (sectionId: string, depth: number = 0.2) => {
  const { isMobile, isTablet } = useResponsive();
  
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const parallaxElements = section.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    // Reduce parallax effect on mobile to prevent elements from overlapping
    const adjustedDepth = isMobile ? depth * 0.4 : isTablet ? depth * 0.7 : depth;
    
    // Create a container for all animations in this section
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
    
    parallaxElements.forEach((element, index) => {
      // Calculate a slightly different depth for each element to create layering
      // Use smaller values on mobile for better visibility
      const elementDepth = adjustedDepth * (1 + (index * (isMobile ? 0.05 : 0.1)));
      
      // Make sure z-index is properly applied to avoid overlap issues
      if (element instanceof Element) {
        const currentStyles = window.getComputedStyle(element);
        const currentZIndex = parseInt(currentStyles.zIndex) || 0;
        
        // Apply z-index in reverse order of parallax depth to prevent background elements
        // from appearing in front of foreground elements
        element.setAttribute('style', `${element.getAttribute('style') || ''}; z-index: ${100 - Math.round(elementDepth * 100)};`);
      }
      
      sectionTimeline.to(element, {
        y: `${elementDepth * 100}%`,
        ease: "none",
      }, 0); // The '0' means all animations start together
    });
    
    return () => {
      // Clean up all ScrollTriggers related to this section
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerVars = trigger.vars;
        // Check if the trigger element is our section
        if (triggerVars.trigger && 
            triggerVars.trigger instanceof Element && 
            triggerVars.trigger.id === sectionId) {
          trigger.kill();
        }
      });
    };
  }, [sectionId, depth, isMobile, isTablet]);
};
