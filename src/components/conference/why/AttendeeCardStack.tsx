
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Attendee {
  id: string;
  title: string;
  subtitle: string;
  benefits: string[];
  color: string;
}

interface AttendeeCardStackProps {
  attendees: Attendee[];
  activeId: string;
}

const AttendeeCardStack = ({ attendees, activeId }: AttendeeCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Find the active attendee and its index
  const activeIndex = attendees.findIndex(a => a.id === activeId);
  const activeAttendee = attendees.find(a => a.id === activeId);
  
  // Get the next two attendees for background cards (cycling through the array)
  const secondAttendee = attendees[(activeIndex + 1) % attendees.length];
  const thirdAttendee = attendees[(activeIndex + 2) % attendees.length];

  // Auto-advancing functionality - runs every 5 seconds
  useEffect(() => {
    if (!activeAttendee || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAttendee.benefits.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeAttendee, isPaused]);
  
  // Reset index when the active attendee changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeId]);

  // Handler for card navigation
  const handleNext = () => {
    setIsPaused(true); // Pause auto-advance when manually navigating
    setCurrentIndex((prev) => (prev + 1) % activeAttendee!.benefits.length);
    
    // Resume auto-advance after 10 seconds of inactivity
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  const handlePrev = () => {
    setIsPaused(true); // Pause auto-advance when manually navigating
    setCurrentIndex((prev) => (prev - 1 + activeAttendee!.benefits.length) % activeAttendee!.benefits.length);
    
    // Resume auto-advance after 10 seconds of inactivity
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  if (!activeAttendee) return null;

  return (
    <div className="relative flex justify-center items-center h-[550px] my-8">
      <div className="relative w-[320px]">
        {/* Progress Bar - Instagram Story style */}
        <div className="absolute top-[-15px] left-0 w-full z-10 flex space-x-1">
          {activeAttendee.benefits.map((_, index) => (
            <div 
              key={index} 
              className="h-1 rounded-full flex-grow relative overflow-hidden bg-gray-300"
            >
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-white rounded-full"
                initial={{ width: index < currentIndex ? "100%" : "0%" }}
                animate={{ 
                  width: index < currentIndex ? "100%" : 
                          index === currentIndex ? (isPaused ? "50%" : "100%") : "0%" 
                }}
                transition={{ 
                  duration: index === currentIndex && !isPaused ? 5 : 0.3,
                  ease: "linear"
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Background Cards - Third Card (back) */}
        <motion.div
          className="absolute top-4 -right-6 w-[320px] h-[500px] rounded-xl shadow-lg"
          style={{ 
            backgroundColor: thirdAttendee.color,
            zIndex: 1,
            opacity: 0.4,
            rotate: 4,
          }}
          animate={{ 
            rotate: 4,
            x: [0, 2, 0],
            transition: { 
              x: { repeat: Infinity, duration: 3, repeatType: 'reverse' } 
            }
          }}
        />
        
        {/* Background Cards - Second Card (middle) */}
        <motion.div
          className="absolute top-2 -right-3 w-[320px] h-[500px] rounded-xl shadow-xl"
          style={{ 
            backgroundColor: secondAttendee.color,
            zIndex: 2,
            opacity: 0.6,
            rotate: 2,
          }}
          animate={{ 
            rotate: 2,
            x: [0, 1, 0],
            transition: { 
              x: { repeat: Infinity, duration: 2.5, repeatType: 'reverse' } 
            }
          }}
        />
        
        {/* Main Card - Animated on tab change */}
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
            {/* Card Content */}
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
                <AnimatePresence mode="wait">
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
                </AnimatePresence>
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AttendeeCardStack;
