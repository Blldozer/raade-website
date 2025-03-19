
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
 * AboutSections component - Manages the lazy loading of About page sections
 * 
 * Features:
 * - Progressively reveals sections based on the activeSection prop
 * - Uses React.Suspense for smooth lazy loading
 * - Custom fallbacks for better user experience during loading
 * - Handles edge cases like uninitialized page state
 */
const AboutSections = ({ activeSection, pageInitialized }: AboutSectionsProps) => {
  // Log state for debugging
  React.useEffect(() => {
    console.log("AboutSections render - activeSection:", activeSection, "pageInitialized:", pageInitialized);
  }, [activeSection, pageInitialized]);
  
  // Create an array of sections to render progressively
  const sections = [
    // Section 0: Always visible hero (not lazy loaded for immediate display)
    null, // Hero is handled separately
    
    // Sections 1-5: Progressively loaded with more advanced fallbacks
    // All content sections have light backgrounds (data-background="light")
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
    console.log("AboutSections: Page not yet initialized, returning null");
    return null;
  }

  // Ensure we return at least the first section if activeSection is 0
  const sectionsToRender = activeSection === 0 ? 
    [sections[1]] : 
    sections.slice(1, activeSection + 1);

  console.log(`Rendering ${sectionsToRender.length} sections`);
  return <>{sectionsToRender}</>;
};

export default AboutSections;
