
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ConferenceHero from "./conference/ConferenceHero";
import ConferenceOverview from "./conference/ConferenceOverview";
import ConferenceWhy from "./conference/ConferenceWhy";
import ConferenceRegistration from "./conference/ConferenceRegistration";
import ConferenceFinalCta from "./conference/ConferenceFinalCta";
// Import commented out but kept for future use
// import ConferenceSchedule from "./conference/ConferenceSchedule";
// import ConferenceVenue from "./conference/ConferenceVenue";
// import ConferenceSponsors from "./conference/ConferenceSponsors";

const Conference = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <ConferenceHero />
      
      {/* Conference Overview */}
      <ConferenceOverview />
      
      {/* Why Attend Section */}
      <ConferenceWhy />
      
      {/* Schedule Section - Hidden for now */}
      {/* <section id="schedule">
        <ConferenceSchedule />
      </section> */}
      
      {/* Registration Options */}
      <section id="registration">
        <ConferenceRegistration />
      </section>
      
      {/* Venue and Location - Hidden for now */}
      {/* <section id="venue">
        <ConferenceVenue />
      </section> */}
      
      {/* Sponsors Section - Hidden until sponsors are confirmed */}
      {/* <ConferenceSponsors /> */}
      
      {/* Final CTA */}
      <ConferenceFinalCta />
    </>
  );
};

export default Conference;
