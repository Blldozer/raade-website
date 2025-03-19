import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ImageLoader from "./ImageLoader";
import useIsMobile from "../../../hooks/useIsMobile";

interface TeamMemberImageProps {
  name: string;
  onImageLoad?: () => void;
  priority?: boolean;
}

/**
 * TeamMemberImage component - Responsible for loading and displaying a team member's image
 * Features:
 * - Optimized image loading with fallbacks
 * - Skeleton loading state for better UX
 * - WebP support with JPG fallback
 * - Mobile optimization
 * - Fixed image loading on first page visit
 */
const TeamMemberImage = ({ name, onImageLoad, priority = false }: TeamMemberImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(`TeamMemberImage for ${name} mounted, priority: ${priority}`);
    setIsVisible(true);

    return () => {
      console.log(`TeamMemberImage for ${name} unmounted`);
    };
  }, [name, priority]);

  const formatNameForPath = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const formattedName = formatNameForPath(name);

  const handleImageLoad = () => {
    console.log(`TeamMemberImage: Image loaded for ${name}`);
    setImageLoaded(true);
    setImageError(false);
    if (onImageLoad) {
      onImageLoad();
    }
  };

  const handleImageError = () => {
    console.error(`TeamMemberImage: Error loading image for ${name}`);
    setImageError(true);
  };

  return (
    <div className="relative aspect-[4/3] bg-[#3C403A]">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3C403A]">
          <Skeleton className="w-full h-full absolute inset-0" />
        </div>
      )}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3C403A] text-white text-center p-4">
          <p>Unable to load image</p>
        </div>
      )}
      {isVisible && (
        <div className={`relative w-full h-full overflow-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ImageLoader
            name={formattedName}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default TeamMemberImage;
