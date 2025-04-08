
import React from "react";
import { motion } from "framer-motion";
import DonationForm from "../DonationForm";
import DonationImpact from "../DonationImpact";

interface DonationFormContainerProps {
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
}

/**
 * DonationFormContainer Component
 * 
 * Renders the donation form and impact display in a responsive grid layout
 * Handles animations and layout for both form elements
 * 
 * @param selectedAmount - Currently selected donation amount
 * @param setSelectedAmount - Function to update the selected amount
 */
const DonationFormContainer = ({ 
  selectedAmount, 
  setSelectedAmount 
}: DonationFormContainerProps) => {
  return (
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
  );
};

export default DonationFormContainer;
