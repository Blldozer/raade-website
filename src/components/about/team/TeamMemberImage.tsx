import { useState, useRef, useEffect } from "react";
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
 * - Fixed for reliable display on all devices including mobile
 */
const TeamMemberImage = ({ name, onImageLoad }: TeamMemberImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  // Track image loading state locally
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  // Track if image should show loading state - start hidden so we don't show loading for cached images
  const [showLoading, setShowLoading] = useState(false);
  
  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`;
  };

  const { imageRef, imageSrc, imageLoaded } = ImageLoader({
    name,
    onImageLoad,
    retryCount,
    setRetryCount,
    setImageError,
    imageError
  });

  // Effect to coordinate imageLoaded state from ImageLoader with local state
  useEffect(() => {
    if (imageLoaded) {
      console.log(`Image for ${name} marked as loaded from ImageLoader`);
      setLocalImageLoaded(true);
      setShowLoading(false);
    }
  }, [imageLoaded, name]);
  
  // Show loading state after a short delay if image hasn't loaded yet
  // This prevents flickering for fast/cached images
  useEffect(() => {
    if (!localImageLoaded && !imageLoaded) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [localImageLoaded, imageLoaded]);

  // Debug logging on mount
  useEffect(() => {
    console.log(`TeamMemberImage mounted for ${name}`);
    return () => {
      console.log(`TeamMemberImage unmounted for ${name}`);
    };
  }, [name]);

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
          {showLoading && !localImageLoaded && !imageLoaded && (
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
              width="100%"
              height="auto"
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ 
                opacity: (localImageLoaded || imageLoaded) ? 1 : 0,
                display: 'block', // Force display block to ensure visibility
                minHeight: '10rem' // Ensure minimum height even before load
              }}
              onLoad={() => {
                console.log(`Image for ${name} loaded in DOM`);
                setLocalImageLoaded(true);
                setShowLoading(false);
                onImageLoad?.();
              }}
              onError={(e) => {
                console.error(`Error loading image for ${name}:`, e);
                if (retryCount >= 2) {
                  console.log(`Setting image error to true for ${name} after max retries`);
                  setImageError(true);
                }
              }}
              // Use eager loading for all images to improve loading speed
              loading="eager"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
