
import { motion } from "framer-motion";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";

/**
 * HeroSection Component - Animated hero for Innovation Studios page
 * 
 * Features:
 * - Animated gradient background with consistent container spacing
 * - Improved horizontal alignment with appropriate padding for all viewport sizes
 * - Staggered text animation with proper margin and padding
 * - Proper vertical distribution of content throughout viewport height
 * - Consistent text alignment between tagline blocks and description
 */
const HeroSection = ({ scrollToContent }: { scrollToContent: () => void }) => {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden flex items-center justify-center innovation-studios-hero" data-background="dark">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-[#2b212e]">
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-20 flex flex-col justify-center items-center h-full min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 flex flex-col justify-center items-center h-full"
        >
          {["Design.", "Build.", "Scale."].map((text, index) => (
            <motion.div 
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              className="flex justify-center items-center"
            >
              <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-simula leading-[1.1] tracking-tight text-white text-center w-full">
                {text}
              </h1>
            </motion.div>
          ))}
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 mb-16 sm:mb-24 text-[clamp(1rem,3vw,2rem)] text-white/90 font-lora max-w-2xl mx-auto text-center"
        >
          A project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.
        </motion.p>
      </div>

      {/* Add scroll down indicator */}
      <ScrollDownButton onClick={scrollToContent} />
    </div>
  );
};

export default HeroSection;
