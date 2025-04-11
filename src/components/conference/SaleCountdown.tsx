
import { useState, useEffect, useMemo } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useCountdown } from '../countdown/useCountdown';
import { formatTimeUnit } from '../countdown/timerUtils';

/**
 * SaleCountdown Component
 * 
 * Displays a countdown timer for the conference ticket sale with a fixed end date
 * Features:
 * - Uses a fixed end date/time that doesn't reset on refresh
 * - Shows remaining time in hours, minutes, and seconds
 * - Displays "Sale ended" message when the countdown expires
 * - Shows both the countdown and a closing time message
 * - Enhanced with more prominent styling and pulsing effect
 * - Matches RAADE branding with urgent styling
 */
const SaleCountdown = () => {
  // Fixed end date: Today at 11:59 PM
  const TODAY_END_DATE = useMemo(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 0); // Set to 11:59:59 PM today
    return endDate;
  }, []);
  
  // Use our existing countdown hook to get the time remaining
  const timeLeft = useCountdown(TODAY_END_DATE);
  
  // Show different states based on whether the registration has ended
  if (timeLeft.expired) {
    return (
      <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 flex items-center justify-center shadow-md">
        <AlertCircle className="h-6 w-6 mr-3 text-red-600" />
        <div className="text-red-700 font-bold text-lg">
          Registration has closed. Contact us for assistance.
        </div>
      </div>
    );
  }
  
  // Format the total remaining time in hours (including days converted to hours)
  const totalHours = timeLeft.days * 24 + timeLeft.hours;
  
  // Add animation classes based on time remaining
  const isUrgent = totalHours < 3; // Less than 3 hours remaining
  
  return (
    <div className={`bg-red-50 border-2 ${isUrgent ? 'border-red-500 animate-pulse' : 'border-red-300'} rounded-lg p-4 flex flex-col sm:flex-row items-center justify-center gap-3 shadow-md`}>
      <div className="flex items-center">
        <AlertCircle className="h-6 w-6 mr-2 text-red-600" />
        <div className="text-red-700 font-bold">
          Registration closes today at 11:59 PM CST!
        </div>
      </div>
      
      <div className="flex items-center">
        <Clock className="h-6 w-6 mr-2 text-red-600" />
        <div className="text-red-700 font-bold">
          Time remaining: 
          <span className={`ml-2 font-mono ${isUrgent ? 'text-lg' : ''}`}>
            {totalHours > 9 ? totalHours : `0${totalHours}`}:{formatTimeUnit(timeLeft.minutes)}:{formatTimeUnit(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleCountdown;
