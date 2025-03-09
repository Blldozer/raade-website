
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
  // Staggered animation variants for card content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-full p-6 text-white flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative Sparkle */}
      <motion.div
        className="absolute top-4 right-4 text-yellow-300/70"
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
      >
        <Sparkles size={16} />
      </motion.div>
      
      {/* Corner Brackets */}
      <motion.div variants={itemVariants} className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"></motion.div>
      <motion.div variants={itemVariants} className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40"></motion.div>
      <motion.div variants={itemVariants} className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40"></motion.div>
      <motion.div variants={itemVariants} className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"></motion.div>
      
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <Badge className="bg-white/20 text-white mb-2 backdrop-blur-sm">
          {activeAttendee.subtitle}
        </Badge>
        <h3 className="text-2xl font-bold font-simula">{activeAttendee.title}</h3>
      </motion.div>
      
      {/* Benefit Content with Animation */}
      <div className="flex-grow flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center px-4"
          >
            <p className="text-lg font-lora">
              {activeAttendee.benefits[currentIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mt-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handlePrev}
          className="text-white hover:bg-white/10 transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex space-x-2">
          {activeAttendee.benefits.map((_, index) => (
            <motion.button
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
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentIndex ? {
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity, repeatDelay: 2 }
              } : {}}
              aria-label={`Go to benefit ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNext}
          className="text-white hover:bg-white/10 transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CardContent;
