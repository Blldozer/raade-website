
import Hero from "@/components/hero/Hero";
import TransitionStat from "@/components/sections/TransitionStat";
import FutureShowcase from "@/components/sections/FutureShowcase";
import TransitionHook from "@/components/sections/TransitionHook";
import JoinSection from "@/components/sections/JoinSection";
import { motion, useScroll, useTransform } from "framer-motion";

const Index = () => {
  const { scrollY } = useScroll();
  
  // Create smooth parallax effects for each section
  const statY = useTransform(scrollY, [0, 1000], [200, 0]);
  const showcaseY = useTransform(scrollY, [500, 1500], [200, 0]);
  const hookY = useTransform(scrollY, [1000, 2000], [200, 0]);
  const joinY = useTransform(scrollY, [1500, 2500], [200, 0]);

  return (
    <div className="relative">
      <div className="min-h-screen">
        <Hero />
      </div>
      
      {/* Stat Section with Pull Effect */}
      <motion.div
        style={{ y: statY }}
        className="relative z-10 min-h-screen bg-[#F5F5F0]"
      >
        <TransitionStat />
      </motion.div>
      
      {/* Future Showcase with Pull Effect */}
      <motion.div
        style={{ y: showcaseY }}
        className="relative z-20 min-h-screen bg-white"
      >
        <FutureShowcase />
      </motion.div>
      
      {/* Transition Hook with Pull Effect */}
      <motion.div
        style={{ y: hookY }}
        className="relative z-30 min-h-screen bg-[#F5F5F0]"
      >
        <TransitionHook />
      </motion.div>
      
      {/* Join Section with Pull Effect */}
      <motion.div
        style={{ y: joinY }}
        className="relative z-40 min-h-screen bg-white"
      >
        <JoinSection />
      </motion.div>
    </div>
  );
};

export default Index;
