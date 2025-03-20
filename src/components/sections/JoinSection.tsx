
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BackgroundEffects from './join/BackgroundEffects';
import SectionHeader from './join/SectionHeader';
import InnovationStudiosCard from './join/InnovationStudiosCard';
import ConferenceCard from './join/ConferenceCard';
import PartnerCTA from './join/PartnerCTA';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * JoinSection Component - Main section for user engagement opportunities
 * 
 * Features:
 * - GSAP animations for enhanced entrance effect
 * - Section for displaying Innovation Studios and Conference opportunities
 * - Responsive grid layout for different device sizes
 * - Custom event handling for section transitions
 * - Uses consistent ID 'join' to support navigation from all parts of the site
 */
const JoinSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Initial state - slightly scaled down and faded
    gsap.set(section, {
      scale: 0.9,
      opacity: 0.8
    });

    // Create zoom-in animation for entering this section
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: true,
      }
    });

    // Scale up as it enters the viewport
    enterTl.to(section, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    });

    // Listen for the transition event from TransitionHook
    const transitionHandler = () => {
      // Trigger a more pronounced zoom-in animation when explicitly transitioning
      gsap.fromTo(section,
        { scale: 0.9, opacity: 0.8 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          overwrite: true
        }
      );
    };

    document.addEventListener('transitionToJoin', transitionHandler);

    return () => {
      // Clean up
      document.removeEventListener('transitionToJoin', transitionHandler);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="join" // Using "join" consistently as the ID
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20 md:py-32"
    >
      {/* Background elements */}
      <BackgroundEffects />
      
      <div ref={contentRef} className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Innovation Studios Card */}
          <InnovationStudiosCard />

          {/* Conference Card */}
          <ConferenceCard />
        </div>
        
        {/* Partner submission CTA */}
        <PartnerCTA />
      </div>
    </section>
  );
};

export default JoinSection;
