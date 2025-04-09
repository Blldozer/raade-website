
import React from "react";
import { motion } from "framer-motion";
import DonationFormSection from "./DonationFormSection";
import SectionTitle from "./SectionTitle";
import { useDonationForm } from "./useDonationForm";
import DynamicDonationImpact from "./DynamicDonationImpact";

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
  const { selectedAmount, form } = useDonationForm();

  return (
    <section id="donation" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title and subtitle section */}
        <SectionTitle />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side: Donation form */}
          <DonationFormSection />
          
          {/* Right side: Dynamic Impact display */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <DynamicDonationImpact 
              selectedAmount={selectedAmount} 
              customAmount={form.watch("customAmount")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
