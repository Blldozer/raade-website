
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Conference from "@/components/Conference";
import { useLocation } from "react-router-dom";

/**
 * ConferencePage component - Main container for the conference section
 * 
 * Features:
 * - Sets up navigation with proper background contrast for accessibility
 * - Handles automatic scrolling to specific sections based on URL hash or state
 * - Ensures proper page title for SEO and user experience
 */
const ConferencePage = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Update page title to reflect Day Forum instead of Conference
    document.title = "RAADE | Day Forum";
    
    // Set initial nav background attribute for proper contrast
    // Set this immediately to ensure navbar has correct styling on initial render
    document.body.setAttribute('data-nav-background', 'light');
    
    // Clean up function to reset the attribute when component unmounts
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Handle scrolling to a specific section when navigated with state
  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      // Small delay to ensure the section is rendered
      const timer = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Check if URL has hash
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1); // Remove the # character
      const timer = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  return (
    <div className="relative">
      <Navigation isHeroPage={true} forceDarkMode={true} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
