
import React, { useRef } from 'react';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Conference Info */}
          <div className="content-element">
            <ConferenceInfo />
          </div>
          
          {/* Right side: Countdown */}
          <div className="content-element">
            <EnhancedCountdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePromo;
