
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
  const cardTransitionRef = useRef(null);

  useEffect(() => {
    // Initialize main page transitions
    const sections = document.querySelectorAll("section");
    
    // Set up scroll pinning for smooth transitions
    sections.forEach((section, index) => {
      // Skip the hero and card transition sections
      if (index === 0 || section.id === "card-transition-container") return;
      
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
    
    // Set up the card deck transition between ConferencePromo and TransitionStat
    const cardTransitionContainer = cardTransitionRef.current;
    const conferencePromo = document.getElementById('conference-promo');
    const transitionStat = document.getElementById('transition-stat');
    
    if (cardTransitionContainer && conferencePromo && transitionStat) {
      // Pin the container during transition
      ScrollTrigger.create({
        trigger: cardTransitionContainer,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        markers: false, // Set to true for debugging
      });
      
      // Create card transition animation
      gsap.timeline({
        scrollTrigger: {
          trigger: cardTransitionContainer,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          markers: false, // Set to true for debugging
        }
      })
      .fromTo(conferencePromo, 
        { y: 0, scale: 1, opacity: 1, rotationX: 0 },
        { y: -50, scale: 0.92, opacity: 0.7, rotationX: 5, ease: "power1.inOut" }, 0
      )
      .fromTo(transitionStat, 
        { y: 100, scale: 0.92, opacity: 0, rotationX: -5 },
        { y: 0, scale: 1, opacity: 1, rotationX: 0, ease: "power1.inOut" }, 0
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
      
      {/* Card transition container */}
      <div 
        ref={cardTransitionRef}
        className="relative w-full h-[200vh]" 
        id="card-transition-container"
      >
        <section 
          className="absolute top-0 left-0 w-full min-h-screen will-change-transform" 
          id="conference-promo"
          style={{ zIndex: 10 }}
        >
          <ConferencePromo />
        </section>
        
        <section 
          className="absolute top-0 left-0 w-full min-h-screen will-change-transform" 
          id="transition-stat"
          style={{ zIndex: 20 }}
        >
          <TransitionStat />
        </section>
      </div>
      
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
