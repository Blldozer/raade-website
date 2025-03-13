
import { motion } from "framer-motion";
import TeamMember from "./TeamMember";
import { useState, useEffect } from "react";

interface TeamMembersListProps {
  teamMembers: Array<{
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  }>;
  isInView: boolean;
  isLoaded: boolean;
}

/**
 * TeamMembersList component - Renders the grid of team members
 * Features staggered animations for a polished appearance
 * Includes mobile-optimized rendering and error handling
 */
const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  // Track which images are loaded to improve rendering reliability
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Reset animation state when component mounts or visibility changes
  useEffect(() => {
    if (isInView && isLoaded) {
      console.log("TeamMembersList is in view and loaded, preparing animations");
    }
    
    // Clean up animation states when component unmounts
    return () => {
      console.log("TeamMembersList unmounting");
    };
  }, [isInView, isLoaded]);

  // Notification when an image loads successfully
  const handleImageLoaded = (memberName: string) => {
    console.log(`Image loaded for team member: ${memberName}`);
    setLoadedImages(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  // Container animation with reduced delay for better performance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate={isInView && isLoaded ? "show" : "hidden"}
      exit="hidden"
    >
      {teamMembers.map((member, index) => (
        <TeamMember 
          key={`${member.name}-${index}`} 
          member={member} 
          index={index}
          onImageLoad={() => handleImageLoaded(member.name)}
        />
      ))}
    </motion.div>
  );
};

export default TeamMembersList;
