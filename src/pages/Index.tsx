import React, { useEffect, Suspense, useLayoutEffect } from 'react';
import { lazy } from 'react';
import Hero from "@/components/hero/Hero";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocation } from 'react-router-dom';
import { useNavBackground } from "@/hooks/useNavBackground";

// Lazy load components for better initial performance
const ConferencePromo = lazy(() => import("@/components/sections/ConferencePromo"));
const TransitionStat = lazy(() => import("@/components/sections/TransitionStat"));
const FutureShowcase = lazy(() => import("@/components/sections/FutureShowcase"));
const TransitionHook = lazy(() => import("@/components/sections/TransitionHook"));
const JoinSection = lazy(() => import("@/components/sections/JoinSection"));

/**
 * Index Component - Main landing page of the website
 * 
 * This component serves as the main entry point for users.
 * It explicitly initializes the navbar with a light background setting
 * to ensure proper contrast over the dark hero section.
 */
const Index = () => {
  // Use our optimized hook for section transitions
  useSectionTransitions();
  const { isMobile, width, height, deviceType, touchCapability, orientation, performanceLevel } = useResponsive();
  const location = useLocation();
  
  // Use the hook to manage navbar background colors based on section visibility
  // Initialize with 'light' since the hero section has a dark background
  // This ensures the navbar is immediately visible with proper contrast
  useNavBackground('light');
  
  // Add logging to diagnose mobile rendering issues
  useEffect(() => {
    console.log('=== INDEX PAGE DIAGNOSTIC INFO ===');
    console.log('Device detection:', { 
      isMobile, 
      width, 
      height, 
      deviceType, 
      touchCapability,
      orientation,
      performanceLevel,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        visualViewport: window.visualViewport ? {
          width: window.visualViewport.width,
          height: window.visualViewport.height,
          scale: window.visualViewport.scale
        } : 'not supported'
      }
    });
    
    // Check if critical components are visible
    const heroElement = document.getElementById('hero');
    console.log('Hero element present:', !!heroElement);
    if (heroElement) {
      console.log('Hero element dimensions:', {
        width: heroElement.offsetWidth,
        height: heroElement.offsetHeight,
        visible: heroElement.offsetWidth > 0 && heroElement.offsetHeight > 0,
        style: {
          display: window.getComputedStyle(heroElement).display,
          position: window.getComputedStyle(heroElement).position,
          overflow: window.getComputedStyle(heroElement).overflow,
          zIndex: window.getComputedStyle(heroElement).zIndex
        }
      });
    }
    
    // Monitor any layout shifts or scrolling issues
    let lastHeight = window.innerHeight;
    const handleResize = () => {
      const newHeight = window.innerHeight;
      if (Math.abs(lastHeight - newHeight) > 50) {
        console.log('Significant viewport height change detected:', {
          from: lastHeight,
          to: newHeight,
          difference: newHeight - lastHeight
        });
        lastHeight = newHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, width, height, deviceType, touchCapability, orientation, performanceLevel]);
  
  // Set initial background state before any scroll happens
  useLayoutEffect(() => {
    // Force light navbar for index page hero section
    document.body.setAttribute('data-nav-background', 'light');
    
    // Log initial rendering state
    console.log('Initial render state:', {
      documentHeight: document.documentElement.offsetHeight,
      bodyHeight: document.body.offsetHeight,
      windowHeight: window.innerHeight,
      overflow: window.getComputedStyle(document.body).overflow
    });
  }, []);
  
  useEffect(() => {
    // Add passive:true to touch events for better scroll performance
    const options = {
      passive: true
    };
    
    document.addEventListener('touchstart', () => {}, options);
    document.addEventListener('touchmove', () => {}, options);
    
    // Set performance hint for the browser
    if ('contentVisibilityAutoStateChange' in document.documentElement.style) {
      document.documentElement.style.contentVisibility = 'auto';
    }
    
    return () => {
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('touchmove', () => {});
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Handle scrolling to the join section when navigating from another page
  useEffect(() => {
    if (location.state && location.state.scrollToJoin) {
      // Small delay to ensure the section is rendered
      const timer = setTimeout(() => {
        const joinSection = document.getElementById('join');
        if (joinSection) {
          joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Check if URL has #join hash
    if (window.location.hash === '#join') {
      // Small delay to ensure the section is rendered
      const timer = setTimeout(() => {
        const joinSection = document.getElementById('join');
        if (joinSection) {
          joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative w-full min-h-screen" id="hero" data-background="dark">
        <Hero />
      </section>
      
      <Suspense fallback={<div className="h-screen bg-gray-100 flex items-center justify-center">Loading...</div>}>
        <section className="relative w-full min-h-screen" id="conference-promo" data-background="light">
          <ConferencePromo />
        </section>
        
        <section className="relative w-full min-h-screen" id="transition-stat" data-background="dark">
          <TransitionStat />
        </section>
        
        <section className="relative w-full min-h-screen bg-white" id="future-showcase" data-background="light">
          <FutureShowcase />
        </section>
        
        <section className="relative w-full min-h-screen bg-[#3C403A]" id="transition-hook" data-background="dark">
          <TransitionHook />
        </section>
        
        <section className="relative w-full min-h-screen" id="join" data-background="light">
          <JoinSection />
        </section>
      </Suspense>
    </div>
  );
};

export default Index;
