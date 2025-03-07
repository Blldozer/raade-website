
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
      
      {/* Countdown Section */}
      <section className="bg-white py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-gradient-to-r from-[#274675]/90 to-[#274675] p-8 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4 font-simula">Join us in</h2>
            <CountdownTimer targetDate="2025-04-11T09:00:00" className="text-[#FBB03B] font-bold" />
            <div className="mt-6">
              <Button 
                size="lg" 
                className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora mx-2" 
                onClick={() => navigate("/conference/register")}
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-[#274675] font-lora mx-2 mt-4 md:mt-0"
                onClick={() => {
                  const scheduleSection = document.getElementById('schedule');
                  scheduleSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
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
