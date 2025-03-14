import React, { useEffect, Suspense, useLayoutEffect, useState } from 'react';
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
  const { isMobile, width } = useResponsive();
  const location = useLocation();
  const [pageReady, setPageReady] = useState(false);
  
  // Use the hook to manage navbar background colors based on section visibility
  // Initialize with 'light' since the hero section has a dark background
  // This ensures the navbar is immediately visible with proper contrast
  useNavBackground('light');
  
  // Set initial background state before any scroll happens
  useLayoutEffect(() => {
    // Force light navbar for index page hero section
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      // Clean up when unmounting to prevent state persistence issues on mobile
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Handle page initialization with a slight delay for mobile devices
  useEffect(() => {
    // Set a short timeout to allow browser to stabilize rendering
    // This helps prevent layout shifts and rendering issues on mobile
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Add passive:true to touch events for better scroll performance
    const options = {
      passive: true
    };
    
    // Create actual handler functions so they can be properly removed
    const handleTouchStart = () => {};
    const handleTouchMove = () => {};
    
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);
    
    // Set performance hint for the browser
    if ('contentVisibilityAutoStateChange' in document.documentElement.style) {
      document.documentElement.style.contentVisibility = 'auto';
    }
    
    if (isMobile) {
      // Add specific fixes for mobile rendering
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.width = '100%';
    }
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.removeAttribute('data-nav-background');
      
      // Clean up mobile-specific styles
      if (isMobile) {
        document.documentElement.style.overflowX = '';
        document.body.style.overflowX = '';
        document.body.style.width = '';
      }
    };
  }, [isMobile]);
  
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
  
  // Add visibility classes based on the page's readiness state
  const pageVisibility = pageReady ? "opacity-100" : "opacity-0";
  
  return (
    <div className={`min-h-screen overflow-hidden transition-opacity duration-300 ${pageVisibility}`}>
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
