
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
        className="relative w-full min-h-screen bg-[#F5F5F0]" 
        id="transition-hook"
      >
        <TransitionHook />
      </section>
      
      <section 
        className="relative w-full min-h-screen bg-white" 
        id="join"
      >
        <JoinSection />
      </section>
    </div>
  );
};

export default Index;
