
import ProjectsShowcase from "@/components/ProjectsShowcase";
import StudioOverview from "@/components/studios/StudioOverview";
import StudioCTA from "@/components/studios/StudioCTA";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/studios/HeroSection";
import { useInnovationStudios } from "@/hooks/useInnovationStudios";

/**
 * InnovationStudios Component - Main page for the Innovation Studios program
 * 
 * Features:
 * - Animated hero with gradient background
 * - Section-based navigation
 * - Proper navbar background contrast based on scroll position
 * - Smooth section transitions
 * 
 * Page has been refactored into smaller components to improve maintainability
 */
const InnovationStudios = () => {
  const {
    overviewRef,
    projectsRef,
    applyRef,
    scrollToContent
  } = useInnovationStudios();

  return (
    <div className="bg-white">
      {/* Single Navigation component at the top level */}
      <Navigation isHeroPage={true} forceDarkMode={false} />
      
      <div>
        <HeroSection scrollToContent={scrollToContent} />
        
        <div ref={overviewRef} id="overview">
          <StudioOverview />
        </div>
        
        <div ref={projectsRef} id="projects">
          <ProjectsShowcase />
        </div>
        
        <div ref={applyRef} id="apply">
          <StudioCTA />
        </div>
      </div>
    </div>
  );
};

export default InnovationStudios;
