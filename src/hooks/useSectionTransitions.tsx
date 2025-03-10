
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

    // Mark sections with data attributes for light/dark backgrounds
    // Dark backgrounds - use white logo and light contrast buttons
    document.querySelectorAll('#hero, #transition-hook, #transition-stat, #conference-promo').forEach(section => {
      section.setAttribute('data-background', 'dark');
    });
    
    // Light backgrounds - use black logo and dark contrast buttons
    document.querySelectorAll('#future-showcase, #join').forEach(section => {
      section.setAttribute('data-background', 'light');
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
          scale: 1
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

    // Setup background detection for navigation
    const updateNavBackground = () => {
      const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
      let currentBackground = 'dark'; // Default to dark (for hero section)
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // If scrollPosition is within this section, update the current background
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentBackground = section.getAttribute('data-background') || 'light';
        }
      });
      
      // Set data attribute on document body for global access
      document.body.setAttribute('data-nav-background', currentBackground);
    };

    // Initial update
    updateNavBackground();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavBackground);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', updateNavBackground);
    };
  }, []);
};
