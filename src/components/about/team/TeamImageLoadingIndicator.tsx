
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
 * Displays loading progress for team member images on mobile devices
 * Provides visual feedback and retry capability with detailed logs
 */
const TeamImageLoadingIndicator = ({ 
  loadingProgress, 
  totalImages, 
  loadedImages,
  networkStatus,
  onRetry
}: TeamImageLoadingIndicatorProps) => {
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  
  // Track retry attempts for better debugging
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  // Show retry message if nothing loads after 3 seconds
  useEffect(() => {
    console.log(`[DEBUG-TEAM] Retry message timer starting. Current progress: ${loadingProgress}%`);
    
    const timer = setTimeout(() => {
      // Only show retry message if progress is still at 0%
      if (loadedImages === 0 && loadingProgress === 0) {
        console.log('[DEBUG-TEAM] No images loaded after 3s, showing retry message');
        setShowRetryMessage(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [loadedImages, loadingProgress]);

  const handleRetryClick = () => {
    console.log('[DEBUG-TEAM] Retry button clicked in loading indicator');
    setRetryAttempts(prev => prev + 1);
    
    // Log network status when retry is clicked
    console.log(`[DEBUG-TEAM] Network status at retry: ${networkStatus}`);
    console.log(`[DEBUG-TEAM] Online status from navigator: ${navigator.onLine ? 'online' : 'offline'}`);
    
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
      
      {/* Connection info - helps debug network issues */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>Connection: {networkStatus}</span>
        <span>Retry attempts: {retryAttempts}</span>
      </div>
      
      {/* Show retry UI if needed */}
      {(showRetryMessage || loadingProgress === 0 || networkStatus === 'offline') && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {networkStatus === 'offline' 
              ? "You appear to be offline. Please check your connection." 
              : "Having trouble loading images?"}
          </p>
          <button
            onClick={handleRetryClick}
            className="px-4 py-2 bg-[#FBB03B] text-white rounded hover:bg-[#f9a718] transition-colors"
            // Only disable if explicitly offline and at least one retry was attempted
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
