import React, { useRef, useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoLoaded: boolean;
  setVideoLoaded: (loaded: boolean) => void;
}

const VideoBackground = ({ videoLoaded, setVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<string>('unknown');
  const [debugLog, setDebugLog] = useState<string[]>([]);
  
  // Helper function to add to debug log
  const logDebug = (message: string, data?: any) => {
    const logMessage = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.log(`[VideoBackground] ${logMessage}`, data);
    setDebugLog(prev => [...prev, `${new Date().toISOString().substr(11, 8)} - ${logMessage}`]);
  };
  
  // Check if device is mobile and detect connection speed
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      logDebug(`Device detected as ${isMobileDevice ? 'mobile' : 'desktop'}`, {
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Detect connection speed
    const checkConnectionSpeed = () => {
      if ('connection' in navigator && navigator.connection) {
        const conn = navigator.connection as any;
        if (conn.effectiveType) {
          setConnectionSpeed(conn.effectiveType);
          logDebug(`Connection speed detected`, {
            effectiveType: conn.effectiveType,
            downlink: conn.downlink,
            rtt: conn.rtt,
            saveData: conn.saveData
          });
        }
      } else {
        logDebug('Connection API not available');
      }
    };
    
    checkMobile();
    checkConnectionSpeed();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) {
      logDebug('Video reference not available');
      return;
    }

    // Basic video settings that work across devices
    video.preload = isMobile || connectionSpeed === '2g' || connectionSpeed === 'slow-2g' 
      ? "none" // Save bandwidth on mobile or slow connections
      : "metadata"; // Lighter preload for other connections
    video.playsInline = true;
    video.muted = true;
    video.setAttribute('fetchpriority', 'high'); // Signal browser this is high priority
    
    logDebug('Video settings applied', {
      preload: video.preload,
      playsInline: video.playsInline,
      muted: video.muted,
      fetchPriority: video.getAttribute('fetchpriority')
    });
    
    // Add hardware acceleration hints
    video.style.transform = 'translate3d(0, 0, 0)';
    video.classList.add('optimized-video');
    
    // Handle video loading
    const handleCanPlay = () => {
      logDebug('Video can play event triggered');
      setVideoLoaded(true);
      // Attempt to play with error handling
      video.play().catch(e => {
        logDebug("Video autoplay prevented", { error: e.message });
        // If we can't play video, still mark as loaded and show fallback
        setVideoLoaded(true);
        setVideoError(true);
      });
    };
    
    const handleLoadStart = () => {
      logDebug('Video load started');
    };
    
    const handleLoadedMetadata = () => {
      logDebug('Video metadata loaded', {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      });
    };
    
    const handleLoadedData = () => {
      logDebug('Video data loaded');
    };
    
    const handleWaiting = () => {
      logDebug('Video waiting for more data');
    };
    
    const handleStalled = () => {
      logDebug('Video download stalled');
    };
    
    const handleSuspend = () => {
      logDebug('Video loading suspended by browser');
    };
    
    const handleError = () => {
      const videoErrorCode = video.error ? video.error.code : 'unknown';
      const videoErrorMessage = video.error ? video.error.message : 'unknown';
      
      logDebug("Video loading error", { 
        code: videoErrorCode, 
        message: videoErrorMessage 
      });
      
      setVideoError(true);
      setVideoLoaded(true); // Still mark as loaded to show fallback
    };
    
    // Don't even attempt to load video on slow connections
    if (isMobile && (connectionSpeed === '2g' || connectionSpeed === 'slow-2g')) {
      logDebug('Skipping video load due to slow connection on mobile');
      setVideoError(true);
      setVideoLoaded(true);
      return;
    }
    
    // Add event listeners for detailed debugging
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('suspend', handleSuspend);
    video.addEventListener('error', handleError);
    
    logDebug('Video event listeners attached');
    
    // Set a timeout to mark video as loaded even if it stalls - reduced from 3s to 2s
    const timeoutId = setTimeout(() => {
      if (!videoLoaded) {
        logDebug("Video load timeout - forcing loaded state");
        setVideoLoaded(true);
      }
    }, 2000);
    
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('suspend', handleSuspend);
      video.removeEventListener('error', handleError);
      clearTimeout(timeoutId);
      logDebug('Video component cleanup');
    };
  }, [videoLoaded, setVideoLoaded, isMobile, connectionSpeed]);
  
  // Debug display for development - can be removed in production
  const renderDebugInfo = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return (
        <div 
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '5px',
            fontSize: '10px',
            maxHeight: '100px',
            overflow: 'auto',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}
        >
          <div>
            <strong>Mobile:</strong> {isMobile ? 'Yes' : 'No'} |
            <strong> Speed:</strong> {connectionSpeed} |
            <strong> Error:</strong> {videoError ? 'Yes' : 'No'} |
            <strong> Loaded:</strong> {videoLoaded ? 'Yes' : 'No'}
          </div>
          <div style={{ fontSize: '8px' }}>
            {debugLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Always provide a gradient background as fallback/placeholder */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#2A466D] to-[#1A365D]"
        style={{ 
          opacity: (videoLoaded && !videoError) ? (isMobile ? 0.7 : 0) : 1, 
          transition: 'opacity 0.8s ease-out'
        }}
      />
      
      {/* Only load video if not on mobile with slow connection */}
      {(!isMobile || (connectionSpeed !== '2g' && connectionSpeed !== 'slow-2g')) && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover optimized-video"
          style={{ 
            opacity: (videoLoaded && !videoError) ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
            display: videoError ? 'none' : 'block',
            willChange: 'transform'
          }}
        >
          <source src="/hero-background.webm" type="video/webm" />
          <source src="/hero-background.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Render debug info in development */}
      {renderDebugInfo()}
    </div>
  );
};

export default VideoBackground;
