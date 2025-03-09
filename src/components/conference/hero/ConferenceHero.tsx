
import React from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import ScrollIndicator from "./ScrollIndicator";

const ConferenceHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient, patterns and animations */}
      <HeroBackground />
      
      {/* Main content container */}
      <div className="container max-w-7xl mx-auto relative z-20 pt-20 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left side content with text and buttons */}
        <HeroContent />
        
        {/* Right side visual with animated text */}
        <HeroVisual />
      </div>
      
      {/* Scroll indicator at the bottom */}
      <ScrollIndicator />
    </div>
  );
};

export default ConferenceHero;
