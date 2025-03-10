
import React from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroLeftContent from "./hero/HeroLeftContent";
import ScrollIndicator from "./hero/ScrollIndicator";
import EnhancedCountdown from "../sections/conference/EnhancedCountdown";

const ConferenceHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient and Africa outline */}
      <HeroBackground />
      
      {/* Main content container - using full width now */}
      <div className="container max-w-7xl mx-auto relative z-20 pt-20 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        {/* Countdown Timer at the top */}
        <div className="w-full max-w-4xl mb-8">
          <EnhancedCountdown />
        </div>
        
        {/* Centered content with combined information */}
        <HeroLeftContent />
      </div>
      
      {/* Scroll indicator at the bottom */}
      <ScrollIndicator />
    </div>
  );
};

export default ConferenceHero;
