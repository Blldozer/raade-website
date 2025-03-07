
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Conference from "@/components/Conference";

const ConferencePage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Navigation isHeroPage={true} forceDarkMode={true} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
