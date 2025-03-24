import { useState, useEffect } from "react";
import ImageLoader from "./ImageLoader";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
  isPriority?: boolean;
}

/**
 * TeamMemberImage component - Renders the team member image with fallbacks
 * Features:
 * - Simple, reliable image loading 
 * - Fallback to initials when image fails to load
 * - Optimized for performance and accessibility
 * - Improved mobile reliability
 */
const TeamMemberImage = ({ name, onImageLoad, isPriority = false }: TeamMemberImageProps) => {
  // Use the simplified ImageLoader hook
  const { imageRef, imageSrc, imageLoaded, imageError } = ImageLoader({
    name,
    onImageLoad
  });
  
  // Local loading state for UI feedback
  const [showLoading, setShowLoading] = useState(true);
  
  // Hide loading state after images load or after 1.5 seconds (reduced from 3s for faster perceived loading)
  useEffect(() => {
    if (imageLoaded) {
      setShowLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);
  
  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`;
  };

  return (
    <div className="rounded-t-lg overflow-hidden">
      {/* Render fallback if image failed to load */}
      {imageError ? (
        <div className="w-full aspect-[3/4] bg-[#4C504A] flex items-center justify-center">
          <span className="text-white text-3xl font-bold">
            {getInitials()}
          </span>
        </div>
      ) : (
        /* Render image with proper loading states */
        <div className="w-full aspect-[3/4] bg-[#4C504A] relative">
          {/* Show simple loading state */}
          {showLoading && !imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl">Loading...</span>
            </div>
          )}
          
          {/* The actual image with proper error handling */}
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt={name}
              width="100%"
              height="auto"
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ 
                opacity: imageLoaded ? 1 : 0,
                display: 'block', // Force display block to ensure visibility
                minHeight: '10rem' // Ensure minimum height even before load
              }}
              onLoad={() => {
                console.log(`Image for ${name} loaded in DOM`);
                setShowLoading(false);
                onImageLoad?.();
              }}
              onError={() => {
                console.error(`Error loading image for ${name}`);
              }}
              // Use appropriate loading strategy based on priority
              loading={isPriority ? "eager" : "lazy"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
