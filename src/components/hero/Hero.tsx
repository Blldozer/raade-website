
import React, { useRef, memo, useState, useEffect } from 'react';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import VideoBackground from './components/VideoBackground';
import GradientOverlay from './components/GradientOverlay';
import HeroContent from './components/HeroContent';
import ScrollDownButton from './components/ScrollDownButton';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Only register plugin if gsap is available
if (typeof gsap === 'object' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollToPlugin);
}

/**
 * Hero Component - The landing section of the website
 * 
 * This component displays the main hero section with video background,
 * animated content, and navigation. It explicitly sets a dark background 
 * which requires a light navbar for proper contrast.
 * 
 * Enhanced with multiple layers of error handling to prevent crashes when
 * React context isn't available or when animations fail.
 */
const Hero = () => {
  // CRITICAL: Check if we're running in a valid React context before trying to use hooks
  if (typeof React !== 'object' || typeof React.useRef !== 'function') {
    console.error("Hero component: React context unavailable, rendering fallback");
    
    // Return minimal fallback that won't crash
    return (
      <div className="relative h-screen overflow-hidden bg-[#1A365D]" data-background="dark">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Rice Association for African Development</h1>
            <p className="text-xl">Building a better future today</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Wrapper function for safely using hooks with error handling
  const safelyUseHook = (hookFn, ...args) => {
    try {
      return hookFn(...args);
    } catch (error) {
      console.error(`Hero component: Failed to use hook ${hookFn.name}`, error);
      return null;
    }
  };
  
  try {
    // Use React hooks inside this try block to catch any unexpected errors
    const videoRef = useRef(null);
    const contentRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    
    // Set initial nav background to light because this hero has a dark background
    useEffect(() => {
      document.body.setAttribute('data-nav-background', 'light');
      
      return () => {
        document.body.removeAttribute('data-nav-background');
      };
    }, []);
    
    // Safely apply animations with error handling
    try {
      if (contentRef.current) {
        safelyUseHook(useContentAnimation, contentRef);
      }
      
      if (videoRef.current) {
        safelyUseHook(useHeroAnimation, videoRef);
      }
    } catch (animationError) {
      console.error("Hero: Animation hooks failed", animationError);
      // Continue rendering without animations
    }
    
    const scrollToNextSection = () => {
      try {
        const nextSection = document.getElementById('transition-stat');
        if (nextSection) {
          if (typeof gsap === 'object' && gsap.to) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: nextSection,
                offsetY: 0
              },
              ease: "power2.inOut"
            });
          } else {
            // Fallback to basic scroll if GSAP isn't available
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
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
