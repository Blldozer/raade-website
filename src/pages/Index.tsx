
import React, { useEffect, Suspense, useLayoutEffect } from 'react';
import { lazy } from 'react';
import Hero from "@/components/hero/Hero";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocation } from 'react-router-dom';
import { useNavBackground } from "@/hooks/useNavBackground";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load components for better initial performance
const ConferencePromo = lazy(() => import("@/components/sections/ConferencePromo"));
const TransitionStat = lazy(() => import("@/components/sections/TransitionStat"));
const FutureShowcase = lazy(() => import("@/components/sections/FutureShowcase"));
const TransitionHook = lazy(() => import("@/components/sections/TransitionHook"));
const JoinSection = lazy(() => import("@/components/sections/JoinSection"));

/**
 * SectionWrapper Component - Wraps each section with ErrorBoundary and proper structure
 * Provides consistent error handling and fallback UI for all sections
 */
const SectionWrapper = ({ 
  id, 
  background, 
  children 
}: { 
  id: string; 
  background: "light" | "dark"; 
  children: React.ReactNode 
}) => {
  return (
    <section className="relative w-full min-h-screen" id={id} data-background={background}>
      <ErrorBoundary
        fallback={
          <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="max-w-md text-center">
              <h3 className="text-xl font-bold mb-2">Section unavailable</h3>
              <p>We're experiencing issues with this section. Please try again later.</p>
            </div>
          </div>
        }
      >
        {children}
      </ErrorBoundary>
    </section>
  );
};

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
  const { isMobile } = useResponsive();
  const location = useLocation();
  
  // Use the hook to manage navbar background colors based on section visibility
  // Initialize with 'light' since the hero section has a dark background
  // This ensures the navbar is immediately visible with proper contrast
  useNavBackground('light');
  
  // Set initial background state before any scroll happens
  useLayoutEffect(() => {
    // Force light navbar for index page hero section
    document.body.setAttribute('data-nav-background', 'light');
    
    // Log initialization for debugging purposes
    console.log("Index page initialized, nav background set to light");
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
    
    // Log for debugging
    console.log("Index page event listeners attached");
    
    return () => {
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('touchmove', () => {});
      document.body.removeAttribute('data-nav-background');
      console.log("Index page cleanup completed");
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
  
  // Main loading fallback for all Suspense components
  const loadingFallback = (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#274675] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-lg text-[#274675]">Loading section...</div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen overflow-hidden">
      <SectionWrapper id="hero" background="dark">
        <Hero />
      </SectionWrapper>
      
      <Suspense fallback={loadingFallback}>
        <SectionWrapper id="conference-promo" background="light">
          <ConferencePromo />
        </SectionWrapper>
        
        <SectionWrapper id="transition-stat" background="dark">
          <TransitionStat />
        </SectionWrapper>
        
        <SectionWrapper id="future-showcase" background="light">
          <FutureShowcase />
        </SectionWrapper>
        
        <SectionWrapper id="transition-hook" background="dark">
          <TransitionHook />
        </SectionWrapper>
        
        <SectionWrapper id="join" background="light">
          <JoinSection />
        </SectionWrapper>
      </Suspense>
    </div>
  );
};

export default Index;
