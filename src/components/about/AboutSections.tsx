
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
 * Progressively reveals sections based on the activeSection prop
 * Each section includes data-background attributes for proper navbar styling
 */
const AboutSections = ({ activeSection, pageInitialized }: AboutSectionsProps) => {
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

  return (
    <>
      {pageInitialized && sections.slice(1, activeSection + 1)}
    </>
  );
};

export default AboutSections;
