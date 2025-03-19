import { useState, useEffect } from "react";
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
  priority?: boolean; // Add priority prop for prioritizing loading
}

/**
 * TeamMemberCard component - Main container for team member display
 * Features:
 * - Consistent styling and layout
 * - Performance optimizations for loading
 * - Improved prioritization for visible images
 * - Fixed for reliable loading on mobile
 */
const TeamMemberCard = ({ member, index, onImageLoad, priority = false }: TeamMemberCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Debug component lifecycle
  useEffect(() => {
    console.log(`TeamMemberCard for ${member.name} mounted, priority: ${priority}`);
    return () => {
      console.log(`TeamMemberCard for ${member.name} unmounted`);
    };
  }, [member.name, priority]);
  
  // Handle image load event
  const handleImageLoad = () => {
    console.log(`Image loaded in TeamMemberCard for ${member.name}`);
    setImageLoaded(true);
    // Propagate the event upward
    if (onImageLoad) {
      onImageLoad();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full relative">
      {/* Image section */}
      <TeamMemberImage 
        name={member.name} 
        onImageLoad={handleImageLoad}
        priority={priority}
      />
      
      {/* Information section */}
      <TeamMemberInfo
        name={member.name}
        position={member.position}
        classYear={member.classYear}
        linkedin={member.linkedin}
        imageLoaded={imageLoaded}
      />
    </div>
  );
};

export default TeamMemberCard;
