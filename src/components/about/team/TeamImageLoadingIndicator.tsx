
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
 * - Retry button for connection issues
 * - Responsive design that works on all devices
 */
const TeamImageLoadingIndicator = ({ 
  loadingProgress, 
  totalImages, 
  loadedImages,
  networkStatus,
  onRetry
}: TeamImageLoadingIndicatorProps) => {
  return (
    <div className="w-full rounded-lg bg-white shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-[#274675]">Loading team members</h3>
        <span className="text-sm font-medium text-[#3C403A]">{loadedImages}/{totalImages}</span>
      </div>
      
      <Progress 
        value={loadingProgress} 
        className="h-2 mb-4 bg-gray-200" 
      />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {networkStatus === 'online' ? (
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          ) : (
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          )}
          <span className="text-sm text-[#3C403A]">
            {networkStatus === 'online' 
              ? `Loading: ${Math.round(loadingProgress)}%` 
              : 'Connection issue detected'}
          </span>
        </div>
        
        {networkStatus === 'offline' && (
          <button 
            onClick={onRetry}
            className="text-sm px-3 py-1 bg-[#FBB03B] text-white rounded-md hover:bg-[#f9a718] transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamImageLoadingIndicator;
