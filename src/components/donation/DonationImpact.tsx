
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
 * Updated with more specific conference-related impacts for each tier
 * 
 * @param selectedAmount - Currently selected donation amount
 */
const DonationImpact = ({ selectedAmount }: DonationImpactProps) => {
  // Define impact statements for different donation ranges
  const getImpactStatement = () => {
    if (!selectedAmount) return null;
    
    if (selectedAmount < 50) {
      return {
        title: "Conference Supporter",
        description: "Your $25 donation contributes to the essential elements of our conference experience.",
        items: [
          "Fund a welcome packet for a conference attendee",
          "Support technical equipment needed for one speaker's presentation",
          "Help provide name badges for multiple participants"
        ]
      };
    } else if (selectedAmount < 100) {
      return {
        title: "Conference Contributor",
        description: "Your $50 donation helps enhance the conference experience for attendees and speakers.",
        items: [
          "Cover breakfast for two conference attendees",
          "Fund transportation for a speaker from their hotel to the conference venue",
          "Support the printing of conference materials for multiple participants"
        ]
      };
    } else if (selectedAmount < 250) {
      return {
        title: "Conference Sponsor",
        description: "Your $100 donation makes a meaningful impact on our conference programming and documentation.",
        items: [
          "Provide dinner for four conference attendees",
          "Fund a portion of the documentation costs (photography/videography)",
          "Support youth participation in RAADE's programs"
        ]
      };
    } else if (selectedAmount < 500) {
      return {
        title: "Development Advocate",
        description: "Your $250 donation helps us create a high-quality conference experience for all participants.",
        items: [
          "Sponsor a speaker's honorarium",
          "Fund part of the conference venue rental costs",
          "Support the creation of essential conference materials including recognition plaques"
        ]
      };
    } else if (selectedAmount < 1000) {
      return {
        title: "Leadership Patron",
        description: "Your $500 donation enables significant aspects of our programming and African participation.",
        items: [
          "Fund a half-day workshop for African entrepreneurs",
          "Sponsor multiple regional attendees' participation",
          "Support an Innovation Studio project with mentoring and resources"
        ]
      };
    } else {
      return {
        title: "Transformation Leader",
        description: "Your generous donation of $1,000 or more enables transformative impact across our entire initiative.",
        items: [
          "Sponsor a complete Studio Innovation project tackling a specific challenge",
          "Fund travel and accommodation for international speakers",
          "Support multiple aspects of the conference including venue, meals, and documentation",
          "Help establish sustainable partnerships between Rice University and African organizations"
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
