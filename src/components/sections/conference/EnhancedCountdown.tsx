import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useCountdown } from '../../countdown/useCountdown';
import { formatTimeUnit } from '../../countdown/timerUtils';

const EnhancedCountdown = () => {
  // Get the time remaining until the conference
  const targetDate = new Date('2025-04-11T09:00:00');
  const timeLeft = useCountdown(targetDate);
  
  // Use framer-motion's animation controls for better performance
  const secondsControls = useAnimation();
  const prevSeconds = useRef(timeLeft.seconds);
  
  // Hardware-accelerated animation for seconds
  useEffect(() => {
    // Only animate when seconds actually change
    if (prevSeconds.current !== timeLeft.seconds) {
      // Start animation sequence
      secondsControls.start({
        scale: [1, 1.08, 1],
        opacity: [1, 0.9, 1],
        transition: { 
          duration: 0.4, 
          ease: "easeOut",
          times: [0, 0.5, 1]
        }
      });
      
      prevSeconds.current = timeLeft.seconds;
    }
  }, [timeLeft.seconds, secondsControls]);

  return (
    <motion.div 
      initial={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-[#1E3A6C]/90 to-[#2C5282]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 hover:border-[#38B2AC]/30 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white font-simula mb-4"
          whileHover={{ scale: 1.05, color: "#FFB347" }}
          transition={{ duration: 0.2 }}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
        >
          Time Remaining
        </motion.h3>
        <p className="text-white/80 font-lora mb-6 text-base">Don't miss this opportunity to connect and collaborate</p>
        
        {/* Enhanced countdown timer with improved gradient background */}
        <motion.div
          className="p-6 md:p-9 rounded-xl backdrop-blur-lg bg-gradient-to-br from-[#2D3748]/90 to-[#3730A3]/80 border border-white/15 overflow-hidden relative shadow-[0_10px_25px_-12px_rgba(0,0,0,0.25)]"
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
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat relative">
                  {timeLeft.days}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90 relative">Days</div>
              </div>
            </div>
            
            {/* Hours */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat relative">
                  {formatTimeUnit(timeLeft.hours)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90 relative">Hours</div>
              </div>
            </div>
            
            {/* Minutes */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat relative">
                  {formatTimeUnit(timeLeft.minutes)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90 relative">Minutes</div>
              </div>
            </div>
            
            {/* Seconds - with hardware-accelerated animation */}
            <div className="text-center">
              <motion.div 
                animate={secondsControls}
                className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group"
                style={{ 
                  willChange: "transform, opacity", 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(0)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-4xl md:text-5xl font-bold text-white font-montserrat relative">
                  {formatTimeUnit(timeLeft.seconds)}
                </div>
                <div className="text-base md:text-lg mt-1 text-white/90 relative">Seconds</div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced animated elements for the countdown */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-0 left-1/4 w-48 h-2 bg-gradient-to-r from-[#FFB347]/0 via-[#FFB347] to-[#FFB347]/0 rounded-full"
              animate={{
                left: ["25%", "75%", "25%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                willChange: "transform, opacity",
                transform: "translateZ(0)"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-48 h-2 bg-gradient-to-r from-[#38B2AC]/0 via-[#38B2AC] to-[#38B2AC]/0 rounded-full"
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
              style={{ 
                willChange: "transform, opacity",
                transform: "translateZ(0)"
              }}
            />
            
            {/* Add subtle diagonal light beam animation */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-60 bg-white/10 rotate-45 blur-md"
              animate={{
                top: ["-10%", "100%"],
                left: ["-10%", "100%"],
                opacity: [0, 0.15, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
              style={{ willChange: "transform, opacity" }}
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
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 bg-gradient-to-r from-[#FFB347] to-[#FF8A6A] group-hover:translate-x-0"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-gradient-to-l from-[#FFB347] to-[#FF8A6A] group-hover:translate-x-0"></span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-sm transition-opacity duration-300"></span>
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
