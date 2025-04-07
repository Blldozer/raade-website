
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useCountdown } from '../countdown/useCountdown';
import { formatTimeUnit } from '../countdown/timerUtils';

/**
 * SaleCountdown Component
 * 
 * Displays a countdown timer for the conference ticket sale with a fixed end date
 * Sale period: April 7, 2025 4:00 PM CST to April 8, 2025 4:00 PM CST
 * Features:
 * - Uses a fixed end date/time that doesn't reset on refresh
 * - Shows remaining time in hours, minutes, and seconds
 * - Displays "Sale ended" message when the countdown expires
 * - Matches RAADE branding with red accents
 */
const SaleCountdown = () => {
  // Fixed end date: April 8, 2025, 4:00 PM CST
  const SALE_END_DATE = new Date('2025-04-08T16:00:00-05:00'); // CST is UTC-5

  // Use our existing countdown hook to get the time remaining
  const timeLeft = useCountdown(SALE_END_DATE);
  
  // Show different states based on whether the sale has ended
  if (timeLeft.expired) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 flex items-center justify-center">
        <div className="text-gray-700 font-bold">
          Sale has ended. Regular pricing now in effect.
        </div>
      </div>
    );
  }
  
  // Format the total remaining time in hours (including days converted to hours)
  const totalHours = timeLeft.days * 24 + timeLeft.hours;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-center">
      <Clock className="h-5 w-5 mr-2 text-red-600" />
      <div className="text-red-700 font-bold">
        Sale ends in: 
        <span className="ml-1 font-mono">
          {totalHours > 9 ? totalHours : `0${totalHours}`}:{formatTimeUnit(timeLeft.minutes)}:{formatTimeUnit(timeLeft.seconds)}
        </span>
        <span className="ml-2 text-xs text-red-600">(April 8, 2025, 4:00 PM CST)</span>
      </div>
    </div>
  );
};

export default SaleCountdown;
