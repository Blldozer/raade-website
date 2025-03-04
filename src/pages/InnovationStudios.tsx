
import InnovationStudiosSection from "@/components/InnovationStudios";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const InnovationStudios = () => {
  const Hero = () => {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 bg-[#2b212e]">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {["Design.", "Build.", "Scale."].map((word, index) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                >
                  <h1 className="text-7xl md:text-9xl font-simula text-white">
                    {word}
                  </h1>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 text-xl md:text-2xl text-white/90 font-lora max-w-2xl"
            >
              We're a project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.
            </motion.p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navigation isHeroPage={true} />
      <div>
        <Hero />
        <InnovationStudiosSection />
        <ProjectsShowcase />
      </div>
    </div>
  );
};

export default InnovationStudios;
