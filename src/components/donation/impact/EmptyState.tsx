
import React from "react";

/**
 * EmptyState Component
 * 
 * Displays a placeholder message when no donation amount is selected
 * Provides a clean, simple UI for the initial donation impact state
 */
const EmptyState = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg h-full flex items-center justify-center">
      <p className="text-gray-500 font-lora text-center">
        Select a donation amount to see your impact
      </p>
    </div>
  );
};

export default EmptyState;
