
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BenefitCarousel from "./BenefitCarousel";

interface AttendeeCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  benefits: string[];
}

const AttendeeCard = ({ icon: Icon, title, subtitle, benefits }: AttendeeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="w-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-raade-navy/95 text-white border-raade-navy/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Icon className="w-8 h-8 text-[#FBB03B] flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-xl font-bold font-simula">{title}</h3>
              <p className="text-[#FBB03B] text-sm font-lora">{subtitle}</p>
            </div>
          </div>
          
          <BenefitCarousel benefits={benefits} isActive={isHovered} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AttendeeCard;
