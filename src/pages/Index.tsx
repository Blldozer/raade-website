
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
    const ctx = gsap.context(() => {
      // Pin the hero section
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        pin: true,
        pinSpacing: false
      });

      // Get all sections except hero and future showcase
      const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
      
      // Create the stacking effect for each section
      sections.forEach((section) => {
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
              start: "top bottom",
              end: "top top",
              scrub: true,
              markers: false
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="hero-section min-h-screen">
        <Hero />
      </div>
      
      <div className="animate-section min-h-screen bg-[#F5F5F0]">
        <TransitionStat />
      </div>
      
      <div className="min-h-screen bg-white future-showcase">
        <FutureShowcase />
      </div>
      
      <div className="animate-section min-h-screen bg-[#F5F5F0]">
        <TransitionHook />
      </div>
      
      <div className="animate-section min-h-screen bg-white">
        <JoinSection />
      </div>
    </div>
  );
};

export default Index;
