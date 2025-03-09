
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BenefitCarouselProps {
  benefits: string[];
  isActive?: boolean;
}

const BenefitCarousel = ({ benefits, isActive = false }: BenefitCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-advance the carousel every 5 seconds if it's active and not paused
  useEffect(() => {
    if (!isActive || isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, benefits.length]);
  
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length);
  };
  
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
  };
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };
  
  return (
    <div 
      className="relative h-32 md:h-24 overflow-hidden" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center absolute top-0 left-0 w-full h-full z-10">
        <Button 
          size="icon" 
          variant="ghost" 
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-1 absolute bottom-0 left-1/2 transform -translate-x-1/2">
          {benefits.map((_, index) => (
            <span 
              key={index} 
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-[#FBB03B]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full flex items-center justify-center px-12"
        >
          <div className="flex items-start">
            <span className="text-[#FBB03B] mr-2 text-xl">•</span>
            <p className="text-white/90 font-lora">{benefits[currentIndex]}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BenefitCarousel;
