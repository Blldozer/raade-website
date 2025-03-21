
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
 * - Enhanced loading coordination of team member images
 * - Improved mobile loading indicators with visual feedback
 * - Better network status detection and handling
 * - Robust retry mechanism with force reload capability
 * - Optimized mobile experience with reduced loading thresholds
 */
const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  // Track which images are loaded to improve rendering reliability
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online'|'offline'>(navigator.onLine ? 'online' : 'offline');
  const [retryCount, setRetryCount] = useState(0);
  
  // Get device info for conditional rendering
  const isMobile = useIsMobile();
  
  // Count how many images have actually loaded
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const totalImages = teamMembers.length;
  
  // Force skeleton display on mobile until a threshold of images are loaded
  const [showSkeletons, setShowSkeletons] = useState(true);
  
  // Reduced thresholds for faster perceived loading
  const loadingThreshold = isMobile ? 0.2 : 0.1; // 20% on mobile, 10% on desktop
  
  // Log component mounting for debugging
  useEffect(() => {
    console.log(`[DEBUG-TEAM] TeamMembersList mounted with ${teamMembers.length} members, isMobile: ${isMobile}`);
    return () => {
      console.log("[DEBUG-TEAM] TeamMembersList unmounting");
    };
  }, [teamMembers.length, isMobile]);

  // Preload first few images for faster initial display
  useEffect(() => {
    if (isInView && isLoaded) {
      console.log("[DEBUG-TEAM] TeamMembersList is in view and loaded, preloading priority images");
      
      // Preload first 3 images immediately
      const preloadCount = isMobile ? 2 : 3;
      const preloadImages = teamMembers.slice(0, preloadCount);
      
      preloadImages.forEach(member => {
        const formattedName = member.name.split(" ").join("-");
        
        // Try both image formats in parallel
        const imgJpg = new Image();
        imgJpg.src = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
        
        const imgWebp = new Image();
        imgWebp.src = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
        
        // Setup handlers for both formats
        const handleLoad = () => {
          console.log(`[DEBUG-TEAM] Preloaded image for ${member.name}`);
          handleImageLoaded(member.name);
        };
        
        // Log errors for preloads
        const handleError = (format: string, error: ErrorEvent) => {
          console.error(`[DEBUG-TEAM] Failed to preload ${format} image for ${member.name}:`, error);
          
          // Check if the image actually exists
          const imgPath = format === 'jpg' 
            ? `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`
            : `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
            
          fetch(imgPath, { method: 'HEAD' })
            .then(response => {
              console.log(`[DEBUG-TEAM] HEAD request for ${imgPath} returned status: ${response.status} (${response.ok ? 'OK' : 'Not Found'})`);
            })
            .catch(error => {
              console.error(`[DEBUG-TEAM] HEAD request for ${imgPath} failed:`, error);
            });
        };
        
        imgJpg.onload = handleLoad;
        imgJpg.onerror = (e) => handleError('jpg', e as ErrorEvent);
        
        imgWebp.onload = handleLoad;
        imgWebp.onerror = (e) => handleError('webp', e as ErrorEvent);
        
        console.log(`[DEBUG-TEAM] Attempting to preload images for ${member.name}`);
      });
    }
  }, [isInView, isLoaded, teamMembers, isMobile]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log("[DEBUG-TEAM] Browser is online, attempting to reload any failed images");
      setNetworkStatus('online');
    };
    
    const handleOffline = () => {
      console.log("[DEBUG-TEAM] Browser is offline, images may fail to load");
      setNetworkStatus('offline');
    };
    
    // Check initial status
    const initialStatus = navigator.onLine ? 'online' : 'offline';
    console.log(`[DEBUG-TEAM] Initial network status: ${initialStatus}`);
    setNetworkStatus(initialStatus);
    
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
    console.log(`[DEBUG-TEAM] Team image loading progress: ${Math.round(percent)}% (${loadedCount}/${totalImages})`);
    setLoadingProgress(percent);
    
    // List which images have loaded and which haven't
    if (Object.keys(loadedImages).length > 0) {
      const loaded = Object.entries(loadedImages)
        .filter(([_, isLoaded]) => isLoaded)
        .map(([name, _]) => name);
      
      const notLoaded = Object.entries(loadedImages)
        .filter(([_, isLoaded]) => !isLoaded)
        .map(([name, _]) => name);
      
      console.log(`[DEBUG-TEAM] Loaded images (${loaded.length}): ${loaded.join(', ')}`);
      console.log(`[DEBUG-TEAM] Not loaded images (${notLoaded.length}): ${notLoaded.join(', ')}`);
    }
    
    // Hide skeletons once we reach the threshold
    if (percent >= loadingThreshold * 100) {
      console.log(`[DEBUG-TEAM] Reached loading threshold of ${loadingThreshold * 100}%, hiding skeletons`);
      setShowSkeletons(false);
    }
    
    if (percent === 100) {
      console.log("[DEBUG-TEAM] All team member images loaded successfully");
    }
  }, [loadedImages, totalImages, loadingThreshold, loadedCount]);

  // Enhanced retry function that forces reload of all unloaded images
  const handleRetry = () => {
    console.log("[DEBUG-TEAM] Retry button clicked, attempting to reload all unloaded images");
    
    // Increment retry counter to force ImageLoader components to try again
    setRetryCount(prevCount => {
      const newCount = prevCount + 1;
      console.log(`[DEBUG-TEAM] Incrementing retry count from ${prevCount} to ${newCount}`);
      return newCount;
    });
    
    // Reset loaded state for unloaded images to force a fresh attempt
    const updatedLoadedState = { ...loadedImages };
    for (const member of teamMembers) {
      if (!updatedLoadedState[member.name]) {
        console.log(`[DEBUG-TEAM] Marking ${member.name} for reload attempt`);
        // Explicitly set to false to trigger a reload
        updatedLoadedState[member.name] = false;
      }
    }
    setLoadedImages(updatedLoadedState);
    
    // Force skeletons to show briefly to give visual feedback that retry is happening
    setShowSkeletons(true);
    setTimeout(() => {
      if (loadedCount / totalImages >= loadingThreshold) {
        setShowSkeletons(false);
      }
    }, 1000);
  };

  // Handle notification when an image loads successfully
  const handleImageLoaded = (memberName: string) => {
    console.log(`[DEBUG-TEAM] Image loaded successfully for team member: ${memberName}`);
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
        staggerChildren: 0.08, // Reduced for faster animation
        delayChildren: 0.1 // Reduced for faster loading perception
      }
    }
  };

  return (
    <>
      {/* Always show mobile loading indicator when not all images are loaded */}
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
        {/* Render either skeletons or actual team members based on loading state */}
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
