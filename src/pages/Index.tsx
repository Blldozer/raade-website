
import Hero from "@/components/hero/Hero";
import ConferencePromo from "@/components/sections/ConferencePromo";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";

const Index = () => {
  useSectionTransitions();
  
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <section 
        className="relative w-full min-h-screen z-[var(--z-content)]" 
        id="hero"
      >
        <Hero />
      </section>
      
      <section 
        className="relative w-full min-h-screen z-[var(--z-content)]" 
        id="conference-promo"
      >
        <ConferencePromo />
      </section>
      
      <section 
        className="relative w-full min-h-screen z-[var(--z-content)]" 
        id="transition-stat"
      >
        <TransitionStat />
      </section>
      
      <section 
        className="relative w-full min-h-screen bg-white z-[var(--z-content)]" 
        id="future-showcase"
      >
        <FutureShowcase />
      </section>
      
      <section 
        className="relative w-full min-h-screen bg-[#3C403A] z-[var(--z-content)]" 
        id="transition-hook"
      >
        <TransitionHook />
      </section>
      
      <section 
        className="relative w-full min-h-screen z-[var(--z-content)]" 
        id="join"
      >
        <JoinSection />
      </section>
    </div>
  );
};

export default Index;
