
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
    document.body.setAttribute('data-nav-background', 'light');
    
    // Clean up function to reset the attribute when component unmounts
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  return (
    <div className="relative">
      <Navigation isHeroPage={true} forceDarkMode={true} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
