
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionTransitions = () => {
  useEffect(() => {
    // Initialize performance optimizations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.willChange = 'transform, opacity';
      section.style.transform = 'translateZ(0)';
    });

    // Create scroll-triggered animations for each section
    sections.forEach((section, index) => {
      // Skip the hero section
      if (index === 0) return;

      // Fade and slide animation for section entry
      gsap.fromTo(section,
        { 
          opacity: 0,
          y: 50,
          scale: 1 // Remove zoom effect
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            scrub: 1
          }
        }
      );

      // Subtle parallax effect for section content
      const content = section.querySelector('.section-content');
      if (content) {
        gsap.to(content, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
