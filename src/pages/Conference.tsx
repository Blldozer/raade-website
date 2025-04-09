import React, { useEffect, useLayoutEffect } from "react";
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
 * - Optimized handling of section navigation with improved error handling
 */
const ConferencePage = () => {
  const location = useLocation();
  
  // Set background attribute before first paint to avoid flicker
  useLayoutEffect(() => {
    // Set initial nav background attribute for proper contrast
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Update page title to reflect Day Forum instead of Conference
    document.title = "RAADE | Day Forum";
    
    console.log("ConferencePage: Mounted with location", location);
  }, []);
  
  // Handle scrolling to a specific section when navigated with state
  useEffect(() => {
    if (location.state) {
      // Handle scrollToSection state
      if (location.state.scrollToSection) {
        const sectionId = location.state.scrollToSection;
        console.log("ConferencePage: Scrolling to section from state", sectionId);
        
        // Small delay to ensure the section is rendered
        const timer = setTimeout(() => {
          try {
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              console.warn(`ConferencePage: Section #${sectionId} not found`);
            }
          } catch (error) {
            console.error("ConferencePage: Error scrolling to section", error);
          }
        }, 300);
        
        return () => clearTimeout(timer);
      }
      
      // Handle scrollToDonation state specifically for the donation button
      if (location.state.scrollToDonation) {
        console.log("ConferencePage: Scrolling to donation section from state");
        
        // Small delay to ensure the section is rendered
        const timer = setTimeout(() => {
          try {
            const donationSection = document.getElementById("donation");
            if (donationSection) {
              donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              console.warn("ConferencePage: Donation section not found");
            }
          } catch (error) {
            console.error("ConferencePage: Error scrolling to donation section", error);
          }
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }
    
    // Check if URL has hash
    if (location.hash) {
      // The hash is handled by ScrollToTop component
      console.log("ConferencePage: URL has hash", location.hash);
    }
  }, [location.state]);
  
  return (
    <div className="relative">
      <Navigation isHeroPage={true} forceDarkMode={true} />
      <Conference />
    </div>
  );
};

export default ConferencePage;
