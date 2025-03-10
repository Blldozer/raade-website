
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
    
    // Disable parallax on mobile for better performance and visibility
    if (isMobile) {
      parallaxElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.transform = 'none';
        }
      });
      return;
    }
    
    // Reduce effect on tablet
    const adjustedDepth = isTablet ? depth * 0.5 : depth;
    
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
    
    parallaxElements.forEach((element, index) => {
      if (!(element instanceof HTMLElement)) return;
      
      // Calculate z-index based on depth - deeper elements should be behind
      const zIndex = Math.round(100 - (index * 10));
      element.style.zIndex = `${zIndex}`;
      
      // Ensure proper stacking with transform-style
      element.style.transformStyle = 'preserve-3d';
      
      // Add perspective for 3D effect
      element.style.perspective = '1000px';
      
      sectionTimeline.to(element, {
        y: `${adjustedDepth * 100 * (index + 1)}%`,
        ease: "none",
      }, 0);
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [sectionId, depth, isMobile, isTablet]);
};
