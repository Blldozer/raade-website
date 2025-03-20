
import { motion } from "framer-motion";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";

/**
 * HeroSection Component - Animated hero for Innovation Studios page
 * 
 * Features:
 * - Balanced layout with improved grid system for visual hierarchy
 * - Consistent spacing with the design system
 * - Better responsive text scaling across all devices
 * - Tagline positioning optimized for different screen sizes
 */
const HeroSection = ({ scrollToContent }: { scrollToContent: () => void }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center innovation-studios-hero" data-background="dark">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-[#2b212e]">
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 pt-20 sm:pt-24 md:pt-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 space-y-6 sm:space-y-10 md:space-y-14"
          >
            {["Design.", "Build.", "Scale."].map((word, index) => (
              <motion.div 
                key={word}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-[clamp(3rem,12vw,8rem)] font-simula text-white leading-[1.1] tracking-tight">
                  {word}
                </h1>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 mt-auto mb-16 sm:mb-24"
        >
          <p className="text-[clamp(1rem,4vw,1.75rem)] text-white/90 font-lora max-w-2xl mx-auto text-center">
            A project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.
          </p>
        </motion.div>
      </div>

      {/* Add scroll down indicator */}
      <ScrollDownButton onClick={scrollToContent} />
    </div>
  );
};

export default HeroSection;
