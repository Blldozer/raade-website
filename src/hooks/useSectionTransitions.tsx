
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionTransitions = () => {
  useEffect(() => {
    // Mark sections with data attributes for light/dark backgrounds
    document.querySelectorAll('#hero, #transition-hook').forEach(section => {
      section.setAttribute('data-background', 'dark');
    });
    
    document.querySelectorAll('#conference-promo, #transition-stat, #future-showcase, #join').forEach(section => {
      section.setAttribute('data-background', 'light');
    });

    // Get all sections except hero (which doesn't need a transition effect)
    const sections = document.querySelectorAll('section:not(#hero)');
    
    // Setup background detection for navigation
    const updateNavBackground = () => {
      const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
      let currentBackground = 'dark'; // Default to dark (for hero section)
      
      const allSections = document.querySelectorAll('section');
      allSections.forEach(section => {
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
    
    // Apply different transition effects to each section
    sections.forEach((section, index) => {
      // Do NOT hide sections initially - this was causing the content to be invisible
      // Instead, just set up scroll triggers to enhance the sections as they come into view
      
      // Create ScrollTrigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%", // Start when top of section is 80% from top of viewport
        end: "top 20%",   // End when top of section is 20% from top of viewport
        onEnter: () => {
          // Special handling for TransitionStat section
          if (section.id === "transition-stat") {
            // Animate stat counter with a scale effect
            const statCounter = section.querySelector(".stat-counter");
            if (statCounter) {
              gsap.fromTo(statCounter, 
                { scale: 0.9, autoAlpha: 0 },
                { 
                  scale: 1, 
                  autoAlpha: 1, 
                  duration: 1.2, 
                  ease: "back.out(1.2)",
                  delay: 0.3
                }
              );
            }
            
            // Animate the description text that appears after the stat
            const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
            if (contentElements.length) {
              gsap.fromTo(contentElements,
                { y: 20, autoAlpha: 0 },
                { 
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  stagger: 0.4, // Stagger the animation of multiple elements
                  delay: 1.2, // Start after stat counter finishes
                  ease: "power2.out"
                }
              );
            }
          }
          // Special handling for TransitionHook section
          else if (section.id === "transition-hook") {
            // Animate the heading separately with a more dramatic reveal
            const heading = section.querySelector("h2");
            if (heading) {
              gsap.fromTo(heading, 
                { y: 50, autoAlpha: 0 },
                { 
                  y: 0, 
                  autoAlpha: 1, 
                  duration: 1, 
                  ease: "power3.out",
                  delay: 0.3
                }
              );
            }
            
            // Animate the paragraph text
            const paragraphText = section.querySelector("p");
            if (paragraphText) {
              gsap.fromTo(paragraphText,
                { y: 20, autoAlpha: 0 },
                { 
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  delay: 1.1,
                  ease: "power2.out"
                }
              );
            }
            
            // Animate the scroll button with a continuous bounce
            const scrollButton = section.querySelector("button");
            if (scrollButton) {
              gsap.fromTo(scrollButton,
                { y: 20, autoAlpha: 0 },
                { 
                  y: 0, 
                  autoAlpha: 1, 
                  duration: 0.8,
                  delay: 1.5,
                  ease: "power2.out",
                  onComplete: () => {
                    // Add the continuous bounce animation after the entrance animation
                    gsap.to(scrollButton, {
                      y: "10px",
                      repeat: -1,
                      yoyo: true,
                      duration: 1,
                      ease: "sine.inOut"
                    });
                  }
                }
              );
            }
          }
          // Special handling for Future Showcase section
          else if (section.id === "future-showcase") {
            // Animate the header content
            const header = section.querySelector('.content-element:not(.opacity-100)');
            if (header) {
              gsap.fromTo(header,
                { y: 30, autoAlpha: 0 },
                { 
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  delay: 0.2,
                  ease: "power2.out"
                }
              );
            }

            // Finally animate the project cards
            const projectCards = section.querySelectorAll('.project-card');
            projectCards.forEach((card, i) => {
              gsap.fromTo(card,
                { x: i % 2 === 0 ? -50 : 50, autoAlpha: 0 },
                { 
                  x: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  delay: 0.4 + (i * 0.15),
                  ease: "power2.out"
                }
              );
            });
          } else {
            // For other sections, identify and animate any content elements that don't have opacity-100
            const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
            if (contentElements.length) {
              gsap.fromTo(contentElements,
                { y: 20, autoAlpha: 0 },
                { 
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  stagger: 0.3,
                  ease: "power2.out"
                }
              );
            }
          }
        }
        // We're removing the onLeaveBack handler that was making content disappear when scrolling back up
      });
      
      // Add subtle parallax effect to section backgrounds
      // This is a lightweight effect that won't cause performance issues
      const background = section.querySelector('.section-background');
      if (background) {
        gsap.to(background, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }
    });

    // Initial update for navigation
    updateNavBackground();
    
    // Update navigation background on scroll
    window.addEventListener('scroll', updateNavBackground);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', updateNavBackground);
    };
  }, []);
};
