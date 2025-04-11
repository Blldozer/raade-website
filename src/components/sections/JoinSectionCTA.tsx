
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

/**
 * JoinSectionCTA Component
 * 
 * Call-to-action section promoting conference registration and studios
 * Enhanced with:
 * - Optimized registration button with clear call-to-action
 * - Visual urgency indicators for time-sensitive registration
 * - Animated elements for increased engagement
 * - Mobile responsive layout
 */
const JoinSectionCTA = () => {
  const navigate = useNavigate();
  
  const handleConferenceClick = () => {
    navigate("/conference/register");
    // Ensure we scroll to top
    window.scrollTo(0, 0);
  };
  
  const handleStudiosClick = () => {
    navigate("/studios");
    // Ensure we scroll to top
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="w-full py-16 bg-[#274675] rounded-xl overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FBB03B]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FBB03B]/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Registration closing alert */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center bg-red-600/30 px-5 py-2.5 rounded-full animate-pulse">
            <Clock className="h-5 w-5 mr-2 text-white" />
            <p className="text-white font-bold text-sm md:text-base">Final day for registration! Closes tonight at 11:59 PM CST</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4 font-simula"
            >
              Ready to make an impact in African development?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/80 font-lora"
            >
              Join our community of changemakers and contribute to creating sustainable solutions for pressing challenges across Africa. <span className="text-[#FBB03B] font-bold">Don't miss out — final opportunity to register!</span>
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button 
              onClick={handleStudiosClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-[#274675] font-medium rounded-md hover:shadow-lg transition-all duration-300 font-lora"
            >
              Join Studios
            </motion.button>
            <motion.button 
              onClick={handleConferenceClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#FBB03B] text-white font-medium rounded-md flex items-center hover:shadow-lg transition-all duration-300 font-lora group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-red-600 animate-pulse opacity-20"></span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoinSectionCTA;
