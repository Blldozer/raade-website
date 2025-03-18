
import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle section navigation within the About page
 * Manages scrolling to specific sections and tracking the active section
 */
export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState(0);
  const location = useLocation();
  
  // Function to scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    // Map section IDs to their indices in the sections array
    const sectionMap: {[key: string]: number} = {
      'approach': 3,  // Our Approach is the 3rd section (0-indexed)
      'impact': 4,    // Our Impact is the 4th section
      'team': 5       // Team is the 5th section
    };
    
    // Set the active section to ensure it's loaded
    if (sectionMap[sectionId]) {
      setActiveSection(sectionMap[sectionId]);
      
      // Wait for the section to be rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          console.log(`Scrolling to element: #${sectionId}`);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element #${sectionId} not found after setting active section`);
        }
      }, 500); // Give it time to render
    } else {
      console.warn(`Unknown section ID: ${sectionId}`);
    }
  }, []);
  
  // Initialize navigation based on URL hash or state
  const initializeNavigation = useCallback(() => {
    // Handle section loading based on URL hash
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove #
      console.log(`URL contains hash: ${sectionId}`);
      scrollToSection(sectionId);
    }
    
    // Handle loading through state
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      console.log(`Location state contains scrollToSection: ${sectionId}`);
      scrollToSection(sectionId);
    }
  }, [location.hash, location.state, scrollToSection]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
    initializeNavigation
  };
};
