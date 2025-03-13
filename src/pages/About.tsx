
import { useEffect, useState, Suspense, lazy, useLayoutEffect } from "react";
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import { useResponsive } from "../hooks/useResponsive";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavier components to improve initial page load time
const NewModel = lazy(() => import("../components/about/NewModel"));
const Reality = lazy(() => import("../components/about/Reality"));
const Approach = lazy(() => import("../components/about/Approach"));
const Impact = lazy(() => import("../components/about/Impact"));
const Team = lazy(() => import("../components/about/Team"));

/**
 * About page component - Manages the entire About page lifecycle
 * Features progressive loading, error handling, and navigation fixes
 * Includes responsive design considerations for all device sizes
 */
const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useResponsive();
  const [activeSection, setActiveSection] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set the initial background to light immediately before any rendering occurs
  useLayoutEffect(() => {
    document.body.setAttribute('data-nav-background', 'light');
  }, []);
  
  // Initialize the page and set up error handling
  useEffect(() => {
    // Set document attributes for navigation styling
    document.body.setAttribute('data-nav-background', 'light');
    
    // Add debugging information
    console.log("About page mounted with isMobile:", isMobile);
    
    // Force a document title change to verify the page has loaded
    document.title = "About RAADE";
    
    // Add error handling for unhandled errors
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Captured global error:", event.error);
      setHasError(true);
      
      // Allow the page to still render content
      if (isLoading) {
        setIsLoading(false);
      }
      
      // Prevent the error from causing a white screen
      event.preventDefault();
      return true;
    };
    
    window.addEventListener('error', handleGlobalError);
    
    // Initialize with a clearer approach
    const timer = setTimeout(() => {
      console.log("Initial loading complete");
      setIsLoading(false);
      setPageInitialized(true);
      
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
        }, 800); // Increased delay between sections for better performance on mobile
        
        return () => clearInterval(sectionTimer);
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 500); // Increased initial delay for better reliability
    
    // Clean up all resources and listeners when unmounting
    return () => {
      console.log("About page unmounted");
      document.title = "RAADE";
      clearTimeout(timer);
      window.removeEventListener('error', handleGlobalError);
      
      // Reset any navigation-related attributes
      document.body.removeAttribute('data-nav-background');
    };
  }, [isMobile, isLoading]);

  // Handle navigation via the logo to prevent blank screen issues
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Force a clean navigation state
    navigate("/", { replace: true });
  };

  // Create an array of sections to render progressively
  const sections = [
    // Section 0: Always visible hero (not lazy loaded for immediate display)
    <AboutHero key="hero" />,
    
    // Sections 1-5: Progressively loaded with more advanced fallbacks
    <Suspense key="newmodel" fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-[#3C403A]">Loading New Model...</div>
        </div>
      </div>
    }>
      <NewModel />
    </Suspense>,
    
    <Suspense key="reality" fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-[#3C403A]">Loading Reality...</div>
        </div>
      </div>
    }>
      <Reality />
    </Suspense>,
    
    <Suspense key="approach" fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-[#3C403A]">Loading Approach...</div>
        </div>
      </div>
    }>
      <Approach />
    </Suspense>,
    
    <Suspense key="impact" fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-[#3C403A]">Loading Impact...</div>
        </div>
      </div>
    }>
      <Impact />
    </Suspense>,
    
    <Suspense key="team" fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-[#3C403A]">Loading Team...</div>
        </div>
      </div>
    }>
      <Team />
    </Suspense>
  ];

  // Optional: provide a simpler view if errors are detected
  if (hasError && !isMobile) {
    return (
      <div className="bg-white">
        <AboutNav />
        <AboutHero />
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">We're experiencing some technical difficulties</h2>
          <p>Please try refreshing the page or visit again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Always render the navigation with navigation fix */}
      <AboutNav />
      
      {/* Always show hero section */}
      {sections[0]}
      
      {/* Conditionally render other sections based on activeSection count and initialization state */}
      {pageInitialized && !hasError && sections.slice(1, activeSection + 1)}
      
      {/* Show a loading indicator if needed */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#274675] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="text-2xl font-bold text-[#274675]">Loading RAADE's story...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
