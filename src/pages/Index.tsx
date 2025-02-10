
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

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.stack-section');
      const footer = document.querySelector('footer');
      const footerHeight = footer?.offsetHeight || 0;
      
      sections.forEach((section, index) => {
        if (section.classList.contains('future-showcase-section')) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.scrollHeight}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1
          });
        } else if (index < sections.length - 1) { 
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            anticipatePin: 1
          });
        }

        if (index !== 0) {
          gsap.fromTo(section,
            {
              y: "100vh",
            },
            {
              y: 0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 1,
              }
            }
          );
        }
      });

      // Footer reveal animation
      if (footer) {
        gsap.set(footer, { yPercent: 100 });
        
        ScrollTrigger.create({
          trigger: "#join",
          start: "bottom bottom",
          end: `bottom+=${footerHeight} bottom`,
          scrub: true,
          onUpdate: (self) => {
            gsap.to(footer, {
              yPercent: 100 - (self.progress * 100),
              duration: 0
            });
          }
        });
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
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
    </>
  );
};

export default Index;
