
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import CountdownTimer from '../CountdownTimer';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;
    
    // Main content animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      section.querySelector('.promo-content'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
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
      tl.kill();
      titleAnimation.kill();
    };
  }, []);

  // Gradient background animation
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      variants={gradientVariants}
      animate="animate"
      style={{
        background: "linear-gradient(135deg, #274675 0%, #1E3A6C 25%, #8B5CF6 50%, #1E3A6C 75%, #274675 100%)",
        backgroundSize: "200% 200%"
      }}
    >
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Animated shapes */}
          <motion.div 
            className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFA726] to-[#FF8A6A] blur-[100px]"
            animate={{ 
              x: [0, 20, 0], 
              y: [0, -20, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[50%] rounded-full bg-gradient-to-r from-[#9B69FF] to-[#FF8A6A] blur-[100px]"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="promo-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Conference Info */}
          <div className="text-white space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#FFA726] font-medium tracking-wider uppercase text-sm mb-3">
                Mark Your Calendar
              </p>
              <h2 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold font-simula leading-tight relative group"
              >
                <span className="relative inline-block">
                  RAADE Annual Conference 2025
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-0 h-1 bg-[#FFA726]"
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h2>
              <p className="mt-4 text-xl text-white/80 font-lora">
                Join us for a transformative gathering focused on innovative solutions 
                for African development challenges.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <div className="flex items-center group">
                <Calendar className="h-5 w-5 text-[#FFA726] mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-lora text-white/90 group-hover:text-[#FFA726] transition-colors duration-300">April 11-12, 2025</span>
              </div>
              <div className="flex items-center group">
                <MapPin className="h-5 w-5 text-[#FFA726] mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-lora text-white/90 group-hover:text-[#FFA726] transition-colors duration-300">Rice University, Houston</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2"
            >
              <Link 
                to="/conference" 
                className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFA726] to-[#FF8A6A] group-hover:from-[#FF8A6A] group-hover:to-[#FFA726] transition-all duration-500"></span>
                <span className="relative flex items-center justify-center text-white">
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Right side: Countdown */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300"
          >
            <div className="text-center mb-6">
              <motion.h3 
                className="text-2xl font-bold text-white font-simula mb-4"
                whileHover={{ scale: 1.05, color: "#FFA726" }}
                transition={{ duration: 0.2 }}
              >
                Time Remaining
              </motion.h3>
              <p className="text-white/70 font-lora mb-6">Don't miss this opportunity to connect and collaborate</p>
              
              {/* Enhanced countdown timer */}
              <motion.div
                className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-[#1E3A6C]/70 to-[#274675]/70 border border-white/10 overflow-hidden relative"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(251, 176, 59, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <CountdownTimer 
                  targetDate="2025-04-11T09:00:00" 
                  variant="floating"
                  colorScheme={{
                    text: "text-white",
                    accent: "text-[#FFA726]",
                    dropdownBg: "bg-[#274675]"
                  }}
                />
                
                {/* Animated elements for the countdown */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute top-0 left-1/4 w-24 h-1 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
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
                    className="absolute bottom-0 right-1/4 w-24 h-1 bg-gradient-to-r from-[#FFA726]/0 via-[#FFA726] to-[#FFA726]/0 rounded-full"
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
              <p className="mt-3 text-sm text-white/60 font-lora">
                Early bird registration now open
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConferencePromo;
