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
 * - Green block fallback when images fail to load
 * - Optimized for performance and accessibility
 * - Improved mobile reliability
 */
const TeamMemberImage = ({ name, onImageLoad, isPriority = false }: TeamMemberImageProps) => {
  // Use the simplified ImageLoader hook
  const { imageRef, imageSrc, imageLoaded, imageError } = ImageLoader({
    name,
    onImageLoad
  });
  
  // Ensure we always consider an image loaded after a timeout for mobile
  const [forceLoaded, setForceLoaded] = useState(false);
  
  // Hide loading state after images load or after 1 second
  useEffect(() => {
    if (imageLoaded) {
      setForceLoaded(true);
    } else {
      const timer = setTimeout(() => {
        setForceLoaded(true);
        console.log(`Force loaded image for ${name} after timeout`);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [imageLoaded, name]);
  
  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`;
  };

  return (
    <div className="rounded-t-lg overflow-hidden">
      {/* Render green block if image failed to load */}
      {imageError ? (
        <div className="w-full aspect-[3/4] bg-green-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">
            {getInitials()}
          </span>
          <span className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">Debug: Image Failed</span>
        </div>
      ) : (
        /* Render image with gray background for loading */
        <div className="w-full aspect-[3/4] bg-[#4C504A] relative">
          {/* Show loading text */}
          {!forceLoaded && !imageLoaded && (
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
                display: 'block',
                minHeight: '10rem'
              }}
              onLoad={() => {
                console.log(`Image for ${name} loaded in DOM`);
                onImageLoad?.();
              }}
              onError={() => {
                console.error(`Error loading image for ${name}`);
              }}
              loading={isPriority ? "eager" : "lazy"}
            />
          )}
          
          {/* Show debug overlay for loading state */}
          {(!imageLoaded && forceLoaded) && (
            <div className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
              Debug: Force Shown
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
