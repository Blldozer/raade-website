import { Linkedin } from "lucide-react";

interface TeamMemberInfoProps {
  name: string;
  position: string;
  classYear?: string;
  linkedin?: string;
  imageLoaded?: boolean;
}

/**
 * TeamMemberInfo component - Displays team member details
 * Features:
 * - Properly styled text with responsive sizing
 * - Optional LinkedIn integration
 * - Accessible link handling
 * - Class year display
 * - Better state handling with imageLoaded prop
 */
const TeamMemberInfo = ({ 
  name, 
  position, 
  classYear, 
  linkedin, 
  imageLoaded = true 
}: TeamMemberInfoProps) => {
  return (
    <div className={`p-4 bg-[#3C403A] transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {linkedin ? (
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 flex items-center gap-1">
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
          >
            {name} <Linkedin className="w-4 h-4 md:w-5 md:h-5 inline text-[#FBB03B]" />
          </a>
        </h3>
      ) : (
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
          {name}
        </h3>
      )}
      
      <p className="text-sm md:text-base text-gray-200 mb-1">{position}</p>
      
      {classYear && (
        <p className="text-xs md:text-sm text-gray-300">Class of {classYear}</p>
      )}
    </div>
  );
};

export default TeamMemberInfo;
