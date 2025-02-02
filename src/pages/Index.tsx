import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from "@/components/hero/HeroSection";
import OpeningScene from "@/components/scenes/OpeningScene";

const Index = () => {
  // State to manage which scene is currently visible
  const [currentScene, setCurrentScene] = useState<'opening' | 'hero'>('opening');
  // State to handle initial mount animation
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to handle the transition from opening to hero scene
  const handleOpeningComplete = () => {
    setCurrentScene('hero');
  };

  if (!isMounted) return null; // Prevents flash of content

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === 'opening' ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <OpeningScene onComplete={handleOpeningComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;