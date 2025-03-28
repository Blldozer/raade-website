
import React, { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Mic, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * HeroLeftContent Component
 * 
 * Displays the main conference information with:
 * - Consistent fluid typography that works across all devices
 * - Optimized text scaling for Android and other mobile platforms
 * - Staggered animations for visual interest
 */
const HeroLeftContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-4xl mx-auto py-10 z-10 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(1rem,5vw,1.25rem)] font-medium text-white font-lora"
        >
          Join us at the RAADE
        </motion.p>
        
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(2.5rem,10vw,4.5rem)] font-bold font-simula text-white leading-[1.1]"
            style={{ willChange: "transform, opacity" }}
          >
            AFRICAN
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(2.5rem,10vw,4.5rem)] font-bold font-simula text-white leading-[1.1]"
            style={{ willChange: "transform, opacity" }}
          >
            DEVELOPMENT FORUM
          </motion.h2>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "40%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-1 bg-[#FBB03B] mx-auto mt-4"
            style={{ willChange: "width, opacity" }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[clamp(1.25rem,5vw,2rem)] font-simula font-medium text-white mt-6"
          >
            Building Pathways to the Future
          </motion.p>
        </div>

        {/* Forum highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full flex items-center gap-2">
            <Mic className="text-[#FBB03B] h-4 w-4" />
            <p className="text-white font-lora font-medium">10+ Speakers</p>
          </div>
          <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full flex items-center gap-2">
            <Lightbulb className="text-[#FBB03B] h-4 w-4" />
            <p className="text-white font-lora font-medium">5 Workshops</p>
          </div>
          <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full flex items-center gap-2">
            <Users className="text-[#FBB03B] h-4 w-4" />
            <p className="text-white font-lora font-medium">100+ Attendees</p>
          </div>
        </motion.div>

        {/* Event details */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center">
            <Calendar className="mr-3 h-5 w-5 text-[#FBB03B]" />
            <p className="text-white font-lora font-medium">April 11-12, 2025</p>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-3 h-5 w-5 text-[#FBB03B]" />
            <p className="text-white font-lora font-medium">Rice University, Houston, TX</p>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-[clamp(1rem,4vw,1.125rem)] font-medium text-white/90 max-w-2xl mx-auto font-lora mt-6"
        >
          The RAADE Forum brings together innovative minds to discuss sustainable 
          solutions for Africa's development. With a spotlight on student-led innovation,
          this forum is the foremost platform for changemakers passionate about 
          advancing Africa's future.
        </motion.p>

        {/* Register Now button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="pt-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/conference/register")} 
            className="px-8 py-3 bg-[#FBB03B] text-white rounded-md font-medium transition-all hover:bg-[#FBB03B]/90 font-lora shadow-md"
            style={{ willChange: "transform" }}
          >
            Register Now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(HeroLeftContent);
