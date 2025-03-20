import { motion } from "framer-motion";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";
import ExplodableField from "@/components/hero/explodable/ExplodableField";

/**
 * HeroSection Component - Animated hero for Innovation Studios page
 * 
 * Features:
 * - Connected, process-oriented animation sequence for the main tagline
 * - Interactive building blocks that visitors can drag, stack and rebuild
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-[#2b212e]">
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
        </div>
      </div>
      
      {/* Interactive building blocks that users can drag and stack */}
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
              {["Design.", "Build.", "Scale."].map((word, index) => (
                <div key={word} className="relative flex items-center">
                  {/* Connecting line between words (except first) */}
                  {index > 0 && (
                    <motion.div 
                      className="absolute top-[-60px] sm:top-[-90px] md:top-[-110px] left-[50%] md:left-8 w-[2px] bg-[#FBB03B]/60"
                      style={{ height: 0 }}
                      variants={connectorVariants}
                      custom={index-1}
                    />
                  )}
                  
                  {/* Step number indicator */}
                  <motion.div 
                    variants={wordVariants}
                    className="h-12 w-12 rounded-full bg-[#FBB03B]/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-simula mr-4 sm:mr-6 hidden md:flex"
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Step word */}
                  <motion.h1 
                    variants={wordVariants}
                    className="text-[clamp(3.5rem,10vw,8rem)] font-simula text-white leading-[1.1] tracking-tight"
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>
            
            {/* Description text */}
            <motion.p 
              variants={textVariants}
              className="mt-16 sm:mt-20 text-[clamp(1rem,4vw,1.5rem)] text-white/90 font-lora max-w-2xl text-center md:text-left"
            >
              A project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Add scroll down indicator */}
      <ScrollDownButton onClick={scrollToContent} />
    </div>
  );
};

export default HeroSection;
