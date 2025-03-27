
import React from "react";
import AboutHero from "../components/about/AboutHero";
import { useAboutPage } from "../hooks/useAboutPage";
import ErrorBoundaryFallback from "../components/about/ErrorBoundaryFallback";
import AboutSections from "../components/about/AboutSections";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLocation } from "react-router-dom";

/**
 * About page component - Manages the entire About page lifecycle
 * Features immediate content rendering for better user experience
 * No loading screens to match the behavior of other pages
 * Includes responsive design considerations for all device sizes
 * Enhanced with better error boundaries and navigation context handling
 */
const About = () => {
  const {
    activeSection,
    hasError,
    isMobile,
    scrollToSection
  } = useAboutPage();
  
  const location = useLocation();
  
  // Handle scrolling to section when navigated from another page via state
  React.useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      scrollToSection(sectionId);
    }
  }, [location.state, scrollToSection]);
  
  // If fatal error, show a simple fallback (outside of all contexts)
  if (hasError) {
    console.error("[ABOUT DEBUG] About page encountered an error");
    return <ErrorBoundaryFallback />;
  }

  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <div className="bg-white min-h-screen">
        {/* Always show hero section */}
        <AboutHero />
        
        {/* Always render all sections without waiting for initialization */}
        <AboutSections 
          activeSection={5} // Always show all sections
          pageInitialized={true} // Always consider page initialized
        />
      </div>
    </ErrorBoundary>
  );
};

export default About;
