
import React, { useState } from "react";
import { motion } from "framer-motion";
import DonationForm from "./DonationForm";
import DonationImpact from "./DonationImpact";

/**
 * DonationSection Component
 * 
 * A full-width section that contains the donation form and impact information
 * Displayed on the conference page before the final CTA
 */
const DonationSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  return (
    <section className="py-16 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/public/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/95"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title with 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Support <span className="text-[#FBB03B]">Our Mission</span>
            </h2>
          </motion.div>
          
          <div className="invisible w-full lg:w-[61%]"></div>
        </div>
        
        {/* Description with 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <div className="invisible w-full lg:w-[39%]"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="w-full lg:w-[61%]"
          >
            <p className="text-lg font-lora p-4 lg:p-0 text-slate-950">
              Your donation helps us continue our work connecting African organizations with innovative solutions. 
              Every contribution directly supports our programs, enabling us to expand our impact across the continent.
            </p>
          </motion.div>
        </div>
        
        {/* Donation form and impact section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <DonationForm 
              selectedAmount={selectedAmount} 
              setSelectedAmount={setSelectedAmount} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DonationImpact selectedAmount={selectedAmount} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
