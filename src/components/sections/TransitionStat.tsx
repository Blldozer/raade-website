
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const TransitionStat = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1A365D] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-zillaslab">
            By 2050, <CountUp end={25} duration={2.5} />% of people
            <br />will be African.
          </div>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-merriweather">
            The systems we build today will shape their tomorrow.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TransitionStat;
