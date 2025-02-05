
import React from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';
import Navigation from '../Navigation';
import AnimatedText from './AnimatedText';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#2A466D] to-[#1A365D] animate-gradient" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <motion.div
          className="space-y-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated text component */}
          <AnimatedText />

          {/* Supporting text */}
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Every day without action is a missed opportunity for change. 
            Join Rice students pioneering innovative solutions for sustainable development in Africa.
          </motion.p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button 
              onClick={() => window.location.href = "#studios"}
              className="px-8 py-4 bg-[#FBB03B] text-[#1A365D] rounded-lg font-semibold 
                shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(251, 176, 59, 0.3)",
                y: -2 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Join Our Mission
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = "#conference"}
              className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold 
                transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
