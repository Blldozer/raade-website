
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

/**
 * RegistrationClosed Component
 * 
 * Displays a message informing users that registration for the conference has closed.
 * Provides event details and a button to return to the main conference page.
 */
const RegistrationClosed = () => {
  const navigate = useNavigate();
  
  const handleBackToConference = () => {
    navigate("/conference");
    window.scrollTo(0, 0);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 my-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-raade-navy dark:text-white mb-4 font-simula">
          Registration is Now Closed
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-lora text-lg">
          Thank you for your interest in the RAADE African Development Forum 2025.
        </p>
        <p className="text-gray-600 dark:text-gray-300 font-lora mt-4">
          We've reached capacity and registration has closed. We look forward to seeing registered attendees at Rice University!
        </p>
      </div>
      
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 my-6">
        <h3 className="text-xl font-simula text-raade-navy dark:text-white mb-4">
          Conference Details
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-[#FBB03B] mr-3 mt-1" />
            <div>
              <p className="font-bold font-lora">April 11-12, 2025</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-lora">
                Day 1: 4:00 PM - 8:30 PM<br />
                Day 2: 8:00 AM - 9:00 PM
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-[#FBB03B] mr-3 mt-1" />
            <div>
              <p className="font-bold font-lora">Rice University, Houston, TX</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-lora">
                Day 1: Multicultural Center<br />
                Day 2: Glasscock School of Continuing Studies
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 font-lora mb-6">
          For any questions regarding your registration or the conference, please contact us at <a href="mailto:raade@rice.edu" className="text-raade-navy dark:text-blue-400 underline">raade@rice.edu</a>.
        </p>
        
        <Button 
          onClick={handleBackToConference}
          className="bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
        >
          Back to Conference Information
        </Button>
      </div>
    </motion.div>
  );
};

export default RegistrationClosed;
