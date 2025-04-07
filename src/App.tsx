import React from 'react';
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { initializeContentsquare } from "./config/analytics-config";
import "./tailwind.css"; // Import processed Tailwind CSS

/**
 * App Component - Main application container
 * 
 * Features:
 * - Error boundary for the entire application
 * - Suspense for loading states
 * - Analytics initialization
 * - Main application routes
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  // Initialize analytics tracking
  React.useEffect(() => {
    // Only initialize in production to avoid tracking during development
    if (process.env.NODE_ENV === 'production') {
      initializeContentsquare();
    }
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
            <p className="mt-2 text-gray-600">We've encountered an error. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-raade-navy text-white rounded hover:bg-raade-navy-dark transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      }
    >
      <React.Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#274675]"></div>
          </div>
        }
      >
        <div className="app-container">
          <AppRoutes />
          <Footer />
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default App;
