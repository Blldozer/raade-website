
import React, { useState } from "react";
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
  
  // Find the active attendee and its index
  const activeIndex = attendees.findIndex(a => a.id === activeId);
  const activeAttendee = attendees.find(a => a.id === activeId);

  // Handler for card navigation
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAttendee!.benefits.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeAttendee!.benefits.length) % activeAttendee!.benefits.length);
  };

  if (!activeAttendee) return null;

  return (
    <div className="relative w-full h-[400px] my-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
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
          exit={{ opacity: 0, rotateY: 30, scale: 0.9 }}
          className="absolute inset-0 w-full"
        >
          {/* Main Card */}
          <div 
            className="w-full h-full rounded-xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: activeAttendee.color }}
          >
            {/* Card Content */}
            <div className="relative w-full h-full p-8 text-white flex flex-col">
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
                <h3 className="text-3xl font-bold font-simula">{activeAttendee.title}</h3>
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
                    <p className="text-xl font-lora">
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
                      onClick={() => setCurrentIndex(index)}
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
          </div>
          
          {/* Shadow Cards (Decorative) */}
          <div 
            className="absolute -z-10 w-full h-full rounded-xl shadow-xl opacity-60 top-2 -left-2 rotate-[-3deg]"
            style={{ 
              backgroundColor: attendees[(activeIndex + 1) % attendees.length].color,
              transformOrigin: "top left" 
            }}
          ></div>
          <div 
            className="absolute -z-20 w-full h-full rounded-xl shadow-xl opacity-40 top-4 -right-2 rotate-[2deg]"
            style={{ 
              backgroundColor: attendees[(activeIndex + 2) % attendees.length].color,
              transformOrigin: "top right" 
            }}
          ></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AttendeeCardStack;
