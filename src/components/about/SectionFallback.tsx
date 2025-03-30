
import React from 'react';

interface SectionFallbackProps {
  sectionName: string;
}

/**
 * Fallback component for lazy-loaded sections
 * Displays while the section is being loaded
 */
const SectionFallback = ({ sectionName }: SectionFallbackProps) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-white p-6">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#3C403A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-lg font-lora text-[#3C403A]">Loading {sectionName}...</div>
      </div>
    </div>
  );
};

export default SectionFallback;
