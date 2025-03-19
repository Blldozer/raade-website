import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TeamMemberCard from "./team/TeamMemberCard";

interface TeamMemberProps {
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
 * TeamMember component - Wrapper for individual team members
 * Features:
 * - Simple animation for visual appeal
 * - Delegates rendering to TeamMemberCard
 * - Improved for reliable initial rendering
 * - Prioritized loading for first visible members
 */
const TeamMember = ({ member, index, onImageLoad }: TeamMemberProps) => {
  // Debug component lifecycle
  useEffect(() => {
    console.log(`TeamMember for ${member.name} mounted, index: ${index}`);
    return () => {
      console.log(`TeamMember for ${member.name} unmounted`);
    };
  }, [member.name, index]);

  // Faster, simpler animation for better performance
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      key={`${member.name}-${index}`}
      variants={item}
      initial="show" // Start as visible for immediate display
      className="card group relative overflow-hidden rounded-lg"
    >
      <TeamMemberCard 
        key={member.name}
        member={member}
        index={index}
        onImageLoad={onImageLoad}
        priority={index < 6} // Prioritize loading for first 6 members
      />
    </motion.div>
  );
};

export default TeamMember;
