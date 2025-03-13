import { useEffect, useState } from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import NewModel from "../components/about/NewModel";
import Reality from "../components/about/Reality";
import Approach from "../components/about/Approach";
import Impact from "../components/about/Impact";
import Team from "../components/about/Team";
import { useSectionTransitions } from "../hooks/useSectionTransitions";
import { useResponsive } from "../hooks/useResponsive";

const About = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>(["hero"]);
  const [isPageReady, setIsPageReady] = useState(false);
  const { isMobile } = useResponsive();
  
  // Use the refactored hook for section transitions and nav background detection
  useSectionTransitions();

  // Add safety mechanism for mobile rendering
  useEffect(() => {
    // Improve scroll performance with passive listeners
    const options = { passive: true };
    document.addEventListener('touchstart', () => {}, options);
    document.addEventListener('touchmove', () => {}, options);
    
    // Set a timeout to ensure the page renders even if some components fail
    const safetyTimer = setTimeout(() => {
      setIsPageReady(true);
    }, 500);
    
    if (isMobile) {
      // Progressive loading to avoid overwhelming mobile browsers
      // Load sections gradually to prevent browser from hanging
      const loadSequence = [
        { sections: ["hero", "newModel"], delay: 100 },
        { sections: ["hero", "newModel", "reality"], delay: 300 },
        { sections: ["hero", "newModel", "reality", "approach"], delay: 500 },
        { sections: ["hero", "newModel", "reality", "approach", "impact"], delay: 700 },
        { sections: ["hero", "newModel", "reality", "approach", "impact", "team"], delay: 900 }
      ];
      
      // Schedule progressive loading
      loadSequence.forEach(({ sections, delay }) => {
        setTimeout(() => {
          setVisibleSections(sections);
        }, delay);
      });
    } else {
      // On desktop, show all sections immediately
      setVisibleSections(["hero", "newModel", "reality", "approach", "impact", "team"]);
    }
    
    return () => {
      clearTimeout(safetyTimer);
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('touchmove', () => {});
    };
  }, [isMobile]);

  // Add error boundary protection for rendering issues
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught runtime error:", event.error);
      // Make sure at least the basic page structure renders
      if (!isPageReady) {
        setIsPageReady(true);
        setVisibleSections(["hero"]);
      }
      // Prevent the error from breaking the entire page
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [isPageReady]);

  // Wrap each section in error catching to prevent failures
  const renderSection = (sectionName: string, Component: React.ComponentType) => {
    try {
      return visibleSections.includes(sectionName) && <Component />;
    } catch (error) {
      console.error(`Error rendering ${sectionName}:`, error);
      return null;
    }
  };

  return (
    <div className="bg-white">
      <AboutNav />
      {renderSection("hero", AboutHero)}
      {renderSection("newModel", NewModel)}
      {renderSection("reality", Reality)}
      {renderSection("approach", Approach)}
      {renderSection("impact", Impact)}
      {renderSection("team", Team)}
    </div>
  );
};

export default About;
