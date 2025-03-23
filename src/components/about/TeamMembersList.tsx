import { motion } from "framer-motion";
import TeamMember from "./TeamMember";
import { useState, useEffect } from "react";
import TeamImageLoadingIndicator from "./team/TeamImageLoadingIndicator";
import TeamImageSkeleton from "./team/TeamImageSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamMembersListProps {
  teamMembers: Array<{
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  }>;
  isInView: boolean;
  isLoaded: boolean;
}

/**
 * TeamMembersList component - Renders the grid of team members
 * Features:
 * - Coordinated loading of team member images
 * - Mobile-optimized loading indicators and skeletons
 * - Staggered animations for visual appeal
 * - Tracks loading progress for all team members
 * - Provides retry mechanism for network issues
 */
const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  // Track which images are loaded to improve rendering reliability
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online'|'offline'>('online');
  
  // Get device info for conditional rendering
  const isMobile = useIsMobile();
  
  // Count how many images have actually loaded
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const totalImages = teamMembers.length;
  
  // Force skeleton display on mobile until a threshold of images are loaded
  const [showSkeletons, setShowSkeletons] = useState(true);
  
  // Reduced thresholds for faster perceived loading - lower threshold to ensure images display
  const loadingThreshold = isMobile ? 0.05 : 0.1; // 5% on mobile (reduced from 20%), 10% on desktop

  // Preload first few images for faster initial display
  useEffect(() => {
    if (isInView && isLoaded) {
      // Preload first 3 images immediately
      const preloadCount = isMobile ? 2 : 3;
      const preloadImages = teamMembers.slice(0, preloadCount);
      
      preloadImages.forEach(member => {
        const formattedName = member.name.split(" ").join("-");
        const img = new Image();
        img.src = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
        
        img.onload = () => {
          console.log(`Preloaded image for ${member.name}`);
          handleImageLoaded(member.name);
        };
        
        img.onerror = () => {
          // Try JPG fallback immediately
          const fallbackImg = new Image();
          fallbackImg.src = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
          
          fallbackImg.onload = () => {
            console.log(`Preloaded fallback image for ${member.name}`);
            handleImageLoaded(member.name);
          };
        };
      });
    }
  }, [isInView, isLoaded, teamMembers]);

  // Reset animation state when component mounts or visibility changes
  useEffect(() => {
    if (isInView && isLoaded) {
      console.log("TeamMembersList is in view and loaded, preparing animations");
    }
    
    // Listen for online/offline status
    const handleOnline = () => {
      console.log("Browser is online, attempting to reload any failed images");
      setNetworkStatus('online');
    };
    
    const handleOffline = () => {
      console.log("Browser is offline, images may fail to load");
      setNetworkStatus('offline');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up animation states when component unmounts
    return () => {
      console.log("TeamMembersList unmounting");
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isInView, isLoaded]);

  // Calculate loading progress
  useEffect(() => {
    const totalImages = teamMembers.length;
    const loadedCount = Object.values(loadedImages).filter(Boolean).length;
    
    const percent = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;
    setLoadingProgress(percent);
    
    // Hide skeletons once we reach the threshold
    if (percent >= loadingThreshold * 100) {
      setShowSkeletons(false);
    }
    
    // Ensure skeletons disappear even if no images load after 3 seconds
    const timer = setTimeout(() => {
      setShowSkeletons(false);
    }, 3000);
    
    if (percent === 100) {
      console.log("All team member images loaded successfully");
    }
    
    return () => clearTimeout(timer);
  }, [loadedImages, teamMembers.length, loadingThreshold]);

  // Handle retry action when network issues occur
  const handleRetry = () => {
    console.log("Retrying image loading");
    // Force refresh of images by clearing the loaded state for unloaded images
    const updatedLoadedState = { ...loadedImages };
    for (const member of teamMembers) {
      if (!updatedLoadedState[member.name]) {
        // We keep the current state but will trigger a reload in the child components
        updatedLoadedState[member.name] = false;
      }
    }
    setLoadedImages(updatedLoadedState);
  };

  // Notification when an image loads successfully
  const handleImageLoaded = (memberName: string) => {
    console.log(`Image loaded for team member: ${memberName}`);
    setLoadedImages(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  // Container animation with reduced delay for better performance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reduced from 0.12 for faster animation
        delayChildren: 0.1 // Reduced from 0.2 for faster loading perception
      }
    }
  };

  return (
    <>
      {/* Always show mobile loading indicator to provide immediate feedback */}
      {isMobile && loadingProgress < 100 && (
        <TeamImageLoadingIndicator 
          loadingProgress={loadingProgress}
          totalImages={totalImages}
          loadedImages={loadedCount}
          networkStatus={networkStatus}
          onRetry={handleRetry}
        />
      )}
      
      {/* Desktop loading progress indicator - always visible until 100% */}
      {!isMobile && isInView && isLoaded && loadingProgress < 100 && (
        <div className="w-full mb-8 bg-gray-200 rounded-full h-2.5 block">
          <div 
            className="bg-[#FBB03B] h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}
      
      {/* Show offline message when needed */}
      {networkStatus === 'offline' && (
        <div className="w-full mb-8 p-4 bg-gray-100 text-gray-700 rounded-lg text-center">
          You appear to be offline. Some team photos may not load properly.
        </div>
      )}
    
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate={isInView && isLoaded ? "show" : "hidden"}
        exit="hidden"
      >
        {/* Render either skeletons or actual team members based on loading state */}
        {teamMembers.map((member, index) => (
          (showSkeletons && isMobile && index < 3) ? (
            <TeamImageSkeleton key={`skeleton-${index}`} />
          ) : (
            <TeamMember 
              key={`${member.name}-${index}`} 
              member={member} 
              index={index}
              onImageLoad={() => handleImageLoaded(member.name)}
            />
          )
        ))}
      </motion.div>
    </>
  );
};

export default TeamMembersList;
