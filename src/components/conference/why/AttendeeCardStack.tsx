
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
  
  // Find the active attendee and its index
  const activeIndex = attendees.findIndex(a => a.id === activeId);
  const activeAttendee = attendees.find(a => a.id === activeId);
  
  // Get the next two attendees for background cards (cycling through the array)
  const secondAttendee = attendees[(activeIndex + 1) % attendees.length];
  const thirdAttendee = attendees[(activeIndex + 2) % attendees.length];

  // Handle tab transitions
  const handleTabTransition = (nextTabId: string) => {
    setIsTabTransitioning(true);
    setTimeout(() => {
      if (onTabChange) {
        onTabChange(nextTabId);
      }
      setIsTabTransitioning(false);
    }, 300); // Match this with the exit animation duration
  };

  // Auto-advancing functionality - runs every 8 seconds
  useEffect(() => {
    if (!activeAttendee || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        
        // If we've reached the end of benefits for this tab
        if (nextIndex >= activeAttendee.benefits.length) {
          // Move to the next tab
          const nextTabIndex = (activeIndex + 1) % attendees.length;
          handleTabTransition(attendees[nextTabIndex].id);
          return 0; // Reset index for the new tab
        }
        
        return nextIndex;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeAttendee, isPaused, activeIndex, attendees, onTabChange]);
  
  // Reset index when the active attendee changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeId]);

  // Handler for card navigation
  const handleNext = () => {
    setIsPaused(true); // Pause auto-advance when manually navigating
    
    // Check if we're at the last benefit
    if (currentIndex === activeAttendee!.benefits.length - 1) {
      // Move to the next tab
      const nextTabIndex = (activeIndex + 1) % attendees.length;
      handleTabTransition(attendees[nextTabIndex].id);
      setCurrentIndex(0); // Reset index for the new tab
    } else {
      // Just move to the next benefit in the current tab
      setCurrentIndex(prev => prev + 1);
    }
    
    // Resume auto-advance after 10 seconds of inactivity
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  const handlePrev = () => {
    setIsPaused(true); // Pause auto-advance when manually navigating
    
    // Check if we're at the first benefit
    if (currentIndex === 0) {
      // Move to the previous tab
      const prevTabIndex = (activeIndex - 1 + attendees.length) % attendees.length;
      handleTabTransition(attendees[prevTabIndex].id);
      // Set to the last benefit of the new active tab
      const prevAttendee = attendees[(activeIndex - 1 + attendees.length) % attendees.length];
      setCurrentIndex(prevAttendee.benefits.length - 1);
    } else {
      // Just move to the previous benefit in the current tab
      setCurrentIndex(prev => prev - 1);
    }
    
    // Resume auto-advance after 10 seconds of inactivity
    const timeout = setTimeout(() => setIsPaused(false), 10000);
    return () => clearTimeout(timeout);
  };

  // Tab navigation handlers
  const handleNextTab = () => {
    const nextIndex = (activeIndex + 1) % attendees.length;
    handleTabTransition(attendees[nextIndex].id);
  };

  const handlePrevTab = () => {
    const prevIndex = (activeIndex - 1 + attendees.length) % attendees.length;
    handleTabTransition(attendees[prevIndex].id);
  };

  if (!activeAttendee) return null;

  return (
    <div className="relative flex justify-center items-center h-[550px] my-8">
      {/* Tab Navigation Buttons (Outside Card) */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black z-10 rounded-full h-12 w-12 shadow-lg"
        onClick={handlePrevTab}
        disabled={isTabTransitioning}
        aria-label="Previous attendee type"
      >
        <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black z-10 rounded-full h-12 w-12 shadow-lg"
        onClick={handleNextTab}
        disabled={isTabTransitioning}
        aria-label="Next attendee type"
      >
        <ArrowRight className="w-6 h-6 stroke-[2.5]" />
      </Button>
      
      <div className="relative w-[320px]">
        {/* Progress Bar - Instagram Story style with card color */}
        <ProgressBar
          benefits={activeAttendee.benefits}
          currentIndex={currentIndex}
          isPaused={isPaused || isTabTransitioning}
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
          handleNextTab={handleNextTab}
          handlePrevTab={handlePrevTab}
          isTabTransitioning={isTabTransitioning}
        />
      </div>
    </div>
  );
};

export default AttendeeCardStack;
