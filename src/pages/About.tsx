import React, { useEffect, useLayoutEffect } from "react";
import AboutHero from "../components/about/AboutHero";
import { useAboutPage } from "../hooks/useAboutPage";
import ErrorBoundaryFallback from "../components/about/ErrorBoundaryFallback";
import LoadingIndicator from "../components/about/LoadingIndicator";
import AboutSections from "../components/about/AboutSections";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation"; // Import at the top level

/**
 * About page component - Manages the entire About page lifecycle
 * Features progressive loading, error handling, and navigation fixes
 * Includes responsive design considerations for all device sizes
 * Enhanced with better error boundaries and navigation context handling
 */
const About = () => {
  const {
    isLoading,
    activeSection,
    hasError,
    pageInitialized,
    isMobile,
    scrollToSection
  } = useAboutPage();
  
  const location = useLocation();
  
  // Handle scrolling to section when navigated from another page via state
  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      scrollToSection(sectionId);
    }
  }, [location.state, scrollToSection]);
  
  // If fatal error, show a simple fallback (outside of all contexts)
  if (hasError) {
    console.error("About page encountered an error");
    return <ErrorBoundaryFallback />;
  }

  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <div className="bg-white min-h-screen">
        {/* Place Navigation component at the top level of the page */}
        <Navigation isHeroPage={true} forceDarkMode={false} />
        
        {/* Always show hero section */}
        <AboutHero />
        
        {/* Conditionally render other sections based on activeSection count and initialization state */}
        <AboutSections 
          activeSection={activeSection} 
          pageInitialized={pageInitialized} 
        />
        
        {/* Show a loading indicator if needed */}
        {isLoading && <LoadingIndicator message="Loading RAADE's story..." />}
      </div>
    </ErrorBoundary>
  );
};

export default About;
