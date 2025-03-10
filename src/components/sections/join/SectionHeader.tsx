
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="h-[2px] w-12 bg-[#FBB03B]" />
        <h2 className="mx-4 text-lg uppercase tracking-wider text-[#274675] font-simula">Get Involved</h2>
        <div className="h-[2px] w-12 bg-[#FBB03B]" />
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#274675] mb-6 font-simula">
        Build with us
      </h2>
      <p className="text-lg max-w-3xl mx-auto text-[#274675]/80 font-lora">
        Join our growing community of changemakers and contribute to creating
        impactful solutions for African development challenges.
      </p>
    </motion.div>
  );
};

export default SectionHeader;
