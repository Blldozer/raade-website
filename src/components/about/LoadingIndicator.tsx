
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

/**
 * Loading indicator component with customizable message
 * Provides consistent loading visualization across the application
 */
const LoadingIndicator = ({ message }: LoadingIndicatorProps) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#274675] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <div className="text-2xl font-bold text-[#274675]">{message}</div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
