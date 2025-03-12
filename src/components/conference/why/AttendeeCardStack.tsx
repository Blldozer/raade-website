import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "./cards/ProgressBar";
import BackgroundCards from "./cards/BackgroundCards";
import MainCard from "./cards/MainCard";

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
  onTabChange?: (tabId: string) => void;
}

const AttendeeCardStack = ({ attendees, activeId, onTabChange }: AttendeeCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  const activeIndex = attendees.findIndex(a => a.id === activeId);
  const activeAttendee = attendees.find(a => a.id === activeId);
  
  const secondAttendee = attendees[(activeIndex + 1) % attendees.length];
  const thirdAttendee = attendees[(activeIndex + 2) % attendees.length];

  const handleTabTransition = (nextTabId: string, transitionDirection: number) => {
    setDirection(transitionDirection);
    setIsTabTransitioning(true);
    setTimeout(() => {
      if (onTabChange) {
        onTabChange(nextTabId);
      }
      setTimeout(() => {
        setIsTabTransitioning(false);
      }, 100); // Small delay to ensure animations complete smoothly
    }, 400); // Match this with the exit animation duration
  };

  useEffect(() => {
    if (!activeAttendee || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        
        if (nextIndex >= activeAttendee.benefits.length) {
          const nextTabIndex = (activeIndex + 1) % attendees.length;
          handleTabTransition(attendees[nextTabIndex].id, 1);
          return 0;
        }
        
        return nextIndex;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeAttendee, isPaused, activeIndex, attendees, onTabChange]);
  
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeId]);

  const handleNext = () => {
    setIsPaused(true);
    
    if (currentIndex === activeAttendee!.benefits.length - 1) {
      const nextTabIndex = (activeIndex + 1) % attendees.length;
      handleTabTransition(attendees[nextTabIndex].id, 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  const handlePrev = () => {
    setIsPaused(true);
    
    if (currentIndex === 0) {
      const prevTabIndex = (activeIndex - 1 + attendees.length) % attendees.length;
      handleTabTransition(attendees[prevTabIndex].id, -1);
      const prevAttendee = attendees[(activeIndex - 1 + attendees.length) % attendees.length];
      setCurrentIndex(prevAttendee.benefits.length - 1);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  const handleNextTab = () => {
    const nextIndex = (activeIndex + 1) % attendees.length;
    handleTabTransition(attendees[nextIndex].id, 1);
  };

  const handlePrevTab = () => {
    const prevIndex = (activeIndex - 1 + attendees.length) % attendees.length;
    handleTabTransition(attendees[prevIndex].id, -1);
  };

  if (!activeAttendee) return null;

  return (
    <div className="relative flex justify-center items-center h-[550px] my-12 perspective-1000">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-8 md:left-20 lg:left-32 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black z-10 rounded-full h-12 w-12 shadow-lg transition-transform hover:scale-110 active:scale-95"
        onClick={handlePrevTab}
        disabled={isTabTransitioning}
        aria-label="Previous attendee type"
      >
        <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-8 md:right-20 lg:right-32 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black z-10 rounded-full h-12 w-12 shadow-lg transition-transform hover:scale-110 active:scale-95"
        onClick={handleNextTab}
        disabled={isTabTransitioning}
        aria-label="Next attendee type"
      >
        <ArrowRight className="w-6 h-6 stroke-[2.5]" />
      </Button>
      
      <div className="relative w-[350px] md:w-[400px]">
        <ProgressBar
          benefits={activeAttendee.benefits}
          currentIndex={currentIndex}
          isPaused={isPaused || isTabTransitioning}
          setCurrentIndex={setCurrentIndex}
          setIsPaused={setIsPaused}
          activeAttendeeColor={activeAttendee.color}
        />
        
        <BackgroundCards 
          secondAttendee={secondAttendee}
          thirdAttendee={thirdAttendee}
          isTabTransitioning={isTabTransitioning}
          direction={direction}
        />
        
        <MainCard
          activeId={activeId}
          activeAttendee={activeAttendee}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsPaused={setIsPaused}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleNextTab={handleNextTab}
          handlePrevTab={handlePrevTab}
          isTabTransitioning={isTabTransitioning}
          direction={direction}
        />
      </div>
    </div>
  );
};

export default AttendeeCardStack;
