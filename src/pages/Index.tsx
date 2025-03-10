
import Hero from "@/components/hero/Hero";
import ConferencePromo from "@/components/sections/ConferencePromo";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const cardDeckRef = useRef<HTMLDivElement>(null);

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
    
    // Create a special card-deck transition between TransitionStat and FutureShowcase
    const statSection = document.getElementById('transition-stat');
    const futureSection = document.getElementById('future-showcase');
    const cardDeckContainer = cardDeckRef.current;
    
    if (statSection && futureSection && cardDeckContainer) {
      // Pin the card deck container during the transition
      const cardDeckTrigger = ScrollTrigger.create({
        trigger: cardDeckContainer,
        start: "top 15%", 
        end: "bottom -50%",
        pin: true,
        pinSpacing: false,
        markers: false // Set to true for debugging
      });
      
      // Create the card deck animation
      gsap.timeline({
        scrollTrigger: {
          trigger: cardDeckContainer,
          start: "top 20%",
          end: "bottom -100%",
          scrub: 0.5,
          markers: false, // Set to true for debugging
          onUpdate: self => {
            // Update classes based on progress
            if (self.progress > 0.1) {
              statSection.classList.add('transitioning-out');
              futureSection.classList.add('transitioning-in');
            } else {
              statSection.classList.remove('transitioning-out');
              futureSection.classList.remove('transitioning-in');
            }
          }
        }
      })
      .fromTo(futureSection, 
        { y: "100%", scale: 0.85, opacity: 0.6, rotateX: "5deg", transformOrigin: "bottom center" },
        { y: "0%", scale: 1, opacity: 1, rotateX: "0deg", ease: "power2.out" }, 
        0
      )
      .to(statSection, 
        { y: "-10%", scale: 0.9, opacity: 0, rotateX: "-5deg", transformOrigin: "top center", ease: "power2.in" }, 
        0
      );
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
      
      {/* Card deck container for the transition effect */}
      <div 
        ref={cardDeckRef} 
        className="relative w-full min-h-[100vh] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <section 
          className="absolute top-0 left-0 w-full min-h-screen z-20 will-change-transform" 
          id="transition-stat"
        >
          <TransitionStat />
        </section>
        
        <section 
          className="absolute top-0 left-0 w-full min-h-screen z-10 will-change-transform bg-white" 
          id="future-showcase"
        >
          <FutureShowcase />
        </section>
      </div>
      
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
