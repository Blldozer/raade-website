
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMemberInfoProps {
  name: string;
  position: string;
  linkedin?: string;
}

/**
 * TeamMemberInfo component - Displays team member details with proper contrast
 * Features:
 * - High contrast text for better readability
 * - LinkedIn link integration when available
 * - Hover animations for interactive elements
 * - Mobile-optimized spacing and sizing
 */
const TeamMemberInfo = ({ name, position, linkedin }: TeamMemberInfoProps) => {
  // Improve fade-in animation with proper timing
  const textAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="p-4 bg-[#3C403A] text-white"
      initial="initial"
      animate="animate"
      variants={textAnimation}
    >
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-gray-200 mb-2">{position}</p>
      
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#FBB03B] hover:text-[#f9a718] text-sm transition-colors"
          aria-label={`${name}'s LinkedIn profile`}
        >
          <Linkedin size={16} className="mr-1" />
          <span>LinkedIn</span>
        </a>
      )}
    </motion.div>
  );
};

export default TeamMemberInfo;
