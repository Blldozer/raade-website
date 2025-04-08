
import React from "react";
import { motion } from "framer-motion";
import { ImpactTier } from "./impactTypes";

interface ImpactStatementProps {
  impact: ImpactTier;
}

/**
 * ImpactStatement Component
 * 
 * Displays an individual impact statement with title and description
 * Uses motion animations for smooth appearance
 * 
 * @param impact - The impact tier data to display
 */
const ImpactStatement = ({ impact }: ImpactStatementProps) => {
  return (
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
  );
};

export default ImpactStatement;
