
import React, { useRef, memo, useState, useEffect } from 'react';
import Navigation from '../Navigation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import VideoBackground from './components/VideoBackground';
import GradientOverlay from './components/GradientOverlay';
import HeroContent from './components/HeroContent';
import ScrollDownButton from './components/ScrollDownButton';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Hero Component - The landing section of the website
 * 
 * This component displays the main hero section with video background, 
 * animated content, and navigation. It explicitly sets a dark background 
 * which requires a light navbar for proper contrast.
 */
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Set initial nav background to light because this hero has a dark background
  // This ensures proper contrast for navbar elements without requiring user interaction
  useEffect(() => {
    // Ensure it's immediately set for correct navbar styling
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      // Clean up when unmounting
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Use our animation hooks
  useContentAnimation(contentRef);
  useHeroAnimation(videoRef);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('transition-stat');
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: nextSection,
          offsetY: 0
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden" data-background="dark">
      {/* Video Background - lowest z-index */}
      <VideoBackground videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} />
      
      {/* Gradient Overlay - low z-index but above video */}
      <GradientOverlay />
      
      {/* Navigation - highest z-index */}
      <div className="absolute top-0 left-0 right-0 z-[9999]">
        <Navigation isHeroPage={true} />
      </div>
      
      {/* Main Content - high z-index but below navigation */}
      <HeroContent />
      
      {/* Scroll down button */}
      <ScrollDownButton onClick={scrollToNextSection} />
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Hero);
