
import Hero from "@/components/hero/Hero";
import ConferencePromo from "@/components/sections/ConferencePromo";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Initialize main page transitions
    const sections = document.querySelectorAll("section");
    
    // Set up scroll pinning for smooth transitions
    sections.forEach((section, index) => {
      // Skip the hero section
      if (index === 0) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleClass: { targets: section, className: "active" }
      });
    });
    
    // Create a special transition between TransitionStat and FutureShowcase
    const statSection = document.getElementById('transition-stat');
    const futureSection = document.getElementById('future-showcase');
    
    if (statSection && futureSection) {
      // This marker helps coordinate the two animations
      ScrollTrigger.create({
        trigger: statSection,
        start: "bottom 60%",
        endTrigger: futureSection,
        end: "top 40%",
        markers: false, // Set to true for debugging
        toggleClass: "transitioning",
        onToggle: (self) => {
          if (self.isActive) {
            // If we're in the transition zone, make sure both sections are visible
            gsap.set([statSection, futureSection], { visibility: "visible" });
          }
        }
      });
    }
    
    // Create a special transition between FutureShowcase and TransitionHook (the "Every day we wait" section)
    const hookSection = document.getElementById('transition-hook');
    
    if (futureSection && hookSection) {
      // Coordinate the transition between these sections
      ScrollTrigger.create({
        trigger: futureSection,
        start: "bottom 70%",
        endTrigger: hookSection,
        end: "top 30%",
        markers: false, // Set to true for debugging
        toggleClass: "transition-to-hook",
        onToggle: (self) => {
          if (self.isActive) {
            // If we're in the transition zone, make sure both sections are visible
            gsap.set([futureSection, hookSection], { visibility: "visible" });
          }
        }
      });
    }
    
    // Create a special transition between TransitionHook and JoinSection
    const joinSection = document.getElementById('join');
    
    if (hookSection && joinSection) {
      // Coordinate the transition between these sections
      ScrollTrigger.create({
        trigger: hookSection,
        start: "bottom 60%",
        endTrigger: joinSection,
        end: "top 40%",
        markers: false, // Set to true for debugging
        toggleClass: "transition-to-join",
        onToggle: (self) => {
          if (self.isActive) {
            // If we're in the transition zone, make sure both sections are visible
            gsap.set([hookSection, joinSection], { visibility: "visible" });
            
            // Add a subtle animation for the join section
            gsap.fromTo(joinSection, 
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
          }
        }
      });
    }
    
    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <section 
        className="relative w-full min-h-screen" 
        id="hero"
      >
        <Hero />
      </section>
      
      <section 
        className="relative w-full min-h-screen" 
        id="conference-promo"
      >
        <ConferencePromo />
      </section>
      
      <section 
        className="relative w-full min-h-screen" 
        id="transition-stat"
      >
        <TransitionStat />
      </section>
      
      <section 
        className="relative w-full min-h-screen bg-white" 
        id="future-showcase"
      >
        <FutureShowcase />
      </section>
      
      <section 
        className="relative w-full min-h-screen bg-[#3C403A]" 
        id="transition-hook"
      >
        <TransitionHook />
      </section>
      
      <section 
        className="relative w-full min-h-screen" 
        id="join"
      >
        <JoinSection />
      </section>
    </div>
  );
};

export default Index;
