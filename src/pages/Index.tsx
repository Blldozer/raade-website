
import Hero from "@/components/hero/Hero";
import ConferencePromo from "@/components/sections/ConferencePromo";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";

const Index = () => {
  // Use our hook for section transitions
  useSectionTransitions();
  
  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative w-full min-h-screen" id="hero">
        <Hero />
      </section>
      
      <section className="relative w-full min-h-screen" id="conference-promo">
        <ConferencePromo />
      </section>
      
      <section className="relative w-full min-h-screen" id="transition-stat">
        <TransitionStat />
      </section>
      
      <section className="relative w-full min-h-screen bg-white" id="future-showcase">
        <FutureShowcase />
      </section>
      
      <section className="relative w-full min-h-screen bg-[#3C403A]" id="transition-hook">
        <TransitionHook />
      </section>
      
      <section className="relative w-full min-h-screen" id="join">
        <JoinSection />
      </section>
    </div>
  );
};

export default Index;
