
import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoLoaded: boolean;
  setVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * VideoBackground Component
 * 
 * Renders a fullscreen video background for the hero section
 * with optimized loading handling and error fallbacks.
 * 
 * @param videoLoaded - Boolean indicating if the video has loaded
 * @param setVideoLoaded - Function to update the loaded state
 */
const VideoBackground = ({ videoLoaded, setVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Verify React hooks are available
  if (typeof useEffect !== 'function' || typeof useRef !== 'function') {
    console.warn("VideoBackground: React hooks unavailable");
    
    // Return a static fallback instead of video
    return (
      <div className="absolute inset-0 bg-[#1A365D] z-0"></div>
    );
  }
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    try {
      // Handle successful video loading
      const handleVideoLoad = () => {
        setVideoLoaded(true);
      };
      
      // Handle any video errors
      const handleVideoError = (e: Event) => {
        console.error("Video loading error:", e);
        setVideoLoaded(false);
        
        // Apply fallback background if video fails
        if (video.parentElement) {
          video.parentElement.classList.add('bg-[#1A365D]');
        }
      };
      
      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('error', handleVideoError as EventListener);
      
      // Check if video is already loaded (happens with cached videos)
      if (video.readyState >= 3) {
        setVideoLoaded(true);
      }
      
      return () => {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('error', handleVideoError as EventListener);
      };
    } catch (error) {
      console.error("VideoBackground: Error setting up video", error);
      setVideoLoaded(false);
    }
  }, [setVideoLoaded]);
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Static background color as immediate fallback */}
      <div className="absolute inset-0 bg-[#1A365D] transition-opacity duration-1000" 
           style={{ opacity: videoLoaded ? 0 : 1 }}></div>
      
      {/* Video element - hidden until loaded */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <source src="/hero-background.webm" type="video/webm" />
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
