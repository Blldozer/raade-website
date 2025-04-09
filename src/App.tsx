
import { Suspense, useEffect } from "react";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { initializeContentsquare } from "./config/analytics-config";
import { ThemeProvider } from "@/components/theme-provider";
import { initializeAnimationContext } from "./utils/animationInitializer";

/**
 * App Component - Main application container
 * 
 * Features:
 * - Routes centralized in AppRoutes
 * - Navigation handled within AppRoutes component
 * - Simplified structure for better maintainability
 * - Added explicit error boundary and suspense at app root
 * - Analytics tracking for UX insights (Contentsquare)
 * - Theme provider for light/dark mode support
 * - Animation context initialization for framer-motion and GSAP
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  // Initialize analytics tracking and animation context
  useEffect(() => {
    // Initialize animation context for proper React integration
    initializeAnimationContext();
    
    // Only initialize analytics in production to avoid tracking during development
    if (process.env.NODE_ENV === 'production') {
      initializeContentsquare();
      console.log("Analytics: Contentsquare initialized");
    }
  }, []);
  
  return (
    <ThemeProvider defaultTheme="light">
      <ErrorBoundary 
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Application Error</h2>
              <p className="mb-6 dark:text-gray-300">An unexpected error occurred while loading the application.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-[#274675] text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Refresh Page
              </button>
            </div>
          </div>
        }
      >
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#274675]"></div>
            </div>
          }
        >
          <div className="flex flex-col min-h-screen">
            <AppRoutes />
            <Footer />
          </div>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
