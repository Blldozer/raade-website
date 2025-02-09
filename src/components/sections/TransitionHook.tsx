
import React from 'react';
import { motion } from 'framer-motion';

const TransitionHook = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A365D] font-zillaslab">
            Every day we wait is another opportunity lost.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default TransitionHook;
