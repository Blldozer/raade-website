
import { useState, useRef, useEffect } from "react";
import ImageLoader from "./ImageLoader";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
}

/**
 * TeamMemberImage component - Renders team member images
 * Simplified version with reliable fallback to initials
 * Shows feedback during loading process
 */
const TeamMemberImage = ({ name, onImageLoad }: TeamMemberImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true); // Changed to true to show loading right away
  
  // Get initials for fallback
  const getInitials = () => {
    if (!name || typeof name !== 'string') return 'XX';
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || 'X'}${nameParts[1]?.[0] || ''}`;
  };

  const { imageRef, imageSrc, imageLoaded } = ImageLoader({
    name,
    onImageLoad,
    retryCount,
    setRetryCount,
    setImageError,
    imageError
  });

  // Update local state when ImageLoader reports success
  useEffect(() => {
    if (imageLoaded) {
      setLocalImageLoaded(true);
      setShowLoading(false);
    }
  }, [imageLoaded]);
  
  // Force fallback after timeout to prevent endless waiting
  useEffect(() => {
    // Reduced from 12 seconds to 8 seconds for faster fallback
    const fallbackTimer = setTimeout(() => {
      if (!localImageLoaded && !imageLoaded) {
        setImageError(true);
      }
    }, 8000);
    
    return () => clearTimeout(fallbackTimer);
  }, [name, localImageLoaded, imageLoaded]);

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
        /* Render image with loading states */
        <div className="w-full aspect-[3/4] bg-[#4C504A] relative">
          {/* Show loading state */}
          {showLoading && !localImageLoaded && !imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-lg mb-2">Loading...</span>
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* The actual image */}
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt={name}
              width="100%"
              height="auto"
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ 
                opacity: (localImageLoaded || imageLoaded) ? 1 : 0,
                display: 'block',
                minHeight: '10rem'
              }}
              onLoad={() => {
                setLocalImageLoaded(true);
                setShowLoading(false);
                onImageLoad?.();
              }}
              onError={() => {
                if (retryCount >= 2) {
                  setImageError(true);
                }
              }}
              // Use eager loading for all images
              loading="eager"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
