
import { LinkedIn } from "lucide-react";
import { useState } from "react";

interface TeamMemberInfoProps {
  name: string;
  position: string;
  linkedin?: string;
}

/**
 * TeamMemberInfo component - Displays team member details
 * 
 * Features:
 * - Renders name, position, and LinkedIn link (if available)
 * - Handles hover interactions for enhanced UX
 * - Optimized for all screen sizes
 */
const TeamMemberInfo = ({ name, position, linkedin }: TeamMemberInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="p-6 bg-[#3C403A] rounded-b-lg text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl font-simula font-bold mb-1">
        {name}
      </h3>
      
      <p className="text-lg font-lora opacity-90">
        {position}
      </p>
      
      {linkedin && (
        <a 
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex items-center text-white/80 hover:text-white transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-label={`${name}'s LinkedIn profile`}
        >
          <LinkedIn size={16} className="mr-1" />
          <span className="text-sm">LinkedIn</span>
        </a>
      )}
    </div>
  );
};

export default TeamMemberInfo;
