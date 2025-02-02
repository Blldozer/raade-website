import { useState, useEffect } from 'react';
import HeroSection from "@/components/hero/HeroSection";
import OpeningScene from "@/components/scenes/OpeningScene";

const Index = () => {
  // State to manage which scene is currently visible
  const [currentScene, setCurrentScene] = useState<'opening' | 'hero'>('opening');

  // Function to handle the transition from opening to hero scene
  const handleOpeningComplete = () => {
    setCurrentScene('hero');
  };

  return (
    <div className="min-h-screen">
      {/* Only render the scene that should be currently visible */}
      {currentScene === 'opening' ? (
        <OpeningScene onComplete={handleOpeningComplete} />
      ) : (
        <HeroSection />
      )}
    </div>
  );
};

export default Index;