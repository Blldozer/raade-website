import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Set data attribute for navigation background color
  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;
    
    // Explicitly set data-background to light for this section
    section.setAttribute('data-background', 'light');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When this section is visible, the navbar should be dark
            document.body.setAttribute('data-nav-background', 'dark');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(section);
    
    // Set up animations specifically for this section
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        const infoElement = section.querySelector('.conference-info');
        const countdownElement = section.querySelector('.conference-countdown');
        
        if (infoElement) {
          gsap.fromTo(infoElement,
            { x: -30, autoAlpha: 0.7 },
            { 
              x: 0, 
              autoAlpha: 1, 
              duration: 0.8, 
              ease: "power2.out" 
            }
          );
        }
        
        if (countdownElement) {
          gsap.fromTo(countdownElement,
            { x: 30, autoAlpha: 0.7 },
            { 
              x: 0, 
              autoAlpha: 1, 
              duration: 0.8, 
              delay: 0.2,
              ease: "power2.out" 
            }
          );
        }
      }
    });
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) {
          t.kill();
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-[var(--navbar-height)]"
      style={{ opacity: 1 }}
      data-background="light"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 md:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side: Conference Info */}
          <div className="conference-info opacity-100">
            <ConferenceInfo />
          </div>
          
          {/* Right side: Countdown */}
          <div className="conference-countdown opacity-100">
            <EnhancedCountdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePromo;
