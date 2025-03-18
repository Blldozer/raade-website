
import React, { useEffect, useLayoutEffect } from "react";
import Navigation from "../components/Navigation"; // Use main Navigation component
import AboutHero from "../components/about/AboutHero";
import { useAboutPage } from "../hooks/useAboutPage";
import ErrorBoundaryFallback from "../components/about/ErrorBoundaryFallback";
import LoadingIndicator from "../components/about/LoadingIndicator";
import AboutSections from "../components/about/AboutSections";
import ErrorBoundary from "@/components/ErrorBoundary";

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
  } = useAboutPage();
  
  // Set initial background to dark immediately for the hero section
  // This ensures light navbar (white text) against the dark hero background
  useLayoutEffect(() => {
    console.log("About page: Setting initial dark background");
    try {
      document.body.setAttribute('data-nav-background', 'dark');
      
      // Add a class to body to indicate we're on the about page
      document.body.classList.add('about-page');
    } catch (error) {
      console.error("Could not set nav background:", error);
    }
    
    // Return cleanup function
    return () => {
      try {
        document.body.classList.remove('about-page');
        document.body.removeAttribute('data-nav-background');
      } catch (error) {
        console.error("Error cleaning up about page class:", error);
      }
    };
  }, []);
  
  // If fatal error, show a simple fallback (outside of all contexts)
  if (hasError) {
    console.error("About page encountered an error");
    return <ErrorBoundaryFallback />;
  }

  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <div className="bg-white min-h-screen">
        {/* Use the main Navigation component instead of AboutNav */}
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
