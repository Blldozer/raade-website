
import React from "react";
import { motion } from "framer-motion";

const HeroVisual = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center z-10 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-xl"
      >
        <div className="relative">
          <motion.div 
            className="relative z-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative mb-8">
              <motion.div 
                className="absolute -inset-6 rounded-lg bg-white/10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              <h2 className="relative text-7xl md:text-8xl font-bold font-simula text-white leading-tight tracking-tighter">
                <span className="drop-shadow-lg">BUILDING</span> 
                <br />
                <span className="text-[#FBB03B] drop-shadow-lg">TOMORROW</span>
              </h2>
            </div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-0.5 bg-white/30 my-4 mx-auto"
            />
            
            <div className="mt-12 space-y-4">
              <h3 className="text-xl font-semibold text-white font-simula">Join Industry Leaders & Innovators</h3>
              
              {/* Conference highlights buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <motion.div 
                  className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-white font-lora font-medium">25+ Speakers</p>
                </motion.div>
                <motion.div 
                  className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-white font-lora font-medium">15 Workshops</p>
                </motion.div>
                <motion.div 
                  className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-white font-lora font-medium">200+ Attendees</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
