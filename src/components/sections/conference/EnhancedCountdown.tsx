
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountdownTimer from '../../CountdownTimer';

const EnhancedCountdown = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 md:p-16 lg:p-24 shadow-2xl border-2 border-white/20 hover:border-white/30 transition-all duration-300 w-full max-w-[150%] mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h3 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-simula mb-10"
          whileHover={{ scale: 1.05, color: "#FFA726" }}
          transition={{ duration: 0.2 }}
        >
          Time Remaining
        </motion.h3>
        <p className="text-white/70 font-lora mb-12 text-2xl md:text-3xl">Don't miss this opportunity to connect and collaborate</p>
        
        {/* Greatly enlarged countdown timer with better visibility */}
        <motion.div
          className="p-16 md:p-20 lg:p-24 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#1E3A6C]/70 to-[#274675]/70 border-2 border-white/10 overflow-hidden relative"
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 0 50px rgba(251, 176, 59, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="transform scale-[2.5] md:scale-[3]">
            <CountdownTimer 
              targetDate="2025-04-11T09:00:00" 
              variant="floating"
              colorScheme={{
                text: "text-white",
                accent: "text-[#FFA726]",
                dropdownBg: "bg-[#274675]"
              }}
            />
          </div>
          
          {/* Animated elements for the countdown - larger and more pronounced */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-0 left-1/4 w-96 h-4 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
              animate={{
                left: ["25%", "75%", "25%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-96 h-4 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
              animate={{
                right: ["25%", "75%", "25%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>
      
      <div className="text-center mt-16">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-2xl mx-auto"
        >
          <Link 
            to="/conference/register" 
            className="inline-block px-16 py-8 w-full sm:w-auto rounded-xl text-3xl font-bold group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 bg-gradient-to-r from-[#FFA726] to-[#FF8A6A] group-hover:translate-x-0"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-gradient-to-l from-[#FFA726] to-[#FF8A6A] group-hover:translate-x-0"></span>
            <span className="relative flex justify-center items-center text-white">
              Register Now
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedCountdown;
