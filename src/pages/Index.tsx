
import { useEffect, useRef } from "react";
import Hero from "@/components/hero/Hero";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Configure GSAP for better performance
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.stack-section');
      
      // Batch animations for better performance
      ScrollTrigger.batch(".stack-section", {
        interval: 0.1,
        batchMax: 3,
        onEnter: batch => {
          gsap.set(batch, { willChange: "transform" });
        },
        onLeaveBack: batch => {
          gsap.set(batch, { willChange: "auto" });
        }
      });

      sections.forEach((section, index) => {
        if (section.classList.contains('future-showcase-section')) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.scrollHeight}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          });
        } else {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          });
        }

        if (index !== 0) {
          gsap.fromTo(section,
            {
              y: "100vh",
              willChange: "transform",
            },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
                onEnter: () => gsap.set(section, { willChange: "transform" }),
                onLeave: () => gsap.set(section, { willChange: "auto" }),
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="stack-section min-h-screen" id="hero">
        <Hero />
      </div>
      
      <div className="stack-section min-h-screen bg-[#F5F5F0]" id="transition-stat">
        <TransitionStat />
      </div>
      
      <div className="stack-section future-showcase-section min-h-screen bg-white" id="future-showcase">
        <FutureShowcase />
      </div>
      
      <div className="stack-section min-h-screen bg-[#F5F5F0]" id="transition-hook">
        <TransitionHook />
      </div>
      
      <div className="stack-section min-h-screen bg-white" id="join">
        <JoinSection />
      </div>
    </div>
  );
};

export default Index;
