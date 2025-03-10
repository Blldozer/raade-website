
import React from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroLeftContent from "./hero/HeroLeftContent";
import ScrollIndicator from "./hero/ScrollIndicator";

const ConferenceHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient and Africa outline */}
      <HeroBackground />
      
      {/* Main content container - using full width now */}
      <div className="container max-w-7xl mx-auto relative z-20 pt-20 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        {/* Centered content with combined information */}
        <HeroLeftContent />
      </div>
      
      {/* Scroll indicator at the bottom */}
      <ScrollIndicator />
    </div>
  );
};

export default ConferenceHero;
