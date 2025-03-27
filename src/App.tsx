
import { Suspense } from "react";
import AppProviders from "./components/app/AppProviders";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * App Component - Main application container
 * 
 * Features:
 * - All providers consolidated in AppProviders
 * - Routes centralized in AppRoutes
 * - Navigation handled within AppRoutes component
 * - Simplified structure for better maintainability
 * - Added explicit error boundary and suspense at app root
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  return (
    <ErrorBoundary 
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Application Error</h2>
            <p className="mb-6">An unexpected error occurred while loading the application.</p>
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
        <AppProviders>
          <div className="flex flex-col min-h-screen">
            <AppRoutes />
            <Footer />
          </div>
        </AppProviders>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
