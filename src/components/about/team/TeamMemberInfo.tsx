
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMemberInfoProps {
  name: string;
  position: string;
  linkedin?: string;
}

/**
 * TeamMemberInfo component - Displays team member details with improved typography
 * Features:
 * - Simula font for names (maintained for brand consistency)
 * - Lora font for positions (complementary serif pairing)
 * - Decorative accent line using RAADE brand yellow-orange
 * - Enhanced contrast for better readability
 * - Mobile-responsive design considerations
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
      <h3 className="text-xl font-simula font-bold mb-2">{name}</h3>
      
      {/* Decorative accent line using brand yellow-orange color */}
      <div className="w-8 h-0.5 bg-[#FBB03B] mb-2.5" aria-hidden="true"></div>
      
      <p className="font-lora text-sm text-[#f4f5f4] mb-3 italic">{position}</p>
      
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
