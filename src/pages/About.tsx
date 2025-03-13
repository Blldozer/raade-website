
import { useEffect, useState, Suspense } from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import NewModel from "../components/about/NewModel";
import Reality from "../components/about/Reality";
import Approach from "../components/about/Approach";
import Impact from "../components/about/Impact";
import Team from "../components/about/Team";
import { useResponsive } from "../hooks/useResponsive";

// Create a simpler version that doesn't depend on heavy animations
const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useResponsive();
  const [renderAll, setRenderAll] = useState(!isMobile);
  
  useEffect(() => {
    // Add debugging information
    console.log("About page mounted");
    
    // Force a document title change to verify the page has loaded
    document.title = "About RAADE";
    
    // Initialize
    const loadPage = async () => {
      try {
        // Log for debugging
        console.log("Starting About page load sequence");
        
        // On mobile, use a simpler loading strategy
        if (isMobile) {
          console.log("Mobile detected, using progressive loading");
          // Short timeout to allow initial render to complete
          setTimeout(() => {
            console.log("Rendering all sections on mobile");
            setRenderAll(true);
            setIsLoading(false);
          }, 100);
        } else {
          // On desktop, render everything immediately
          console.log("Desktop detected, rendering all sections");
          setRenderAll(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in About page initialization:", error);
        // Even if there's an error, try to show something
        setRenderAll(true);
        setIsLoading(false);
      }
    };
    
    loadPage();
    
    return () => {
      console.log("About page unmounted");
      document.title = "RAADE";
    };
  }, [isMobile]);

  return (
    <div className="bg-white">
      {/* Always render the navigation */}
      <AboutNav />
      
      {/* Always show hero section */}
      <AboutHero />
      
      {/* Conditionally render other sections */}
      {renderAll && (
        <>
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
            <NewModel />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
            <Reality />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
            <Approach />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
            <Impact />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
            <Team />
          </Suspense>
        </>
      )}
      
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
