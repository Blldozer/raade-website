
import { useRef } from "react";
import Hero from "@/components/hero/Hero";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { useStackingScroll } from "@/hooks/useStackingScroll";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useStackingScroll({ index: 5 });
  const section2Ref = useStackingScroll({ index: 4 });
  const section3Ref = useStackingScroll({ index: 3 });
  const section4Ref = useStackingScroll({ index: 2 });
  const section5Ref = useStackingScroll({ index: 1 });

  return (
    <div className="min-h-screen flex flex-col">
      <div ref={containerRef} className="relative flex-grow" style={{ height: '500vh' }}>
        <section 
          ref={section1Ref as any} 
          className="stack-section relative w-full min-h-screen" 
          style={{ zIndex: 50 }}
          id="hero"
        >
          <Hero />
        </section>
        
        <section 
          ref={section2Ref as any} 
          className="stack-section fixed w-full min-h-screen bg-[#F5F5F0]" 
          style={{ zIndex: 40 }}
          id="transition-stat"
        >
          <TransitionStat />
        </section>
        
        <section 
          ref={section3Ref as any} 
          className="stack-section future-showcase-section fixed w-full min-h-screen bg-white" 
          style={{ zIndex: 30 }}
          id="future-showcase"
        >
          <FutureShowcase />
        </section>
        
        <section 
          ref={section4Ref as any} 
          className="stack-section fixed w-full min-h-screen bg-[#F5F5F0]" 
          style={{ zIndex: 20 }}
          id="transition-hook"
        >
          <TransitionHook />
        </section>
        
        <section 
          ref={section5Ref as any} 
          className="stack-section fixed w-full min-h-screen bg-white" 
          style={{ zIndex: 10 }}
          id="join"
        >
          <JoinSection />
        </section>
      </div>
    </div>
  );
};

export default Index;
