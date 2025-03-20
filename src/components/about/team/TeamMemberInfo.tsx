
import { Linkedin } from "lucide-react";

interface TeamMemberInfoProps {
  name: string;
  position: string;
  linkedin?: string;
}

/**
 * TeamMemberInfo component - Displays team member details
 * Features:
 * - Properly styled text with responsive sizing
 * - Optional LinkedIn integration
 * - Accessible link handling
 */
const TeamMemberInfo = ({ name, position, linkedin }: TeamMemberInfoProps) => {
  return (
    <div className="p-8">
      {linkedin ? (
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2 flex items-center gap-3">
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
          >
            {name} <Linkedin className="w-6 h-6 md:w-8 md:h-8 inline text-[#FBB03B]" />
          </a>
        </h3>
      ) : (
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2">
          {name}
        </h3>
      )}
      <p className="text-xl md:text-2xl text-gray-300 font-lora">
        {position}
      </p>
    </div>
  );
};

export default TeamMemberInfo;
