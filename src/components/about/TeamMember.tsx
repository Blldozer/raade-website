
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

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
 * TeamMember component - Displays individual team member information
 * Features reliable image loading with proper error handling
 * Includes optimized animations and proper state cleanup
 */
const TeamMember = ({ member, index, onImageLoad }: TeamMemberProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Preload the image properly to avoid rendering issues
  useEffect(() => {
    // Create proper image path with safeguards
    const formattedName = member.name.split(" ").join("-");
    const imgPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
    
    // Set the image source
    setImageSrc(imgPath);
    
    // Create an image object to pre-load
    const img = new Image();
    img.src = imgPath;
    
    // Set up proper event handlers
    img.onload = () => {
      console.log(`Pre-loaded team member image: ${member.name}`);
      setImageLoaded(true);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      console.error(`Failed to load team member image: ${member.name}`);
      setImageError(true);
    };
    
    // Cleanup to prevent memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [member.name, onImageLoad]);

  // Animation variants with reduced complexity for better performance
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

  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = member.name.split(" ");
    return `${nameParts[0][0]}${nameParts[1]?.[0] || ''}`;
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={item}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
      <div className="relative z-10">
        <div className="rounded-t-lg overflow-hidden">
          {/* Render fallback if image failed to load */}
          {imageError ? (
            <div className="w-full aspect-[4/3] bg-[#4C504A] flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {getInitials()}
              </span>
            </div>
          ) : (
            /* Render image with proper loading states */
            <div className="w-full aspect-[4/3] bg-[#4C504A] relative">
              {/* Show skeleton loading state */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl">Loading...</span>
                </div>
              )}
              
              {/* The actual image with proper error and load handling */}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          )}
        </div>
        <div className="p-8">
          {member.linkedin ? (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2 flex items-center gap-3">
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
              >
                {member.name} <Linkedin className="w-6 h-6 md:w-8 md:h-8 inline text-[#FBB03B]" />
              </a>
            </h3>
          ) : (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2">
              {member.name}
            </h3>
          )}
          <p className="text-xl md:text-2xl text-gray-300 font-lora">
            {member.position}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
