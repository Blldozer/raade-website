
import { useState, useRef } from "react";
import ImageLoader from "./ImageLoader";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
}

/**
 * TeamMemberImage component - Renders the team member image with fallbacks
 * Features:
 * - Skeleton loading state
 * - Fallback to initials when image fails to load
 * - Optimized for performance and accessibility
 */
const TeamMemberImage = ({ name, onImageLoad }: TeamMemberImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  // Added missing state variable for image loaded state
  const [localImageLoaded, setLocalImageLoaded] = useState(false);

  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = name.split(" ");
    return `${nameParts[0][0]}${nameParts[1]?.[0] || ''}`;
  };

  const { imageRef, imageSrc, imageLoaded } = ImageLoader({
    name,
    onImageLoad,
    retryCount,
    setRetryCount,
    setImageError,
    imageError
  });

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
          {/* Show skeleton loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl">Loading...</span>
            </div>
          )}
          
          {/* The actual image with proper error and load handling */}
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLocalImageLoaded(true)}
              onError={() => {
                if (retryCount >= 2) {
                  setImageError(true);
                }
              }}
              // Use lower quality source for low bandwidth situations
              loading="lazy"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
