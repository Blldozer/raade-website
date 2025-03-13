
import React from 'react';
import AboutNav from '../navigation/AboutNav';
import AboutHero from './AboutHero';

/**
 * Error boundary fallback component 
 * Provides graceful degradation when errors occur
 */
const ErrorBoundaryFallback = () => {
  return (
    <div className="bg-white">
      <AboutNav />
      <AboutHero />
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">We're experiencing some technical difficulties</h2>
        <p>Please try refreshing the page or visit again later.</p>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
