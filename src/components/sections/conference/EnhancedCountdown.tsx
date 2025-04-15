import React, { useEffect, useRef, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useCountdown } from '../../countdown/useCountdown';
import { formatTimeUnit } from '../../countdown/timerUtils';

const EnhancedCountdown = () => {
  // Memoize the target date to avoid recreating it on every render
  const targetDate = useMemo(() => new Date('2025-04-11T09:00:00'), []);
  
  // Get the time remaining until the conference
  const timeLeft = useCountdown(targetDate);
  
  // Debug target date - only runs once on mount
  useEffect(() => {
    console.log("EnhancedCountdown: Target date set to", {
      target: targetDate.toISOString(),
      current: new Date().toISOString(),
      difference: targetDate.getTime() - new Date().getTime(),
      timeLeft
    });
  }, []);
  
  // Use framer-motion's animation controls for better performance
  const secondsControls = useAnimation();
  const prevSeconds = useRef(timeLeft.seconds);
  
  // Hardware-accelerated animation for seconds - only animate when seconds change
  useEffect(() => {
    // Only animate when seconds actually change
    if (prevSeconds.current !== timeLeft.seconds) {
      // Start animation sequence - simplified for better performance
      secondsControls.start({
        scale: [1, 1.05, 1],
        transition: { 
          duration: 0.3, 
          ease: "easeOut",
        }
      });
      
      prevSeconds.current = timeLeft.seconds;
    }
  }, [timeLeft.seconds, secondsControls, prevSeconds]);

  // Memoize the time digits to prevent unnecessary re-renders
  const TimeDigit = memo(({ value, label }: { value: number | string, label: string }) => (
    <div className="text-center">
      <div className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="text-4xl md:text-5xl font-bold text-white font-montserrat relative">
          {value}
        </div>
        <div className="text-base md:text-lg mt-1 text-white/90 relative">{label}</div>
      </div>
    </div>
  ));

  // Hide LIVE NOW if conference has ended
  const now = new Date();
  const conferenceEnd = new Date('2025-04-12T23:59:59-05:00');
  if (now > conferenceEnd) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-[#1E3A6C]/90 to-[#2C5282]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 hover:border-[#38B2AC]/30 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <h3 
          className="text-2xl md:text-3xl font-bold text-white font-simula mb-4"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
        >
          {timeLeft.expired ? "Conference Has Started!" : "Time Remaining"}
        </h3>
        <p className="text-white/80 font-lora mb-6 text-base">
          {timeLeft.expired 
            ? "Join us now for this exciting opportunity to connect and collaborate" 
            : "Don't miss this opportunity to connect and collaborate"}
        </p>
        
        {/* Enhanced countdown timer with improved performance */}
        <div
          className="p-6 md:p-9 rounded-xl backdrop-blur-lg bg-gradient-to-br from-[#2D3748]/90 to-[#3730A3]/80 border border-white/15 overflow-hidden relative shadow-[0_10px_25px_-12px_rgba(0,0,0,0.25)]"
        >
          {timeLeft.expired ? (
            <div className="text-center py-6">
              <h4 className="text-3xl md:text-4xl font-bold text-[#FF9848] font-montserrat mb-4">
                LIVE NOW!
              </h4>
              <p className="text-white/90 text-xl">
                The RAADE Conference is happening right now!
              </p>
              <p className="text-white/80 text-lg mt-2">
                April 11-12, 2025
              </p>
            </div>
          ) : (
            /* Direct display of time digits inside the window */
            <div className="grid grid-cols-4 gap-3">
              {/* Days */}
              <TimeDigit value={timeLeft.days} label="Days" />
              
              {/* Hours */}
              <TimeDigit value={formatTimeUnit(timeLeft.hours)} label="Hours" />
              
              {/* Minutes */}
              <TimeDigit value={formatTimeUnit(timeLeft.minutes)} label="Minutes" />
              
              {/* Seconds - with hardware-accelerated animation */}
              <div className="text-center">
                <motion.div 
                  animate={secondsControls}
                  className="bg-white/15 backdrop-blur-lg rounded-lg p-3 shadow-inner relative overflow-hidden group"
                  style={{ 
                    willChange: "transform", 
                    transform: "translateZ(0)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-4xl md:text-5xl font-bold text-[#FF9848] font-montserrat relative">
                    {formatTimeUnit(timeLeft.seconds)}
                  </div>
                  <div className="text-base md:text-lg mt-1 text-white/90 relative">Seconds</div>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Simplified animated elements - reduced to a single light beam */}
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
      </div>
      
      <div className="text-center">
        <Link 
          to={timeLeft.expired ? "/conference" : "/conference/register"} 
          className="inline-block px-6 py-3 w-full sm:w-auto rounded-lg font-bold text-base group relative overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF9848] to-[#FF8A4D]"></span>
          <span className="relative flex justify-center items-center text-white">
            {timeLeft.expired ? "View Live Schedule" : "Register Now"}
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(EnhancedCountdown);
