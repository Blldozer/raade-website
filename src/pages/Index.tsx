
import { useEffect, useRef } from "react";
import Hero from "@/components/hero/Hero";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get all sections
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    
    // Create the stacking effect for each section
    sections.forEach((section, i) => {
      // Skip the first (hero) section
      if (i === 0) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false
      });

      // Animate section coming in from bottom
      gsap.fromTo(section,
        {
          y: "100vh",
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // Start when the top of the section hits the bottom of the viewport
            end: "top top", // End when the top of the section hits the top of the viewport
            scrub: true,
            markers: false // Set to true during development to see trigger points
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="section min-h-screen">
        <Hero />
      </div>
      
      <div className="section min-h-screen bg-[#F5F5F0]">
        <TransitionStat />
      </div>
      
      <div className="section min-h-screen bg-white">
        <FutureShowcase />
      </div>
      
      <div className="section min-h-screen bg-[#F5F5F0]">
        <TransitionHook />
      </div>
      
      <div className="section min-h-screen bg-white">
        <JoinSection />
      </div>
    </div>
  );
};

export default Index;
