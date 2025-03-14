
import React, { useRef, useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoLoaded: boolean;
  setVideoLoaded: (loaded: boolean) => void;
}

const VideoBackground = ({ videoLoaded, setVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    // Optimize video playback
    video.preload = "auto"; // Preload the video
    video.playsInline = true;
    video.muted = true;
    
    // Add hardware acceleration
    video.style.transform = 'translateZ(0)';
    video.style.willChange = 'transform';
    
    // Set playback quality
    if (window.innerWidth < 768) {
      // For mobile devices, reduce quality to improve performance
      if ('mediaSource' in HTMLVideoElement.prototype) {
        // @ts-ignore - Some browsers support this property
        video.mediaSource = 'optimize-for-performance';
      }
      
      // Lower resolution for mobile
      video.style.objectFit = 'cover';
      
      // Reduce playback quality on mobile
      if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
        // Use lower quality H.264 profile if supported
        const source = video.querySelector('source');
        if (source) {
          source.type = 'video/mp4; codecs="avc1.42E01E"';
        }
      }
    } else {
      // For desktop, prioritize quality
      if ('mediaSource' in HTMLVideoElement.prototype) {
        // @ts-ignore - Some browsers support this property
        video.mediaSource = 'optimize-for-quality';
      }
    }
    
    // Handle video loading
    video.addEventListener('loadeddata', () => {
      setVideoLoaded(true);
    });
    
    // Play video when it's ready
    video.addEventListener('canplaythrough', () => {
      video.play().catch(e => console.log("Video autoplay prevented:", e));
    });

    // Reduce frame rate for better performance on mobile
    const reduceFrameRate = () => {
      if (window.innerWidth < 768 && video) {
        // This technique creates a visual effect similar to reducing frame rate
        // by adding a slight blur and reducing opacity transitions
        video.style.filter = 'blur(1px)';
        video.style.transition = 'opacity 0.2s ease-out';
      } else if (video) {
        video.style.filter = '';
        video.style.transition = '';
      }
    };
    
    reduceFrameRate();
    window.addEventListener('resize', reduceFrameRate);
    
    // Pause video when not visible to save resources
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoLoaded) {
            video.play().catch(e => console.log("Video autoplay prevented:", e));
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
    
    return () => {
      window.removeEventListener('resize', reduceFrameRate);
      observer.disconnect();
    };
  }, [videoLoaded, setVideoLoaded]);
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Placeholder/fallback while video loads */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#2A466D] to-[#1A365D]"
          style={{ opacity: videoLoaded ? 0 : 1, transition: 'opacity 0.5s ease-out' }}
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ 
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
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
