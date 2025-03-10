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
            
            // Create the simultaneous zoom effect
            if (self.isActive) {
              document.dispatchEvent(new CustomEvent('transitionToHook'));
              
              // Create the simultaneous zoom effect - future showcase zooming out while hook section zooms in
              const timeline = gsap.timeline();
              timeline.to(futureSection, {
                scale: 0.85,
                opacity: 0.7,
                duration: 1.2,
                ease: "power2.in"
              }, 0);
              
              timeline.fromTo(hookSection, 
                { scale: 0.85, opacity: 0.7 },
                { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
                0
              );
            }
          }
        }
      });
    }
    
    // Create a special transition between TransitionHook and JoinSection
    const joinSection = document.getElementById('join');
    
    if (hookSection && joinSection) {
      // Enhanced coordination for the simultaneous zoom effect
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
            
            // Trigger the custom transition event when entering the overlap zone
            if (self.isActive) {
              document.dispatchEvent(new CustomEvent('transitionToJoin'));
            }
            
            // Create the simultaneous zoom effect - hook section zooming out while join section zooms in
            const timeline = gsap.timeline();
            timeline.to(hookSection, {
              scale: 0.85,
              opacity: 0.6,
              duration: 0.8,
              ease: "power2.in"
            }, 0);
            
            timeline.fromTo(joinSection, 
              { scale: 0.85, opacity: 0.6 },
              { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
              0
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
