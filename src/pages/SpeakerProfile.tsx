
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import SpeakerProfile from "@/components/conference/speaker/SpeakerProfile";
import Footer from "@/components/Footer";

const SpeakerProfilePage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Navigation isHeroPage={false} forceDarkMode={false} />
      <SpeakerProfile />
      <Footer />
    </div>
  );
};

export default SpeakerProfilePage;
