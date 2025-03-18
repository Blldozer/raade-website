
import React from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroLeftContent from "./hero/HeroLeftContent";
import ScrollIndicator from "./hero/ScrollIndicator";

/**
 * ConferenceHero Component
 * 
 * Main hero section for the conference page with:
 * - Gradient background with decorative elements
 * - Centered content with heading and CTA
 * - Scroll indicator to guide users
 */
const ConferenceHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient, team image, and Africa outline */}
      <HeroBackground />
      
      {/* Main content container - using full width with higher z-index to ensure visibility */}
      <div className="container max-w-7xl mx-auto relative z-10 pt-[var(--navbar-height)] px-4 md:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        {/* Centered hero content */}
        <HeroLeftContent />
      </div>
      
      {/* Scroll indicator at the bottom */}
      <ScrollIndicator />
    </div>
  );
};

export default ConferenceHero;
