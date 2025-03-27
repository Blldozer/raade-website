
import React, { Suspense, lazy } from 'react';
import SectionFallback from './SectionFallback';

// Lazy load heavier components to improve initial page load time
const NewModel = lazy(() => import("./NewModel"));
const Reality = lazy(() => import("./Reality"));
const Approach = lazy(() => import("./Approach"));
const Impact = lazy(() => import("./Impact"));
const Team = lazy(() => import("./Team"));

interface AboutSectionsProps {
  activeSection: number;
  pageInitialized: boolean;
}

/**
 * AboutSections component - Manages the rendering of About page sections
 * 
 * Features:
 * - Renders all sections once page is initialized
 * - Uses React.Suspense for smooth lazy loading
 * - Custom fallbacks for better user experience during loading
 * - Uses activeSection only for scroll positioning, not for controlling visibility
 */
const AboutSections = ({ activeSection, pageInitialized }: AboutSectionsProps) => {
  // Log state for debugging
  React.useEffect(() => {
    console.log("[SECTIONS DEBUG] AboutSections render - activeSection:", activeSection, "pageInitialized:", pageInitialized);
  }, [activeSection, pageInitialized]);
  
  // Create an array of sections to render
  const sections = [
    // Section 0: Always visible hero (not lazy loaded for immediate display)
    null, // Hero is handled separately
    
    // Sections 1-5: All content sections with light backgrounds
    <Suspense key="newmodel" fallback={<SectionFallback sectionName="New Model" />}>
      <NewModel />
    </Suspense>,
    
    <Suspense key="reality" fallback={<SectionFallback sectionName="Reality" />}>
      <Reality />
    </Suspense>,
    
    <Suspense key="approach" fallback={<SectionFallback sectionName="Approach" />}>
      <Approach />
    </Suspense>,
    
    <Suspense key="impact" fallback={<SectionFallback sectionName="Impact" />}>
      <Impact />
    </Suspense>,
    
    <Suspense key="team" fallback={<SectionFallback sectionName="Team" />}>
      <Team />
    </Suspense>
  ];

  // Handle edge case where page isn't initialized
  if (!pageInitialized) {
    console.log("[SECTIONS DEBUG] AboutSections: Page not yet initialized, returning null");
    return null;
  }

  // IMPORTANT: Always render ALL sections once page is initialized
  // This is the key fix - we always render all sections from index 1 onwards
  console.log(`[SECTIONS DEBUG] Rendering all sections (1-5) regardless of activeSection`);
  
  // Render all sections starting from index 1 (after hero)
  const sectionsToRender = sections.slice(1);

  console.log(`[SECTIONS DEBUG] Rendering ${sectionsToRender.length} sections out of ${sections.length - 1} total sections`);
  return <>{sectionsToRender}</>;
};

export default AboutSections;
