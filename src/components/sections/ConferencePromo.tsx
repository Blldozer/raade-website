
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

const ConferencePromo = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      {/* Card effect shadow and border */}
      <div className="absolute inset-0 shadow-lg rounded-b-3xl pointer-events-none"></div>
      
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20 lg:py-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Conference Info */}
          <ConferenceInfo />
          
          {/* Right side: Countdown */}
          <EnhancedCountdown />
        </div>
      </div>
    </div>
  );
};

export default ConferencePromo;
