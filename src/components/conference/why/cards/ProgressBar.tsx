
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
      {benefits.map((_, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        
        return (
          <div 
            key={index} 
            className="h-1.5 rounded-full flex-grow relative overflow-hidden bg-gray-300/30"
          >
            <motion.div 
              className="absolute top-0 left-0 bottom-0 rounded-full"
              style={{ 
                backgroundColor: activeAttendeeColor,
                boxShadow: isActive ? `0 0 8px 1px ${activeAttendeeColor}` : 'none'
              }}
              initial={{ width: isCompleted ? "100%" : "0%" }}
              animate={{ 
                width: isCompleted ? "100%" : 
                        isActive ? (isPaused ? "50%" : "100%") : "0%",
                opacity: isActive ? 1 : 0.8
              }}
              transition={{ 
                width: {
                  duration: isActive && !isPaused ? 8 : 0.3,
                  ease: "linear"
                }
              }}
            />
            
            {/* Pulse effect when segment becomes active */}
            {isActive && (
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-full rounded-full"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.2, 1], 
                  opacity: [0.8, 0.2, 0] 
                }}
                transition={{ 
                  duration: 0.8,
                  times: [0, 0.5, 1],
                  ease: "easeOut"
                }}
                style={{ backgroundColor: activeAttendeeColor }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
