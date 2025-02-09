
import Hero from "@/components/hero/Hero";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TransitionStat />
      <FutureShowcase />
      <TransitionHook />
      <JoinSection />
    </div>
  );
};

export default Index;
