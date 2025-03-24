
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
 */
const Index = () => {
  // Use our custom hook to handle page logic
  const { isMobile } = useIndexPage();
  
  console.log("Index component rendering");
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero section is not lazy loaded for immediate display */}
      <SectionWrapper id="hero" background="dark">
        <Hero />
      </SectionWrapper>
      
      {/* Each section gets its own error boundary and suspense boundary */}
      <SectionWrapper id="conference-promo" background="light">
        <Suspense fallback={<SectionLoadingFallback />}>
          <ConferencePromo />
        </Suspense>
      </SectionWrapper>
      
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
};

export default Index;
