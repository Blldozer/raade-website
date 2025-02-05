
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../Navigation';
import AnimatedText from './AnimatedText';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D]/60 via-[#2A466D]/65 to-[#1A365D]/70 backdrop-blur-[2px]" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <motion.div
          className="space-y-4 md:space-y-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated text component */}
          <AnimatedText />

          {/* Supporting text */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Every day without action is a missed opportunity for change. 
            Join Rice students pioneering innovative solutions for sustainable development in Africa.
          </motion.p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              onClick={() => window.location.href = "#studios"}
              className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#FBB03B] text-[#1A365D] rounded-lg font-semibold 
                transition-all duration-300 text-sm md:text-base relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
              whileHover={{ 
                scale: 1.05,
                y: -2 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="relative z-10">Join Our Mission</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FBB03B] via-[#FFD700] to-[#FBB03B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = "#conference"}
              className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-white/20 text-white rounded-lg 
                font-semibold transition-all duration-300 text-sm md:text-base hover:border-[#FBB03B] relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-[#FBB03B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
