
import React, { useEffect } from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import { useAboutPage } from "../hooks/useAboutPage";
import ErrorBoundaryFallback from "../components/about/ErrorBoundaryFallback";
import LoadingIndicator from "../components/about/LoadingIndicator";
import AboutSections from "../components/about/AboutSections";
import { useNavBackground } from "@/hooks/useNavBackground";
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

  // Use the hook to ensure the navbar background is properly set
  // Initialize with 'dark' for the hero section's dark background
  useNavBackground('dark');
  
  // Add console logging to help debug About page issues
  useEffect(() => {
    console.log('About page mounted');
    
    return () => {
      console.log('About page unmounted');
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
        {/* Always render the navigation - now with its own provider */}
        <AboutNav />
        
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
