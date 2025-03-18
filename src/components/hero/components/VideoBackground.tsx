import React, { useRef, useState, useEffect } from 'react';

// Define NetworkInformation interface based on the W3C specification
interface NetworkInformation {
  readonly downlink?: number;
  readonly effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  readonly rtt?: number;
  readonly saveData?: boolean;
  readonly type?: 'bluetooth' | 'cellular' | 'ethernet' | 'mixed' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax';
  onchange?: EventListener;
}

// Augment Navigator interface to include connection property
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface VideoBackgroundProps {
  videoLoaded: boolean;
  setVideoLoaded: (loaded: boolean) => void;
}

const VideoBackground = ({ videoLoaded, setVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<string>('unknown');
  
  // Check if device is mobile and detect connection speed
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Detect connection speed
    const checkConnectionSpeed = () => {
      if ('connection' in navigator) {
        const nav = navigator as NavigatorWithConnection;
        if (nav.connection && nav.connection.effectiveType) {
          setConnectionSpeed(nav.connection.effectiveType);
        }
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
    
    if (!video) return;

    // Basic video settings that work across devices
    video.preload = isMobile || connectionSpeed === '2g' || connectionSpeed === 'slow-2g' 
      ? "none" // Save bandwidth on mobile or slow connections
      : "metadata"; // Lighter preload for other connections
    video.playsInline = true;
    video.muted = true;
    video.setAttribute('fetchpriority', 'high'); // Signal browser this is high priority
    
    // Add hardware acceleration hints
    video.style.transform = 'translate3d(0, 0, 0)';
    video.classList.add('optimized-video');
    
    // Handle video loading
    const handleCanPlay = () => {
      setVideoLoaded(true);
      // Attempt to play with error handling
      video.play().catch(e => {
        console.error("Video autoplay prevented:", e);
        // If we can't play video, still mark as loaded and show fallback
        setVideoLoaded(true);
        setVideoError(true);
      });
    };
    
    const handleError = () => {
      console.error("Video loading error");
      setVideoError(true);
      setVideoLoaded(true); // Still mark as loaded to show fallback
    };
    
    // Don't even attempt to load video on slow connections
    if (isMobile && (connectionSpeed === '2g' || connectionSpeed === 'slow-2g')) {
      setVideoError(true);
      setVideoLoaded(true);
      return;
    }
    
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Set a timeout to mark video as loaded even if it stalls - reduced from 3s to 2s
    const timeoutId = setTimeout(() => {
      if (!videoLoaded) {
        console.warn("Video load timeout - forcing loaded state");
        setVideoLoaded(true);
      }
    }, 2000);
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
      clearTimeout(timeoutId);
    };
  }, [videoLoaded, setVideoLoaded, isMobile, connectionSpeed]);
  
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
    </div>
  );
};

export default VideoBackground;
