
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
 * TeamMembersList component with simplified loading approach
 * Shows skeletons during loading with minimal thresholds
 * Focuses on reliability over complex loading strategies
 */
const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  // Track which images are loaded
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online'|'offline'>(navigator.onLine ? 'online' : 'offline');
  const [retryCount, setRetryCount] = useState(0);
  
  // Get device info
  const isMobile = useIsMobile();
  
  // Count loaded images
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const totalImages = teamMembers.length;
  
  // Show skeletons until threshold or timeout
  const [showSkeletons, setShowSkeletons] = useState(true);
  
  // Simplified threshold - show content faster
  const loadingThreshold = 0.1; // 10% loaded is enough to show content
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Calculate loading progress
  useEffect(() => {
    const percent = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;
    setLoadingProgress(percent);
    
    // Hide skeletons once threshold reached
    if (percent >= loadingThreshold * 100) {
      setShowSkeletons(false);
    }
  }, [loadedImages, totalImages, loadingThreshold, loadedCount]);

  // Force hide skeletons after timeout
  useEffect(() => {
    // Hide skeletons after 3 seconds regardless of load state
    const timer = setTimeout(() => {
      setShowSkeletons(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simple retry function
  const handleRetry = () => {
    // Increment retry counter to force reload
    setRetryCount(prevCount => prevCount + 1);
    
    // Reset loaded state for images
    const updatedLoadedState = { ...loadedImages };
    for (const member of teamMembers) {
      updatedLoadedState[member.name] = false;
    }
    setLoadedImages(updatedLoadedState);
    
    // Show skeletons briefly for visual feedback
    setShowSkeletons(true);
    setTimeout(() => {
      setShowSkeletons(false);
    }, 1000);
  };

  // Handle image load notification
  const handleImageLoaded = (memberName: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  // Container animation with minimal delay
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced for faster appearance
        delayChildren: 0.05 // Minimal delay
      }
    }
  };

  return (
    <>
      {/* Mobile loading indicator */}
      {isMobile && loadingProgress < 100 && (
        <TeamImageLoadingIndicator 
          loadingProgress={loadingProgress}
          totalImages={totalImages}
          loadedImages={loadedCount}
          networkStatus={networkStatus}
          onRetry={handleRetry}
        />
      )}
      
      {/* Desktop loading progress */}
      {!isMobile && isInView && isLoaded && loadingProgress < 100 && (
        <div className="w-full mb-8 bg-gray-200 rounded-full h-2.5 block">
          <div 
            className="bg-[#FBB03B] h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}
      
      {/* Offline message */}
      {networkStatus === 'offline' && (
        <div className="w-full mb-8 p-4 bg-gray-100 text-gray-700 rounded-lg text-center">
          You appear to be offline. Some team photos may not load properly.
          <button 
            onClick={handleRetry}
            className="mt-2 px-3 py-1 bg-[#FBB03B] text-white rounded-md hover:bg-[#f9a718] transition-colors block mx-auto"
          >
            Try Again
          </button>
        </div>
      )}
    
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate={isInView && isLoaded ? "show" : "hidden"}
        exit="hidden"
      >
        {/* Show either skeletons or actual team members */}
        {teamMembers.map((member, index) => (
          showSkeletons && isMobile ? (
            <TeamImageSkeleton key={`skeleton-${index}`} />
          ) : (
            <TeamMember 
              key={`${member.name}-${index}-${retryCount}`} 
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
