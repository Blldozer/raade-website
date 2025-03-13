
import { motion } from "framer-motion";
import TeamMember from "./TeamMember";
import { useState, useEffect } from "react";

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
 * - Staggered animations for visual appeal
 * - Mobile-optimized rendering with adaptable grid layout
 * - Tracks loading progress for all team members
 */
const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  // Track which images are loaded to improve rendering reliability
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online'|'offline'>('online');

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
    
    if (percent === 100) {
      console.log("All team member images loaded successfully");
    }
  }, [loadedImages, teamMembers.length]);

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
      {/* Optional loading progress indicator - only shown during initial load */}
      {isInView && isLoaded && loadingProgress < 100 && networkStatus === 'online' && (
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
        {teamMembers.map((member, index) => (
          <TeamMember 
            key={`${member.name}-${index}`} 
            member={member} 
            index={index}
            onImageLoad={() => handleImageLoaded(member.name)}
          />
        ))}
      </motion.div>
    </>
  );
};

export default TeamMembersList;
