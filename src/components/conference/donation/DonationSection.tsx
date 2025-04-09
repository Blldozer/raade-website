
import React from "react";
import { motion } from "framer-motion";
import DonationForm from "./DonationForm";
import ImpactDisplay from "./ImpactDisplay";

/**
 * DonationSection Component
 * 
 * A complete donation section for the RAADE conference page:
 * - Contains modern, clean design with side-by-side layout
 * - Features impact information alongside donation form
 * - Optimized for both mobile and desktop views
 * - Includes animation effects for better engagement
 */
const DonationSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 rounded-full">
            <p className="text-[#FBB03B] font-bold">Support Our Mission</p>
          </div>
          
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Make a Difference with Your Donation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Your support directly fuels innovation and impact across Africa.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side: Donation form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 order-2 lg:order-1"
          >
            <DonationForm />
          </motion.div>
          
          {/* Right side: Impact display */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <ImpactDisplay />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
