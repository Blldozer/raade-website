
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * SaleCountdown Component
 * 
 * Displays a 24-hour countdown timer for the conference ticket sale
 * Can be placed on various pages to remind users of the limited-time offer
 */
const SaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  // Set up the countdown timer
  useEffect(() => {
    // For a real implementation, you'd set an end date/time
    // For demo purposes we'll just start a 24-hour countdown
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    const updateTimer = () => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Sale has ended
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };
    
    // Initial update
    updateTimer();
    
    // Set interval to update every second
    const timer = setInterval(updateTimer, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-center">
      <Clock className="h-5 w-5 mr-2 text-red-600" />
      <div className="text-red-700 font-bold">
        Sale ends in: 
        <span className="ml-1 font-mono">
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
};

export default SaleCountdown;
