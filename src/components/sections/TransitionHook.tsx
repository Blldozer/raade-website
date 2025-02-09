
import React from 'react';
import { motion } from 'framer-motion';

const TransitionHook = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between py-20 bg-cream">
      <div className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A365D] font-alegreyasans">
              Every day we wait
              <br />
              is another opportunity lost.
            </h2>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center pb-12"
      >
        <p className="text-lg text-[#1A365D]/60 font-merriweather">
          Here's how you can get involved
        </p>
        <div className="mt-4 w-6 h-6 mx-auto border-b-2 border-r-2 border-[#1A365D]/30 rotate-45" />
      </motion.div>
    </section>
  );
};

export default TransitionHook;
