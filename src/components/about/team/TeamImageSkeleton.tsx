
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

/**
 * TeamImageSkeleton component - Placeholder for team member images while loading
 * 
 * Features:
 * - Shimmer effect for better visual feedback
 * - Matches the proportions of actual team member cards
 * - Responsive design for all screen sizes
 * - Animated appearance for smoother UX
 */
const TeamImageSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      className="rounded-lg overflow-hidden shadow-md"
    >
      {/* Image placeholder */}
      <Skeleton className="w-full aspect-[3/4] bg-gray-200" />
      
      {/* Text content placeholder */}
      <div className="p-6 bg-[#3C403A]">
        <Skeleton className="h-5 w-2/3 mb-3 bg-gray-500/20" />
        <Skeleton className="h-4 w-1/2 bg-gray-500/20" />
      </div>
    </motion.div>
  );
};

export default TeamImageSkeleton;
