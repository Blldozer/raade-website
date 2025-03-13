
import React from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import { useAboutPage } from "../hooks/useAboutPage";
import ErrorBoundaryFallback from "../components/about/ErrorBoundaryFallback";
import LoadingIndicator from "../components/about/LoadingIndicator";
import AboutSections from "../components/about/AboutSections";

/**
 * About page component - Manages the entire About page lifecycle
 * Features progressive loading, error handling, and navigation fixes
 * Includes responsive design considerations for all device sizes
 */
const About = () => {
  const {
    isLoading,
    activeSection,
    hasError,
    pageInitialized,
    isMobile,
  } = useAboutPage();

  // Optional: provide a simpler view if errors are detected
  if (hasError && !isMobile) {
    return <ErrorBoundaryFallback />;
  }

  return (
    <div className="bg-white">
      {/* Always render the navigation */}
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
  );
};

export default About;
