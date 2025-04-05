import * as React from 'react';

/**
 * Fallback component for when pages are loading
 * Displays a centered loading spinner with a message
 */
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-raade-navy border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-raade-navy">Loading page...</p>
    </div>
  </div>
);

export default PageLoading;
