
import React from "react";
import { motion } from "framer-motion";

interface BackgroundCardsProps {
  secondAttendee: {
    color: string;
  };
  thirdAttendee: {
    color: string;
  };
  isTabTransitioning: boolean;
  direction: number;
}

const BackgroundCards = ({ 
  secondAttendee, 
  thirdAttendee, 
  isTabTransitioning,
  direction
}: BackgroundCardsProps) => {
  // Enhanced parallax variants for background cards
  const secondCardVariants = {
    initial: (direction: number) => ({
      rotate: direction > 0 ? 1 : 3,
      x: direction * -10,
      opacity: 0.5,
      scale: 0.95
    }),
    animate: {
      rotate: 2,
      x: -3,
      opacity: 0.6,
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    },
    exit: (direction: number) => ({
      rotate: direction > 0 ? 3 : 1,
      x: direction * 10,
      opacity: 0.4,
      scale: 0.92,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
      }
    })
  };

  const thirdCardVariants = {
    initial: (direction: number) => ({
      rotate: direction > 0 ? 3 : 5,
      x: direction * -15,
      opacity: 0.3,
      scale: 0.9
    }),
    animate: {
      rotate: 4,
      x: -6,
      opacity: 0.4,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: 0.2
      }
    },
    exit: (direction: number) => ({
      rotate: direction > 0 ? 5 : 3,
      x: direction * 15,
      opacity: 0.2,
      scale: 0.88,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      }
    })
  };

  // Enhanced floating animations
  const secondCardFloat = {
    y: [0, -4, 0],
    x: [-3, -5, -3],
    transition: {
      y: {
        repeat: Infinity,
        duration: 3.5,
        ease: "easeInOut",
        repeatType: "reverse"
      },
      x: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  const thirdCardFloat = {
    y: [0, -6, 0],
    x: [-6, -9, -6],
    transition: {
      y: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
        repeatType: "reverse"
      },
      x: {
        repeat: Infinity,
        duration: 4.5,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  return (
    <>
      {/* Third Card (back) */}
      <motion.div
        className="absolute top-4 -right-6 w-[320px] h-[500px] rounded-xl shadow-lg"
        style={{ 
          backgroundColor: thirdAttendee.color,
          zIndex: 1,
          transformStyle: "preserve-3d",
        }}
        initial="initial"
        animate={isTabTransitioning ? "animate" : { ...thirdCardVariants.animate, ...thirdCardFloat }}
        exit="exit"
        variants={thirdCardVariants}
        custom={direction}
      />
      
      {/* Second Card (middle) */}
      <motion.div
        className="absolute top-2 -right-3 w-[320px] h-[500px] rounded-xl shadow-xl"
        style={{ 
          backgroundColor: secondAttendee.color,
          zIndex: 2,
          transformStyle: "preserve-3d",
        }}
        initial="initial"
        animate={isTabTransitioning ? "animate" : { ...secondCardVariants.animate, ...secondCardFloat }}
        exit="exit"
        variants={secondCardVariants}
        custom={direction}
      />
    </>
  );
};

export default BackgroundCards;
