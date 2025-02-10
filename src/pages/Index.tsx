
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
      // Pin the hero section with smooth animation
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        pin: true,
        pinSpacing: false,
        fastScrollEnd: true,
        anticipatePin: 1
      });

      // Get all sections except hero and future showcase
      const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
      
      // Create the stacking effect for each section with optimized animations
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          fastScrollEnd: true,
          anticipatePin: 1
        });

        // Animate section coming in from bottom with improved performance
        gsap.fromTo(section,
          {
            y: "100vh",
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 1,
              markers: false,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative will-change-transform">
      <div className="hero-section min-h-screen will-change-transform">
        <Hero />
      </div>
      
      <div className="animate-section min-h-screen bg-[#F5F5F0] will-change-transform">
        <TransitionStat />
      </div>
      
      <div className="min-h-screen bg-white future-showcase will-change-transform">
        <FutureShowcase />
      </div>
      
      <div className="animate-section min-h-screen bg-[#F5F5F0] will-change-transform">
        <TransitionHook />
      </div>
      
      <div className="animate-section min-h-screen bg-white will-change-transform">
        <JoinSection />
      </div>
    </div>
  );
};

export default Index;
