
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountdown } from '../../countdown/useCountdown';
import { formatTimeUnit } from '../../countdown/timerUtils';

const EnhancedCountdown = () => {
  // Get the time remaining until the conference
  const targetDate = new Date('2025-04-11T09:00:00');
  const timeLeft = useCountdown(targetDate);

  return (
    <motion.div 
      initial={{ opacity: 1, scale: 1 }} // Changed from 0.95 to ensure visibility
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white font-simula mb-4"
          whileHover={{ scale: 1.05, color: "#FFA726" }}
          transition={{ duration: 0.2 }}
        >
          Time Remaining
        </motion.h3>
        <p className="text-white/70 font-lora mb-6 text-base">Don't miss this opportunity to connect and collaborate</p>
        
        {/* Enhanced countdown timer with sharper background */}
        <motion.div
          className="p-6 md:p-9 rounded-xl backdrop-blur-lg bg-gradient-to-br from-[#274675]/85 to-[#1E3A6C]/90 border border-white/15 overflow-hidden relative shadow-[0_10px_25px_-12px_rgba(0,0,0,0.25)]"
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 0 30px rgba(251, 176, 59, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Direct display of time digits inside the window */}
          <div className="grid grid-cols-4 gap-3">
            {/* Days */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner">
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat">
                  {timeLeft.days}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90">Days</div>
              </div>
            </div>
            
            {/* Hours */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner">
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.hours)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90">Hours</div>
              </div>
            </div>
            
            {/* Minutes */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner">
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.minutes)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90">Minutes</div>
              </div>
            </div>
            
            {/* Seconds */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner">
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.seconds)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced animated elements for the countdown */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-0 left-1/4 w-48 h-2 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
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
              className="absolute bottom-0 right-1/4 w-48 h-2 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
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
      
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/conference/register" 
            className="inline-block px-6 py-3 w-full sm:w-auto rounded-lg font-bold text-base group relative overflow-hidden"
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
