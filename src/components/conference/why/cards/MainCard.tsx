
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
  isTabTransitioning?: boolean;
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
  handlePrevTab,
  isTabTransitioning = false
}: MainCardProps) => {
  // Enhanced variants for more fluid animations
  const cardVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      rotateY: direction * -15,
      scale: 0.95,
      y: direction * 10,
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.4
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      rotateY: direction * 15,
      scale: 0.95,
      y: direction * -10,
      transition: {
        duration: 0.3
      }
    })
  };

  // Determine direction based on tab change
  const direction = 1; // Default direction is forward

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={activeId}
        custom={direction}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-[320px] h-[500px] rounded-xl shadow-2xl overflow-hidden"
        style={{ 
          backgroundColor: activeAttendee.color, 
          zIndex: 3,
          pointerEvents: isTabTransitioning ? 'none' : 'auto' 
        }}
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
