
import React from "react";
import { motion } from "framer-motion";

interface DonationImpactProps {
  selectedAmount: number | null;
}

/**
 * DonationImpact Component
 * 
 * Displays the impact of different donation amounts to motivate donors
 * Shows different impact messages based on the selected donation amount
 * 
 * @param selectedAmount - Currently selected donation amount
 */
const DonationImpact = ({ selectedAmount }: DonationImpactProps) => {
  // Define impact statements for different donation ranges
  const getImpactStatement = () => {
    if (!selectedAmount) return null;
    
    if (selectedAmount < 50) {
      return {
        title: "Program Support",
        description: "Your donation helps provide essential resources for our Innovation Studios program, supporting student teams working on development challenges.",
        items: [
          "Provides materials for student teams",
          "Supports virtual collaboration tools",
          "Helps fund educational resources"
        ]
      };
    } else if (selectedAmount < 100) {
      return {
        title: "Innovation Catalyst",
        description: "Your contribution enables us to expand our reach and connect more student innovators with African partners.",
        items: [
          "Supports outreach to new partner organizations",
          "Helps fund student project grants",
          "Enables knowledge sharing sessions"
        ]
      };
    } else if (selectedAmount < 250) {
      return {
        title: "Development Champion",
        description: "As a Development Champion, your donation makes a significant impact on our ability to support sustainable solutions.",
        items: [
          "Funds prototype development for promising solutions",
          "Supports implementation testing in real environments",
          "Helps scale successful projects"
        ]
      };
    } else {
      return {
        title: "Transformation Leader",
        description: "Your generous contribution enables transformative change through our programs and initiatives.",
        items: [
          "Sponsors conference scholarships for African participants",
          "Funds implementation of solutions in partner communities",
          "Enables long-term impact measurement and research"
        ]
      };
    }
  };
  
  const impact = getImpactStatement();
  
  if (!impact) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg h-full flex items-center justify-center">
        <p className="text-gray-500 font-lora text-center">
          Select a donation amount to see your impact
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-[#274675] to-[#1e3a5f] p-6 rounded-lg text-white h-full flex flex-col">
      <h3 className="text-2xl font-simula mb-4">Your Impact</h3>
      
      <div className="mb-4">
        <motion.div
          key={impact.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4"
        >
          <h4 className="text-xl font-bold text-[#FBB03B] mb-2 font-lora">{impact.title}</h4>
          <p className="text-white/90 font-lora">{impact.description}</p>
        </motion.div>
      </div>
      
      <h4 className="font-semibold mb-2">Your donation will help:</h4>
      <ul className="space-y-2 flex-grow">
        {impact.items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start"
          >
            <span className="bg-[#FBB03B]/20 p-1 rounded-full mr-2 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FBB03B]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="font-lora text-white/90">{item}</span>
          </motion.li>
        ))}
      </ul>
      
      <div className="mt-6 pt-4 border-t border-white/20">
        <p className="text-white/80 text-sm font-lora">
          Thank you for supporting our mission to create sustainable solutions for African development challenges.
        </p>
      </div>
    </div>
  );
};

export default DonationImpact;
