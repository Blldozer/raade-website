import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DonationSection from "./donation/DonationSection";

/**
 * ConferenceRegistration Component - UPDATED TO SHOW REGISTRATION CLOSED
 * 
 * Displays a message that registration for the RAADE conference has closed.
 * Optimized for both desktop and mobile viewing with responsive grid layout.
 */
const ConferenceRegistration = () => {
  const navigate = useNavigate();
  
  const handleConferenceInfoClick = () => {
    // Navigate to conference page general info
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <section id="registration" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* First row: Title on left (39%), empty space on right (61%) */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%] mb-6 lg:mb-0"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Registration
            </h2>
          </motion.div>
          
          {/* Empty right spacer - 61% */}
          <motion.div 
            className="lg:w-[61%]" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Intentionally empty for layout */}
          </motion.div>
        </div>

        {/* Second row: Empty space on left (39%), paragraph on right (61%) */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 flex flex-col items-center mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-red-700">Registration is Now Closed</h3>
              </div>
              <p className="text-gray-700 text-center font-lora mb-4">
                Thank you for your interest in the RAADE African Development Forum 2025. 
                We've reached capacity and registration has closed. We look forward to seeing registered attendees at Rice University!
              </p>
              <p className="text-gray-600 text-center font-lora text-sm">
                For any questions regarding your registration or the conference, please contact us at{" "}
                <a href="mailto:raade@rice.edu" className="text-raade-navy underline">raade@rice.edu</a>
              </p>
            </div>
            
            <p className="text-xl font-lora text-black leading-relaxed max-w-[800px]">
              The RAADE 2025 African Development Forum will take place on April 11-12, 2025 at Rice University.
            </p>
          </motion.div>
        </div>
        
        {/* Donation Section - Keep this section */}
        <div className="mt-16">
          <DonationSection />
        </div>
      </div>
    </section>
  );
};

export default ConferenceRegistration;
