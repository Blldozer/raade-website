
import { useState, useEffect } from "react";
import { calculateTimeLeft } from "./timerUtils";

export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  useEffect(() => {
    // Initial calculation
    const initialTimeLeft = calculateTimeLeft(targetDate);
    setTimeLeft(initialTimeLeft);
    
    // Log the initial calculation for debugging
    console.log("Initial countdown calculation:", {
      targetDate: targetDate.toISOString(),
      currentDate: new Date().toISOString(),
      timeLeft: initialTimeLeft
    });

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
