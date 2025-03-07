
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ConferenceHero from "./conference/ConferenceHero";
import CountdownTimer from "./CountdownTimer";
import ConferenceSpeakers from "./conference/ConferenceSpeakers";
import ConferenceSchedule from "./conference/ConferenceSchedule";
import ConferenceSponsors from "./conference/ConferenceSponsors";
import SocialProof from "./conference/SocialProof";
import ConferenceOverview from "./conference/ConferenceOverview";
import ConferenceWhy from "./conference/ConferenceWhy";
import ConferenceRegistration from "./conference/ConferenceRegistration";
import ConferenceVenue from "./conference/ConferenceVenue";
import ConferenceFinalCta from "./conference/ConferenceFinalCta";

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
      
      {/* Floating Countdown Timer */}
      <CountdownTimer targetDate="2025-04-11T09:00:00" />
      
      {/* Conference Overview */}
      <ConferenceOverview />
      
      {/* Why Attend Section */}
      <ConferenceWhy />
      
      {/* Speakers Section */}
      <ConferenceSpeakers />
      
      {/* Schedule Section */}
      <ConferenceSchedule />
      
      {/* Registration Options */}
      <ConferenceRegistration />
      
      {/* Venue and Location */}
      <ConferenceVenue />
      
      {/* Sponsors Section */}
      <ConferenceSponsors />
      
      {/* Social Proof Section */}
      <SocialProof />
      
      {/* Final CTA */}
      <ConferenceFinalCta />
    </>
  );
};

export default Conference;
