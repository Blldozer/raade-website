
import React from "react";
import { Link } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";

/**
 * AboutNav Component - Special navigation for the About page
 * 
 * This component is now disabled as we're using the main Navigation component
 * to prevent duplicate navbars appearing. The code is kept for reference
 * but should not be used directly.
 * 
 * @deprecated Use the main Navigation component with isHeroPage prop instead
 */
const AboutNav = () => {
  console.warn("AboutNav component is deprecated and should not be used directly");
  
  // Return null to prevent rendering
  return null;
  
  /* Original implementation kept for reference but not used
  return (
    <NavigationProvider initialProps={{ forceDarkMode: true }}>
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center">
                <img 
                  src="/logos/RAADE-logo-final-white.png" 
                  alt="RAADE Logo" 
                  className="h-10" 
                />
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a 
                href="#model" 
                className="text-white hover:text-yellow-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("model")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Overview
              </a>
              <a 
                href="#approach" 
                className="text-white hover:text-yellow-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Our Approach
              </a>
              <a 
                href="#impact" 
                className="text-white hover:text-yellow-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Our Impact
              </a>
              <a 
                href="#team" 
                className="text-white hover:text-yellow-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Team
              </a>
              <Link to="/" className="text-white hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </NavigationProvider>
  );
  */
};

export default AboutNav;
