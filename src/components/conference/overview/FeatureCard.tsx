
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="group" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all duration-300 bg-[#FBB03B]/90 rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center relative z-10">
          <div className="h-14 w-14 flex items-center justify-center mb-4 bg-white rounded-full text-[#FBB03B] p-3 transform transition-transform group-hover:scale-110 duration-300">
            <Icon strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
          </div>
          <h3 className="text-xl font-simula text-center text-white font-extrabold">{title}</h3>
        </div>
        <div className="text-center mt-4 relative z-10">
          <p className="text-white font-lora">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
