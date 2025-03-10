
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div className="w-full lg:w-1/2 lg:pr-12 py-10 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-[clamp(1rem,2vw,2rem)]"
      >
        <p className="text-xl font-medium text-white font-lora">
          Join us at the Annual RAADE Conference
        </p>
        
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold font-simula text-white"
          >
            AFRICA 
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl lg:text-6xl font-bold font-simula text-white"
          >
            INNOVATION
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "60%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-[#FBB03B] mt-2 mb-5"
          />
          <p className="text-2xl font-simula text-white mt-2">
            Building Pathways to the Future
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center">
            <Calendar className="mr-3 h-6 w-6 text-[#FBB03B]" />
            <p className="text-white font-lora font-medium text-lg">April 11-12, 2025</p>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-3 h-6 w-6 text-[#FBB03B]" />
            <p className="text-white font-lora font-medium text-lg">Rice University, Houston, TX</p>
          </div>
        </div>

        <p className="text-lg text-white/90 max-w-lg font-lora">
          The RAADE Conference brings together innovative minds to discuss sustainable 
          solutions for Africa's development. With a spotlight on student-led innovation,
          this conference is the foremost platform for changemakers passionate about 
          advancing Africa's future.
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/conference/register"} 
            className="px-8 py-3 bg-[#FBB03B] text-white rounded-md font-medium transition-all hover:bg-[#FBB03B]/90 font-lora shadow-md"
          >
            Register Now
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const scheduleSection = document.getElementById('schedule');
              scheduleSection?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="px-8 py-3 border-2 border-white text-white rounded-md font-medium transition-all hover:bg-white/10 font-lora"
          >
            View Schedule
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
