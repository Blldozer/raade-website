
import { motion } from "framer-motion";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";
import ExplodableField from "@/components/hero/explodable/ExplodableField";

/**
 * HeroSection Component - Animated hero for Innovation Studios page
 * 
 * Features:
 * - Connected, process-oriented animation sequence for the main tagline
 * - Engaging typography with gradient effects and highlights
 * - Visual representation of the design, build, scale process
 * - Responsive design with optimized animations for all devices
 */
const HeroSection = ({ scrollToContent }: { scrollToContent: () => void }) => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.4,
        delayChildren: 0.3,
        duration: 0.6
      }
    }
  };
  
  // Animation variants for individual words
  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Animation variants for descriptive text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 1.4,
        duration: 0.7
      }
    }
  };
  
  // Visual connector line animation variants
  const connectorVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (custom: number) => ({
      height: "100%",
      opacity: 0.6,
      transition: { 
        delay: 0.3 * (custom + 1),
        duration: 0.4
      }
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center innovation-studios-hero" data-background="dark">
      {/* Enhanced gradient background with more visual interest */}
      <div className="absolute inset-0 z-0 bg-[#2b212e]">
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/40 via-[#6E59A5]/20 to-transparent" />
        </div>
      </div>
      
      {/* Interactive building blocks area (now empty) */}
      <ExplodableField />
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col justify-center min-h-[calc(100vh-120px)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Design-Build-Scale process with connecting elements */}
          <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col items-center md:items-start">
            <div className="space-y-6 sm:space-y-10 md:space-y-14 relative">
              {/* Process elements with connecting lines */}
              {[
                {word: "Design.", color: "bg-gradient-to-r from-[#FBB03B] to-[#F97316] bg-clip-text text-transparent"}, 
                {word: "Build.", color: "bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] bg-clip-text text-transparent"}, 
                {word: "Scale.", color: "bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent"}
              ].map((item, index) => (
                <div key={item.word} className="relative flex items-center">
                  {/* Connecting line between words (except first) */}
                  {index > 0 && (
                    <motion.div 
                      className="absolute top-[-60px] sm:top-[-90px] md:top-[-110px] left-[50%] md:left-8 w-[2px] bg-[#FBB03B]/60"
                      style={{ height: 0 }}
                      variants={connectorVariants}
                      custom={index-1}
                    />
                  )}
                  
                  {/* Step number indicator with enhanced design */}
                  <motion.div 
                    variants={wordVariants}
                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xl font-simula mr-4 sm:mr-6 hidden md:flex border border-white/20 shadow-lg"
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Step word with gradient color */}
                  <motion.h1 
                    variants={wordVariants}
                    className={`text-[clamp(3.5rem,10vw,8rem)] font-simula leading-[1.1] tracking-tight ${item.color} drop-shadow-md`}
                  >
                    {item.word}
                  </motion.h1>
                </div>
              ))}
            </div>
            
            {/* Description text with enhanced typography and animation */}
            <motion.p 
              variants={textVariants}
              className="mt-16 sm:mt-20 text-[clamp(1rem,4vw,1.5rem)] text-white/90 font-lora max-w-2xl text-center md:text-left leading-relaxed"
            >
              <span className="font-semibold text-[#FBB03B] drop-shadow-sm">Project-driven innovation</span> creating{" "}
              <span className="italic">market-based solutions</span> for Africa's most pressing challenges.
            </motion.p>
            
            {/* Add a subtle call to action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.5 }}
              className="mt-8 text-white/70 text-sm md:text-base font-lora hidden md:block"
            >
              Discover how we're transforming ideas into impact
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add scroll down indicator */}
      <ScrollDownButton onClick={scrollToContent} />
    </div>
  );
};

export default HeroSection;
