
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useResponsive } from '@/hooks/useResponsive';

const ConferenceInfo = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { isMobile, isTablet } = useResponsive();
  
  useEffect(() => {
    const title = titleRef.current;
    
    if (!title) return;
    
    // Animated text for title
    const titleAnimation = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    titleAnimation
      .to(title, { 
        duration: 0.3, 
        color: "#FFA726", 
        ease: "power2.inOut",
        stagger: 0.05
      })
      .to(title, { 
        duration: 0.3, 
        color: "white", 
        delay: 0.5,
        ease: "power2.inOut",
        stagger: 0.05
      });
    
    return () => {
      titleAnimation.kill();
    };
  }, []);

  return (
    <div className="text-white space-y-6 p-4 sm:p-6 md:p-8 bg-black/40 backdrop-blur-md rounded-xl shadow-xl max-w-[90vw] mx-auto md:mx-0">
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#FFA726] font-medium tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-3">
          Mark Your Calendar
        </p>
        <h2 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-simula leading-tight relative group"
        >
          <span className="relative inline-block">
            RAADE African Development Forum 2025
            <motion.span 
              className="absolute -bottom-2 left-0 w-0 h-1 bg-[#FFA726]"
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/80 font-lora">
          Join us for a transformative gathering focused on innovative solutions 
          for African development challenges.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
      >
        <div className="flex items-center group">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA726] mr-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-lora text-sm sm:text-base text-white/90 group-hover:text-[#FFA726] transition-colors duration-300">April 11-12, 2025</span>
        </div>
        <div className="flex items-center group">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA726] mr-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-lora text-sm sm:text-base text-white/90 group-hover:text-[#FFA726] transition-colors duration-300">Rice University, Houston</span>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pt-2"
      >
        <Link 
          to="/conference" 
          className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg group overflow-hidden relative"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#FFA726] to-[#FF8A6A] group-hover:from-[#FF8A6A] group-hover:to-[#FFA726] transition-all duration-500"></span>
          <span className="relative flex items-center justify-center text-white">
            Learn More
            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default ConferenceInfo;
