
import React from "react";
import { motion } from "framer-motion";
import { ImpactTier } from "./impactTypes";

interface ImpactListProps {
  impact: ImpactTier;
}

/**
 * ImpactList Component
 * 
 * Renders a list of impact items with animations
 * Each item appears sequentially for a pleasing visual effect
 * 
 * @param impact - The impact tier data containing items to display
 */
const ImpactList = ({ impact }: ImpactListProps) => {
  return (
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
  );
};

export default ImpactList;
