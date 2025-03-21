
import { useState, useRef, useEffect } from "react";
import ImageLoader from "./ImageLoader";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
}

/**
 * TeamMemberImage component - Renders the team member image with fallbacks
 * Features:
 * - Improved skeleton loading state
 * - Better fallback to initials when image fails to load
 * - Enhanced visual feedback during loading
 * - Fixed for reliable display on all devices including mobile
 * - Detailed console logging for debugging
 */
const TeamMemberImage = ({ name, onImageLoad }: TeamMemberImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  // Track image loading state locally
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  // Track if image should show loading state - start hidden so we don't show loading for cached images
  const [showLoading, setShowLoading] = useState(false);
  
  // Placeholder initials for fallback - with enhanced error handling
  const getInitials = () => {
    if (!name || typeof name !== 'string') return 'XX';
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || 'X'}${nameParts[1]?.[0] || ''}`;
  };

  // Log component lifecycle for debugging
  useEffect(() => {
    console.log(`[DEBUG-TEAM] TeamMemberImage mounted for "${name}"`);
    return () => {
      console.log(`[DEBUG-TEAM] TeamMemberImage unmounted for "${name}"`);
    };
  }, [name]);

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
      console.log(`[DEBUG-TEAM] Image for ${name} marked as loaded from ImageLoader`);
      setLocalImageLoaded(true);
      setShowLoading(false);
    }
  }, [imageLoaded, name]);
  
  // Show loading state after a short delay if image hasn't loaded yet
  // This prevents flickering for fast/cached images
  useEffect(() => {
    if (!localImageLoaded && !imageLoaded) {
      console.log(`[DEBUG-TEAM] Starting loading timer for ${name}`);
      const timer = setTimeout(() => {
        console.log(`[DEBUG-TEAM] Setting showLoading=true for ${name} after timer`);
        setShowLoading(true);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [localImageLoaded, imageLoaded, name]);
  
  // Force a fallback after a certain timeout to prevent endless waiting
  useEffect(() => {
    // If image hasn't loaded after 12 seconds, show fallback
    const fallbackTimer = setTimeout(() => {
      if (!localImageLoaded && !imageLoaded) {
        console.warn(`[DEBUG-TEAM] Image load timeout for ${name}, showing fallback`);
        setImageError(true);
      }
    }, 12000); // 12-second timeout
    
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
        /* Render image with proper loading states */
        <div className="w-full aspect-[3/4] bg-[#4C504A] relative">
          {/* Show skeleton loading state with improved visual feedback */}
          {showLoading && !localImageLoaded && !imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-lg mb-2">Loading...</span>
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
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
              onLoad={(e) => {
                console.log(`[DEBUG-TEAM] Image for ${name} loaded in DOM successfully`);
                setLocalImageLoaded(true);
                setShowLoading(false);
                onImageLoad?.();
              }}
              onError={(e) => {
                console.error(`[DEBUG-TEAM] Error loading image for ${name} in DOM:`, e);
                if (retryCount >= 2) {
                  console.log(`[DEBUG-TEAM] Setting image error to true for ${name} after max retries in DOM`);
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
