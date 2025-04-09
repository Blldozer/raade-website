
import React from "react";
import { motion } from "framer-motion";
import DonationForm from "./DonationForm";
import ImpactDisplay from "./ImpactDisplay";

/**
 * DonationSection Component
 * 
 * A complete donation section for the RAADE conference page:
 * - Features a main "Support Our Mission" heading styled like other main sections
 * - Uses a 39%/61% layout split for title and subtitle
 * - Contains modern, clean design with side-by-side layout
 * - Features impact information alongside donation form
 * - Optimized for both mobile and desktop views
 * - Includes animation effects for better engagement
 */
const DonationSection = () => {
  return (
    <section id="donation" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Title Section - Using 39%/61% split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-[39%] mb-6 lg:mb-0"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 rounded-full">
              <p className="text-[#FBB03B] font-bold">Donation</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-raade-navy mb-4 font-simula">
              Support Our Mission
            </h2>
          </motion.div>
          
          {/* Invisible right spacer - 61% */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-[61%]"
          >
            <p className="text-lg text-gray-600 font-lora max-w-xl">
              Your support directly fuels innovation and impact across Africa. 
              Every donation helps us connect more students with African organizations to create 
              scalable solutions for pressing challenges.
            </p>
          </motion.div>
        </div>
        
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
