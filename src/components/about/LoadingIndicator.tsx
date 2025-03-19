
import React, { useState, useEffect } from 'react';

interface LoadingIndicatorProps {
  message: string;
}

/**
 * Loading indicator component with customizable message and fallback timeout
 * 
 * Features:
 * - Shows loading animation with custom message
 * - Updates message if loading takes too long
 * - Provides visual feedback about loading progress
 * - Fully responsive design for all devices
 */
const LoadingIndicator = ({ message }: LoadingIndicatorProps) => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);

  // Update loading time and potentially show different message if loading takes too long
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update message more quickly if loading takes too long
  useEffect(() => {
    if (loadingTime > 2) {
      setCurrentMessage("Still loading... Thank you for your patience.");
    }
    if (loadingTime > 4) {
      setCurrentMessage("Almost there! Finalizing content...");
    }
  }, [loadingTime]);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center p-8 rounded-lg">
        <div className="w-16 h-16 border-4 border-[#274675] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <div className="text-2xl font-bold text-[#274675] mb-2">{currentMessage}</div>
        {loadingTime > 1 && (
          <div className="text-sm text-[#3C403A] mt-2">
            Loading time: {loadingTime}s
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
