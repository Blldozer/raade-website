import { useState, useEffect, memo } from "react";
import ImageLoader from "./ImageLoader";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
  isPriority?: boolean;
}

/**
 * TeamMemberImage component - Renders the team member image with optimized loading
 * Features:
 * - Improved performance with proper placeholders and size reservation
 * - Efficient image loading with WebP format support
 * - Prevents layout shifts during scrolling
 * - Memoized to prevent unnecessary re-renders
 * - Eliminates jerky scrolling behavior
 */
const TeamMemberImage = memo(({ name, onImageLoad, isPriority = false }: TeamMemberImageProps) => {
  // Use the simplified ImageLoader hook
  const { imageRef, imageSrc, imageLoaded, imageError } = ImageLoader({
    name,
    onImageLoad
  });
  
  // Always consider an image visually loaded after a short timeout
  const [forceLoaded, setForceLoaded] = useState(false);
  
  // Show a placeholder immediately and let the real image load in the background
  useEffect(() => {
    // Immediately set forced loaded to true for UI stability
    setForceLoaded(true);
    
    // Let the real image load in the background
    if (imageLoaded) {
      console.log(`Image for ${name} loaded successfully`);
    }
  }, [imageLoaded, name]);
  
  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`;
  };

  return (
    <div className="rounded-t-lg overflow-hidden h-full">
      {/* Render green block if image failed to load */}
      {imageError ? (
        <div className="w-full aspect-[3/4] bg-green-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">
            {getInitials()}
          </span>
        </div>
      ) : (
        /* Render image with proper placeholders */
        <div 
          className="w-full aspect-[3/4] bg-[#4C504A] relative"
          style={{
            // Reserve exact space with fixed aspect ratio to prevent layout shifts
            height: '0',
            paddingBottom: '133.33%' // 4:3 aspect ratio (75%)
          }}
        >
          {/* The actual image with efficient loading */}
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt={name}
              width={300}
              height={400}
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ 
                opacity: imageLoaded ? 1 : 0.3, // Show faded image while loading for better UX
                willChange: 'opacity', // Hint to browser for optimization
                transform: 'translateZ(0)' // Force GPU acceleration
              }}
              loading={isPriority ? "eager" : "lazy"}
              decoding="async" // Use async decoding for better performance
              fetchPriority={isPriority ? "high" : "auto"} // Modern browsers optimization
            />
          )}
          
          {/* Show initials as placeholder while loading for immediate visual feedback */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">{getInitials()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

// Display name for debugging
TeamMemberImage.displayName = "TeamMemberImage";

export default TeamMemberImage;
