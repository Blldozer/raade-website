
import React, { useRef, memo, useState, useEffect } from 'react';
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
 * 
 * Enhanced with React context error handling to prevent crashes when
 * React hooks aren't available in the current context.
 */
const Hero = () => {
  // Verify we're in a valid React context first
  if (typeof React !== 'object' || typeof React.useRef !== 'function') {
    console.error("Hero: React context unavailable");
    
    // Return minimal fallback that won't crash
    return (
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#1A365D] via-[#274675] to-[#1A365D]" data-background="dark">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Rice Association for African Development</h1>
            <p className="text-xl">Building a better future today</p>
          </div>
        </div>
      </div>
    );
  }
  
  try {
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
    
    // Use our animation hooks with error handling
    try {
      useContentAnimation(contentRef);
      useHeroAnimation(videoRef);
    } catch (animationError) {
      console.error("Hero: Animation hooks failed", animationError);
      // Continue rendering without animations
    }
    
    const scrollToNextSection = () => {
      try {
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
      } catch (scrollError) {
        console.error("Hero: Scroll error", scrollError);
        // Fallback to basic scrolling
        const nextSection = document.getElementById('transition-stat');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    return (
      <div className="relative h-screen overflow-hidden" data-background="dark">
        {/* Video Background - lowest z-index */}
        <VideoBackground videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} />
        
        {/* Gradient Overlay - low z-index but above video */}
        <GradientOverlay />
        
        {/* Main Content - high z-index but below navigation */}
        <HeroContent />
        
        {/* Scroll down button */}
        <ScrollDownButton onClick={scrollToNextSection} />
      </div>
    );
  } catch (error) {
    console.error("Hero: React context error", error);
    
    // Provide a minimal fallback that won't crash
    return (
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#1A365D] via-[#274675] to-[#1A365D]" data-background="dark">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Rice Association for African Development</h1>
            <p className="text-xl">Building a better future today</p>
          </div>
        </div>
      </div>
    );
  }
};

// Use memo to prevent unnecessary re-renders
export default memo(Hero);
