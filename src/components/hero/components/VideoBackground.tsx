import React, { useRef, useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoLoaded: boolean;
  setVideoLoaded: (loaded: boolean) => void;
}

const VideoBackground = ({ videoLoaded, setVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    // Basic video settings that work across devices
    video.preload = "auto"; 
    video.playsInline = true;
    video.muted = true;
    
    // Handle video loading
    const handleCanPlay = () => {
      setVideoLoaded(true);
      // Attempt to play with error handling
      video.play().catch(e => {
        console.log("Video autoplay prevented:", e);
        // If we can't play video, still mark as loaded and show fallback
        setVideoLoaded(true);
        setVideoError(true);
      });
    };
    
    const handleError = () => {
      console.log("Video loading error");
      setVideoError(true);
      setVideoLoaded(true); // Still mark as loaded to show fallback
    };
    
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Set a timeout to mark video as loaded even if it stalls
    const timeoutId = setTimeout(() => {
      if (!videoLoaded) {
        console.log("Video load timeout - forcing loaded state");
        setVideoLoaded(true);
      }
    }, 3000);
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
      clearTimeout(timeoutId);
    };
  }, [videoLoaded, setVideoLoaded]);
  
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
      
      {/* Only load video if not on mobile or if on mobile but can play videos well */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: (videoLoaded && !videoError) ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          display: videoError ? 'none' : 'block' // Hide video completely on error
        }}
      >
        <source src="/hero-background.webm" type="video/webm" />
        <source src="/hero-background.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
