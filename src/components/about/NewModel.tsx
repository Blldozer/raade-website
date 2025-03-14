
import React from 'react';
import { motion } from 'framer-motion';

/**
 * NewModel - About page section explaining RAADE's innovative approach
 * Features a light background for proper navbar theming
 */
const NewModel = () => {
  return (
    <section 
      className="py-20 px-4 md:px-8 lg:px-16 bg-white about-content-section"
      data-background="light"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#274675] mb-12 text-center"
        >
          A New Model for African Development
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#274675] mb-4">Beyond Traditional Aid</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              RAADE was founded on the principle that traditional development approaches have often failed to create sustainable change in Africa. Instead of imposing external solutions, we believe in co-creating innovations with African partners, leveraging local knowledge and expertise while providing technical skills and resources from Rice University.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#274675] mb-4">Student-Driven Innovation</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We mobilize the creativity, energy, and multidisciplinary expertise of Rice University students to tackle complex challenges. Our approach connects the next generation of leaders with real-world problems, creating a two-way learning experience that benefits both students and our African partners.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-[#274675] font-semibold italic">
            "RAADE represents a fundamental shift in how we think about development - from charity to partnership, from solution imposition to collaborative innovation."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewModel;
