
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamImageLoadingIndicatorProps {
  loadingProgress: number;
  totalImages: number;
  loadedImages: number;
  networkStatus: 'online' | 'offline';
  onRetry?: () => void;
}

/**
 * TeamImageLoadingIndicator component - Shows loading progress for team images
 * 
 * Features:
 * - Mobile-optimized loading indicator with progress tracking
 * - Network status awareness with offline mode support
 * - Progress percentage display with visual indicator
 * - Enhanced retry button that works regardless of network status
 * - Responsive design that works on all devices
 */
const TeamImageLoadingIndicator = ({ 
  loadingProgress, 
  totalImages, 
  loadedImages,
  networkStatus,
  onRetry
}: TeamImageLoadingIndicatorProps) => {
  
  // Determine if retry should be enabled - now always enabled if images aren't fully loaded
  const shouldEnableRetry = loadedImages < totalImages;
  
  const handleRetryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Retry button clicked, calling onRetry handler");
    onRetry?.();
  };
  
  return (
    <div className="w-full rounded-lg bg-white shadow-md p-6 mb-8 border-l-4 border-[#FBB03B]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-[#274675]">Loading team members</h3>
        <span className="text-sm font-medium text-[#3C403A]">{loadedImages}/{totalImages}</span>
      </div>
      
      <Progress 
        value={loadingProgress} 
        className="h-3 mb-4 bg-gray-200" 
      />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {networkStatus === 'online' ? (
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          ) : (
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          )}
          <span className="text-sm text-[#3C403A]">
            {networkStatus === 'online' 
              ? `Loading: ${Math.round(loadingProgress)}%` 
              : 'Connection issue detected'}
          </span>
        </div>
        
        {/* Modified retry button - now active when images aren't fully loaded */}
        <button 
          onClick={handleRetryClick}
          aria-label="Retry loading images"
          className={`text-sm px-3 py-1 bg-[#FBB03B] text-white rounded-md 
            ${shouldEnableRetry ? 'hover:bg-[#f9a718] cursor-pointer' : 'opacity-50 cursor-not-allowed'} 
            transition-colors`}
          disabled={!shouldEnableRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default TeamImageLoadingIndicator;
