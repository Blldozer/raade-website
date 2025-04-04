
import React, { useState, useEffect, useRef } from "react";
import { calculateTimeLeft } from "./timerUtils";
import { TimeLeft } from "./types";

// Re-export the TimeLeft type
export type { TimeLeft };

/**
 * Custom hook for countdown timer
 * 
 * Features:
 * - Accurate time calculation with date validation
 * - Memory leak prevention with cleanup
 * - Resilient to invalid dates
 * - Debugging information for troubleshooting
 * - Performance optimized interval handling
 * 
 * @param targetDate The future date to count down to
 * @returns Time left object with days, hours, minutes, seconds and expired flag
 */
export const useCountdown = (targetDate: Date) => {
  // Check if React is available
  if (typeof window === 'undefined' || !window.__REACT_INITIALIZED) {
    console.warn("useCountdown: React not properly initialized");
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false
    };
  }
  
  const [timeLeft, setTimeLeft] = useState(() => {
    // Initial calculation
    return calculateTimeLeft(targetDate);
  });
  
  // Keep track of the interval ID for cleanup
  const intervalRef = useRef<number | null>(null);
  
  // Track if the timer is running
  const isRunningRef = useRef(true);
  
  useEffect(() => {
    // Validate target date
    if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
      console.error("Invalid target date provided to useCountdown:", targetDate);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true
      });
      return;
    }
    
    // Initial calculation
    const initialTimeLeft = calculateTimeLeft(targetDate);
    setTimeLeft(initialTimeLeft);
    
    // Log the initial calculation for debugging
    console.log("Initial countdown calculation:", {
      targetDate: targetDate.toISOString(),
      currentDate: new Date().toISOString(),
      timeLeft: initialTimeLeft
    });
    
    // Clear any existing interval to prevent memory leaks
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    
    // If the date has already passed, don't start the interval
    if (initialTimeLeft.expired) {
      console.log("Countdown target date has already passed, not starting interval");
      return;
    }
    
    // Set up the interval for updating the countdown
    isRunningRef.current = true;
    intervalRef.current = window.setInterval(() => {
      if (!isRunningRef.current) return;
      
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
      
      // If the countdown has expired, clear the interval
      if (newTimeLeft.expired && intervalRef.current !== null) {
        console.log("Countdown expired, clearing interval");
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
    
    // Cleanup on component unmount or if targetDate changes
    return () => {
      isRunningRef.current = false;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate]); // Re-run if targetDate changes

  return timeLeft;
};
