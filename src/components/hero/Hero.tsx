
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../Navigation';
import AnimatedText from './AnimatedText';
import ParticleField from './ParticleField';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const supportingTextOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const supportingTextY = useTransform(scrollY, [0, 200], [50, 0]);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#1A365D]/60 via-[#2A466D]/65 to-[#1A365D]/70 backdrop-blur-[4px]" />
      
      {/* Particle effect */}
      <div className="relative z-20">
        <ParticleField />
      </div>
      
      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>
      
      {/* Main content */}
      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
          <motion.div
            className="space-y-4 md:space-y-8 max-w-3xl pointer-events-auto pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated text component */}
            <AnimatedText />

            {/* Supporting text with scroll animation */}
            <motion.p 
              style={{ 
                opacity: supportingTextOpacity,
                y: supportingTextY
              }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl font-merriweather"
            >
              The future of Africa isn't a distant dream - it's being built today, by innovators and changemakers
              like you. Join a community of students and partners creating sustainable solutions through market-driven innovation.
            </motion.p>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={() => window.location.href = "#studios"}
                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#FBB03B] text-[#1A365D] rounded-lg font-semibold 
                  transition-all duration-300 text-lg font-alegreyasans relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
                whileHover={{ 
                  scale: 1.05,
                  y: -2 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="relative z-10">Start Building Today</span>
                <div className="absolute inset-0 bg-[#FBB03B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              <motion.button 
                onClick={() => window.location.href = "#conference"}
                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-[#FBB03B] text-[#FBB03B] rounded-lg 
                  font-semibold transition-all duration-300 text-lg font-alegreyasans hover:bg-[#FBB03B] hover:text-white relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <span className="relative z-10">Explore Our Impact</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
