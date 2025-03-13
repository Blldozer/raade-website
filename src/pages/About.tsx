
import { useEffect, useState, Suspense } from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import NewModel from "../components/about/NewModel";
import Reality from "../components/about/Reality";
import Approach from "../components/about/Approach";
import Impact from "../components/about/Impact";
import Team from "../components/about/Team";
import { useResponsive } from "../hooks/useResponsive";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useResponsive();
  const [activeSection, setActiveSection] = useState(0);
  
  useEffect(() => {
    // Add debugging information
    console.log("About page mounted with isMobile:", isMobile);
    
    // Force a document title change to verify the page has loaded
    document.title = "About RAADE";
    
    // Initialize with a simpler approach
    const timer = setTimeout(() => {
      console.log("Initial loading complete");
      setIsLoading(false);
      
      // On mobile, we'll progressively reveal sections
      if (isMobile) {
        console.log("Mobile detected, using progressive section loading");
        // Start revealing sections one by one
        const sectionTimer = setInterval(() => {
          setActiveSection(prev => {
            const nextSection = prev + 1;
            console.log(`Activating section ${nextSection}`);
            
            if (nextSection >= 5) {
              console.log("All sections activated, clearing interval");
              clearInterval(sectionTimer);
            }
            return nextSection;
          });
        }, 500); // Load a new section every 500ms
        
        return () => clearInterval(sectionTimer);
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 100);
    
    return () => {
      console.log("About page unmounted");
      document.title = "RAADE";
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Create an array of sections to render progressively
  const sections = [
    // Section 0: Always visible hero
    <AboutHero key="hero" />,
    
    // Sections 1-5: Progressively loaded
    <Suspense key="newmodel" fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading New Model...</div>}>
      <NewModel />
    </Suspense>,
    
    <Suspense key="reality" fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading Reality...</div>}>
      <Reality />
    </Suspense>,
    
    <Suspense key="approach" fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading Approach...</div>}>
      <Approach />
    </Suspense>,
    
    <Suspense key="impact" fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading Impact...</div>}>
      <Impact />
    </Suspense>,
    
    <Suspense key="team" fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading Team...</div>}>
      <Team />
    </Suspense>
  ];

  return (
    <div className="bg-white">
      {/* Always render the navigation */}
      <AboutNav />
      
      {/* Always show hero section */}
      {sections[0]}
      
      {/* Conditionally render other sections based on activeSection count */}
      {sections.slice(1, activeSection + 1)}
      
      {/* Show a loading indicator if needed */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-2xl font-bold text-[#274675]">Loading RAADE's story...</div>
        </div>
      )}
    </div>
  );
};

export default About;
