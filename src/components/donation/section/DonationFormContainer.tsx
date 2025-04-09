
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
 * Provides layout for the donation form and impact display
 * Uses responsive grid layout that adapts to different screen sizes
 * Animates both form and impact display for better visual engagement
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
        transition={{ duration: 0.5 }}
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
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-full"
      >
        <DonationImpact selectedAmount={selectedAmount} />
      </motion.div>
    </div>
  );
};

export default DonationFormContainer;
