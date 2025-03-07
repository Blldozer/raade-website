
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import ConferenceComponent from "@/components/Conference";

const Conference = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Navigation isHeroPage={false} />
      <ConferenceComponent />
    </div>
  );
};

export default Conference;
