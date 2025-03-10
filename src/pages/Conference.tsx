import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Conference from "@/components/Conference";

const ConferencePage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Update page title to reflect Day Forum instead of Conference
    document.title = "RAADE | Day Forum";
    
    // Set initial nav background attribute for proper contrast
    const setNavBackground = () => {
      // For the hero section (which has a dark background), set "dark"
      // As user scrolls down to white sections, this will be updated dynamically
      document.body.setAttribute('data-nav-background', 'dark');
    };
    
    setNavBackground();
    
    // Add scroll listener to update nav background attribute based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
      // If we're in the hero section (dark background), use "dark" 
      // Otherwise in the white content sections, use "light"
      if (scrollPosition < heroHeight) {
        document.body.setAttribute('data-nav-background', 'dark');
      } else {
        document.body.setAttribute('data-nav-background', 'light');
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="relative">
      <Navigation isHeroPage={true} forceDarkMode={false} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
