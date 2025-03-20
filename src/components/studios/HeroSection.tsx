
import { motion } from "framer-motion";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";

/**
 * HeroSection Component - Animated hero for Innovation Studios page
 * 
 * Features:
 * - Animated gradient background with subtle overlay effects
 * - Staggered text animation for the main tagline
 * - Improved responsive text scaling optimized for all viewports (mobile, tablet, laptop, desktop)
 * - Custom media query handling for laptop viewport text size
 * - Scroll down indicator for better UX
 * - Font fallback strategy to prevent text invisibility during font loading
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
        <div className="max-w-4xl pl-4 sm:pl-8 md:pl-12 pt-24 sm:pt-32 md:pt-36">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16"
          >
            {[
              { text: "Design." },
              { text: "Build." },
              { text: "Scale." }
            ].map((item, index) => (
              <motion.div 
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              >
                <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-simula leading-[1.1] tracking-tight text-white">
                  {item.text}
                </h1>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-auto mb-16 sm:mb-24 text-[clamp(1rem,2.5vw,1.75rem)] text-white/90 font-lora max-w-2xl pl-4 sm:pl-8 md:pl-12"
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
