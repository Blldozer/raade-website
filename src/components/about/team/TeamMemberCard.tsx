
import { motion } from "framer-motion";
import { useState } from "react";
import TeamMemberImage from "./TeamMemberImage";
import TeamMemberInfo from "./TeamMemberInfo";

interface TeamMemberCardProps {
  member: {
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  };
  index: number;
  onImageLoad?: () => void;
}

/**
 * TeamMemberCard component - Main container for team member display
 * Features:
 * - Framer Motion animations for enhanced UX
 * - Consistent styling and layout
 * - Performance optimizations for animations
 * - Mobile-first design approach for reliable rendering
 */
const TeamMemberCard = ({ member, index, onImageLoad }: TeamMemberCardProps) => {
  // Animation variants with reduced complexity for better performance on mobile
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={item}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
      <div className="relative z-10">
        <TeamMemberImage 
          name={member.name} 
          onImageLoad={onImageLoad} 
        />
        
        <TeamMemberInfo
          name={member.name}
          position={member.position}
          linkedin={member.linkedin}
        />
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
