
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
      // Get all sections including hero
      const sections = gsap.utils.toArray<HTMLElement>('.stack-section');
      
      // Create the stacking effect for each section
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1
        });

        // Don't animate the first section (hero) coming in
        if (index !== 0) {
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
              }
            }
          );
        }
      });

      // Batch all ScrollTrigger refreshes
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="stack-section min-h-screen">
        <Hero />
      </div>
      
      <div className="stack-section min-h-screen bg-[#F5F5F0]">
        <TransitionStat />
      </div>
      
      <div className="stack-section min-h-screen bg-white">
        <FutureShowcase />
      </div>
      
      <div className="stack-section min-h-screen bg-[#F5F5F0]">
        <TransitionHook />
      </div>
      
      <div className="stack-section min-h-screen bg-white">
        <JoinSection />
      </div>
    </div>
  );
};

export default Index;

