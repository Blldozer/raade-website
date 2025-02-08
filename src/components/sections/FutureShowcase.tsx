
import React from 'react';
import { motion } from 'framer-motion';

const FutureShowcase = () => {
  return (
    <section className="relative py-24">
      {/* Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureShowcase;

