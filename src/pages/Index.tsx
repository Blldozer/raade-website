import React, { Suspense } from 'react';
import { lazy } from 'react';
import Hero from "@/components/hero/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import SectionLoadingFallback from "@/components/sections/SectionLoadingFallback";
import { useIndexPage } from "@/hooks/useIndexPage";

// Lazy load components for better initial performance - with named chunks for easier debugging
const ConferencePromo = lazy(() => import(/* webpackChunkName: "conference-promo" */ "@/components/sections/ConferencePromo"));
const TransitionStat = lazy(() => import(/* webpackChunkName: "transition-stat" */ "@/components/sections/TransitionStat"));
const FutureShowcase = lazy(() => import(/* webpackChunkName: "future-showcase" */ "@/components/sections/FutureShowcase"));
const TransitionHook = lazy(() => import(/* webpackChunkName: "transition-hook" */ "@/components/sections/TransitionHook"));
const JoinSection = lazy(() => import(/* webpackChunkName: "join-section" */ "@/components/sections/JoinSection"));

/**
 * Index Component - Main landing page of the website
 * 
 * This component serves as the main entry point for users.
 * It explicitly initializes the navbar with a light background setting
 * to ensure proper contrast over the dark hero section.
 * Enhanced with better error handling for React context issues.
 */
const Index = () => {
  // Check if React is properly initialized to prevent "Cannot read properties of null" errors
  if (!window.__REACT_INITIALIZED || typeof React !== 'object' || React === null) {
    console.error("Index: React not properly initialized");
    
    // Render a minimal fallback that won't crash
    return (
      <div className="min-h-screen bg-[#274675] text-white flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">RAADE</h1>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }
  
  try {
    // Safely use our custom hook with a fallback if it fails
    let pageState = {
      isMobile: false,
      isTablet: false,
      isLowPerformanceDevice: false,
      animationsEnabled: false
    };
    
    try {
      // Only use the hook if we've verified React is available
      if (typeof React.useState === 'function') {
        const hookResult = useIndexPage();
        pageState = hookResult || pageState;
      }
    } catch (error) {
      console.error("Index: Error using page hooks:", error);
      // Continue with default pageState
    }
    
    console.log("Index component rendering");
    
    return (
      <div className="min-h-screen overflow-hidden">
        {/* Hero section is not lazy loaded for immediate display */}
        <SectionWrapper id="hero" background="dark">
          <Hero />
        </SectionWrapper>
        
        {/* Conference Promo section removed for now. To re-enable, uncomment below: */}
        {/*
        <SectionWrapper id="conference-promo" background="light">
          <Suspense fallback={<SectionLoadingFallback />}>
            <ConferencePromo />
          </Suspense>
        </SectionWrapper>
        */}
        
        <SectionWrapper id="transition-stat" background="dark">
          <Suspense fallback={<SectionLoadingFallback />}>
            <TransitionStat />
          </Suspense>
        </SectionWrapper>
        
        <SectionWrapper id="future-showcase" background="light">
          <Suspense fallback={<SectionLoadingFallback />}>
            <FutureShowcase />
          </Suspense>
        </SectionWrapper>
        
        <SectionWrapper id="transition-hook" background="dark">
          <Suspense fallback={<SectionLoadingFallback />}>
            <TransitionHook />
          </Suspense>
        </SectionWrapper>
        
        <SectionWrapper id="join" background="light">
          <Suspense fallback={<SectionLoadingFallback />}>
            <JoinSection />
          </Suspense>
        </SectionWrapper>
      </div>
    );
  } catch (error) {
    console.error("Index: Critical render error:", error);
    
    // Provide a fallback UI that won't crash
    return (
      <div className="min-h-screen bg-[#274675] text-white flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">RAADE</h1>
          <p>There was an error loading the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-white text-[#274675] rounded hover:bg-opacity-90"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default Index;
