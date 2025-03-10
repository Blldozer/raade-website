
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300"
    >
      <div className="text-center mb-8">
        <motion.h3 
          className="text-3xl md:text-4xl font-bold text-white font-simula mb-6"
          whileHover={{ scale: 1.05, color: "#FFA726" }}
          transition={{ duration: 0.2 }}
        >
          Time Remaining
        </motion.h3>
        <p className="text-white/70 font-lora mb-8 text-lg">Don't miss this opportunity to connect and collaborate</p>
        
        {/* Enlarged countdown timer with better visibility */}
        <motion.div
          className="p-8 md:p-12 rounded-xl backdrop-blur-md bg-gradient-to-br from-[#1E3A6C]/70 to-[#274675]/70 border border-white/10 overflow-hidden relative"
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 0 30px rgba(251, 176, 59, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Direct display of time digits inside the window */}
          <div className="grid grid-cols-4 gap-4">
            {/* Days */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">
                  {timeLeft.days}
                </div>
                <div className="text-lg md:text-xl mt-2 text-white/80">Days</div>
              </div>
            </div>
            
            {/* Hours */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.hours)}
                </div>
                <div className="text-lg md:text-xl mt-2 text-white/80">Hours</div>
              </div>
            </div>
            
            {/* Minutes */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.minutes)}
                </div>
                <div className="text-lg md:text-xl mt-2 text-white/80">Minutes</div>
              </div>
            </div>
            
            {/* Seconds */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">
                  {formatTimeUnit(timeLeft.seconds)}
                </div>
                <div className="text-lg md:text-xl mt-2 text-white/80">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Animated elements for the countdown */}
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
            className="inline-block px-8 py-4 w-full sm:w-auto rounded-lg font-bold text-lg group relative overflow-hidden"
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
