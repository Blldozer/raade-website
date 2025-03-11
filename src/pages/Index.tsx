
import React, { useEffect, Suspense } from 'react';
import { lazy } from 'react';
import Hero from "@/components/hero/Hero";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";
import { useResponsive } from "@/hooks/useResponsive";

// Lazy load components for better initial performance
const ConferencePromo = lazy(() => import("@/components/sections/ConferencePromo"));
const TransitionStat = lazy(() => import("@/components/sections/TransitionStat"));
const FutureShowcase = lazy(() => import("@/components/sections/FutureShowcase"));
const TransitionHook = lazy(() => import("@/components/sections/TransitionHook"));
const JoinSection = lazy(() => import("@/components/sections/JoinSection"));

const Index = () => {
  // Use our optimized hook for section transitions
  useSectionTransitions();
  const { isMobile } = useResponsive();
  
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
    };
  }, []);
  
  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative w-full min-h-screen" id="hero">
        <Hero />
      </section>
      
      <Suspense fallback={<div className="h-screen bg-gray-100 flex items-center justify-center">Loading...</div>}>
        <section className="relative w-full min-h-screen" id="conference-promo">
          <ConferencePromo />
        </section>
        
        <section className="relative w-full min-h-screen" id="transition-stat">
          <TransitionStat />
        </section>
        
        <section className="relative w-full min-h-screen bg-white" id="future-showcase">
          <FutureShowcase />
        </section>
        
        <section className="relative w-full min-h-screen bg-[#3C403A]" id="transition-hook">
          <TransitionHook />
        </section>
        
        <section className="relative w-full min-h-screen" id="join">
          <JoinSection />
        </section>
      </Suspense>
    </div>
  );
};

export default Index;
