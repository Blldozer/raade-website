
import React from 'react';

/**
 * Section loading fallback component - displays while section is loading
 * Provides visual feedback during lazy loading
 */
const SectionLoadingFallback = () => (
  <div className="h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-[#274675] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-lg text-[#274675]">Loading section...</div>
    </div>
  </div>
);

export default SectionLoadingFallback;
