
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ConferenceHero from "./conference/ConferenceHero";
import ConferenceOverview from "./conference/ConferenceOverview";
import ConferenceWhy from "./conference/ConferenceWhy";
import ConferenceRegistration from "./conference/ConferenceRegistration";
import ConferenceFinalCta from "./conference/ConferenceFinalCta";
import ConferenceSpeakers from "./conference/ConferenceSpeakers";
import DonationSection from "./donation/DonationSection";

/**
 * Conference component - Main container for all conference-related sections
 * 
 * Features:
 * - Organizes the display flow of conference information sections
 * - Implements scroll animations for better user engagement
 * - Maintains proper section ordering for information hierarchy
 * - Optimized for both mobile and desktop viewing
 */
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
      <section id="overview">
        <ConferenceOverview />
      </section>
      
      {/* Why Attend Section - Added id to match navigation target */}
      <section id="why-attend">
        <ConferenceWhy />
      </section>
      
      {/* Speakers Section */}
      <section id="speakers">
        <ConferenceSpeakers />
      </section>
      
      {/* Registration Options */}
      <section id="registration">
        <ConferenceRegistration />
      </section>
      
      {/* Donation Section */}
      <section id="donate">
        <DonationSection />
      </section>
      
      {/* Final CTA */}
      <ConferenceFinalCta />
    </>
  );
};

export default Conference;
