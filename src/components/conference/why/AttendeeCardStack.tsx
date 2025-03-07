
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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

  // Auto-advancing functionality - runs every 8 seconds
  useEffect(() => {
    if (!activeAttendee || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAttendee.benefits.length);
    }, 8000);
    
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
        {/* Progress Bar - Instagram Story style with card color */}
        <ProgressBar
          benefits={activeAttendee.benefits}
          currentIndex={currentIndex}
          isPaused={isPaused}
          setCurrentIndex={setCurrentIndex}
          setIsPaused={setIsPaused}
          activeAttendeeColor={activeAttendee.color}
        />
        
        {/* Background Cards */}
        <BackgroundCards 
          secondAttendee={secondAttendee}
          thirdAttendee={thirdAttendee}
        />
        
        {/* Main Card - Animated on tab change */}
        <MainCard
          activeId={activeId}
          activeAttendee={activeAttendee}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsPaused={setIsPaused}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default AttendeeCardStack;
