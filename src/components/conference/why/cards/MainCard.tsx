
import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import CardContent from "./CardContent";

interface MainCardProps {
  activeId: string;
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
  handleNextTab?: () => void;
  handlePrevTab?: () => void;
}

const MainCard = ({
  activeId,
  activeAttendee,
  currentIndex,
  setCurrentIndex,
  setIsPaused,
  handleNext,
  handlePrev,
  handleNextTab,
  handlePrevTab
}: MainCardProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeId}
        initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          rotateY: 0, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          } 
        }}
        exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
        className="relative w-[320px] h-[500px] rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: activeAttendee.color, zIndex: 3 }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        <CardContent 
          activeAttendee={activeAttendee}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsPaused={setIsPaused}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default MainCard;
