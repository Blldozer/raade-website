
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CardContentProps {
  activeAttendee: {
    title: string;
    subtitle: string;
    benefits: string[];
    color: string;
  };
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  setIsPaused: (paused: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const CardContent = ({
  activeAttendee,
  currentIndex,
  setCurrentIndex,
  setIsPaused,
  handleNext,
  handlePrev
}: CardContentProps) => {
  return (
    <div className="relative w-full h-full p-6 text-white flex flex-col">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"></div>
      
      {/* Header */}
      <div className="mb-6">
        <Badge className="bg-white/20 text-white mb-2 backdrop-blur-sm">
          {activeAttendee.subtitle}
        </Badge>
        <h3 className="text-2xl font-bold font-simula">{activeAttendee.title}</h3>
      </div>
      
      {/* Benefit Content with Animation */}
      <div className="flex-grow flex items-center justify-center relative overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center px-4"
        >
          <p className="text-lg font-lora">
            {activeAttendee.benefits[currentIndex]}
          </p>
        </motion.div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handlePrev}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex space-x-2">
          {activeAttendee.benefits.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex(index);
                // Resume auto-advance after 10 seconds
                setTimeout(() => setIsPaused(false), 10000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to benefit ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNext}
          className="text-white hover:bg-white/10"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CardContent;
