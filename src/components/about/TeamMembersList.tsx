import { motion } from "framer-motion";
import TeamMember from "./TeamMember";
import { useState, useEffect } from "react";
import TeamImageLoadingIndicator from "./team/TeamImageLoadingIndicator";
import TeamImageSkeleton from "./team/TeamImageSkeleton";
import { useIsMobile } from "../hooks/use-mobile";

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
  const loadingThreshold = isMobile ? 0.4 : 0.2; // 40% on mobile, 20% on desktop

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
    
    if (percent === 100) {
      console.log("All team member images loaded successfully");
    }
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
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Mobile loading indicator - only shown during initial load */}
      {isMobile && showSkeletons && loadingProgress < 100 && (
        <TeamImageLoadingIndicator 
          loadingProgress={loadingProgress}
          totalImages={totalImages}
          loadedImages={loadedCount}
          networkStatus={networkStatus}
          onRetry={handleRetry}
        />
      )}
      
      {/* Desktop loading progress indicator */}
      {!isMobile && isInView && isLoaded && loadingProgress < 100 && networkStatus === 'online' && (
        <div className="w-full mb-8 bg-gray-200 rounded-full h-2.5 hidden sm:block">
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
          showSkeletons && isMobile ? (
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
