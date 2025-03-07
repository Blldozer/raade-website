
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  benefits: string[];
  currentIndex: number;
  isPaused: boolean;
  setCurrentIndex: (index: number) => void;
  setIsPaused: (paused: boolean) => void;
  activeAttendeeColor: string;
}

const ProgressBar = ({
  benefits,
  currentIndex,
  isPaused,
  setCurrentIndex,
  setIsPaused,
  activeAttendeeColor,
}: ProgressBarProps) => {
  return (
    <div className="absolute top-[-15px] left-0 w-full z-10 flex space-x-1">
      {benefits.map((_, index) => (
        <div 
          key={index} 
          className="h-1.5 rounded-full flex-grow relative overflow-hidden bg-gray-300/30"
        >
          <motion.div 
            className="absolute top-0 left-0 bottom-0 rounded-full"
            style={{ backgroundColor: activeAttendeeColor }}
            initial={{ width: index < currentIndex ? "100%" : "0%" }}
            animate={{ 
              width: index < currentIndex ? "100%" : 
                      index === currentIndex ? (isPaused ? "50%" : "100%") : "0%" 
            }}
            transition={{ 
              duration: index === currentIndex && !isPaused ? 8 : 0.3,
              ease: "linear"
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
