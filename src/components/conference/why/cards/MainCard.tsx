
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  direction: number;
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
  isTabTransitioning = false,
  direction
}: MainCardProps) => {
  // Enhanced variants for more fluid 3D animations
  const cardVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      rotateY: direction * -30,
      scale: 0.85,
      y: direction * 20,
      z: -100,
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      y: 0,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.5,
        delayChildren: 0.15,
        staggerChildren: 0.1
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      rotateY: direction * 30,
      scale: 0.85,
      y: direction * -20,
      z: -100,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Floating animation for the main card
  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  // Combined animation for non-transitioning state
  const combinedAnimation = isTabTransitioning 
    ? "animate" 
    : {
        ...cardVariants.animate,
        y: floatingAnimation.y,
        transition: {
          ...cardVariants.animate.transition,
          y: floatingAnimation.transition.y
        }
      };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={activeId}
        custom={direction}
        variants={cardVariants}
        initial="initial"
        animate={combinedAnimation}
        exit="exit"
        whileHover={isTabTransitioning ? {} : "hover"}
        className="relative w-[350px] md:w-[400px] h-[500px] rounded-xl shadow-2xl overflow-hidden perspective-1000"
        style={{ 
          backgroundColor: activeAttendee.color, 
          zIndex: 3,
          transformStyle: "preserve-3d",
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
