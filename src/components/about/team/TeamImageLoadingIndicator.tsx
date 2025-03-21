
import { useState, useEffect } from 'react';

interface TeamImageLoadingIndicatorProps {
  loadingProgress: number;
  totalImages: number;
  loadedImages: number;
  networkStatus: 'online' | 'offline';
  onRetry: () => void;
}

/**
 * TeamImageLoadingIndicator component
 * Simplified version with more aggressive retry behavior
 * Shows loading progress with clear visual feedback
 */
const TeamImageLoadingIndicator = ({ 
  loadingProgress, 
  totalImages, 
  loadedImages,
  networkStatus,
  onRetry
}: TeamImageLoadingIndicatorProps) => {
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  // Show retry message sooner - after 2 seconds instead of 3
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadedImages === 0 && loadingProgress === 0) {
        setShowRetryMessage(true);
      }
    }, 2000); // Reduced time to show retry option
    
    return () => clearTimeout(timer);
  }, [loadedImages, loadingProgress]);

  // More aggressive retry with forced reload
  const handleRetryClick = () => {
    setRetryAttempts(prev => prev + 1);
    
    // Call the provided retry handler
    onRetry();
    
    // Reset the retry message after clicking
    setShowRetryMessage(false);
  };

  return (
    <div className="w-full mb-8 bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">Loading team photos</span>
        <span className="text-gray-500 text-sm">{loadedImages}/{totalImages}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-[#FBB03B] h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
      
      {/* Connection info */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>Connection: {networkStatus}</span>
        <span>Retry attempts: {retryAttempts}</span>
      </div>
      
      {/* More prominent retry UI that shows up sooner */}
      {(showRetryMessage || loadingProgress < 10 || networkStatus === 'offline') && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {networkStatus === 'offline' 
              ? "You appear to be offline. Please check your connection." 
              : "Having trouble loading images?"}
          </p>
          <button
            onClick={handleRetryClick}
            className="px-4 py-2 bg-[#FBB03B] text-white rounded hover:bg-[#f9a718] transition-colors"
            disabled={networkStatus === 'offline' && retryAttempts > 0}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamImageLoadingIndicator;
