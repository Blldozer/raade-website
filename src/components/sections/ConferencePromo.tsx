
import React, { useRef, useEffect } from 'react';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Set data attribute for navigation background color
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.setAttribute('data-nav-background', 'dark');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-[var(--navbar-height)]"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 md:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side: Conference Info */}
          <div className="content-element opacity-100">
            <ConferenceInfo />
          </div>
          
          {/* Right side: Countdown */}
          <div className="content-element opacity-100">
            <EnhancedCountdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePromo;
