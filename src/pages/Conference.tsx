
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Conference from "@/components/Conference";

const ConferencePage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Update page title to reflect Day Forum instead of Conference
    document.title = "RAADE | Day Forum";
  }, []);
  
  return (
    <div>
      <Navigation isHeroPage={false} forceDarkMode={false} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
