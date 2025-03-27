
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./ScrollToTop";

// Initialize the QueryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Check if we're running in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component
 * Wraps the application with all necessary providers
 * 
 * Provider order matters! React context is accessed from inner components outward.
 * The hierarchy is structured to ensure dependencies are available when needed:
 * 1. BrowserRouter - Makes routing available to all components
 * 2. ErrorBoundary - First layer of protection for router-related errors
 * 3. ThemeProvider - Makes theme available to all components including Toasters
 * 4. QueryClientProvider - Makes React Query available
 * 5. Inner ErrorBoundary - Provides error protection for all app components
 * 6. TooltipProvider - Makes tooltip context available to all components
 * 7. ScrollToTop - Manages scroll position when routes change
 * 
 * Enhanced with React context initialization check and error recovery
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Safety check - ensure we're in a browser environment before using hooks
  if (typeof window === 'undefined') {
    console.warn("AppProviders: Not in browser environment, skipping initialization");
    return <>{children}</>;
  }

  // Safety check - ensure React hooks are available
  if (typeof useEffect !== 'function') {
    console.error("AppProviders: React hooks not available");
    
    // Return minimal app structure with error message
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded m-4">
        <h2 className="text-xl font-bold mb-2">React Initialization Error</h2>
        <p>The application failed to initialize properly. Please try refreshing the page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  // Set initialization flag immediately on component mount
  // This is crucial for preventing React context errors
  window.__REACT_INITIALIZED = true;
  
  try {
    // Safe to use useEffect here after the safety checks
    useEffect(() => {
      console.log("AppProviders: React context initialized and ready");
      
      // Attempt to recover from React context errors
      if (window.__REACT_CONTEXT_ERROR) {
        console.log("AppProviders: Detected previous context error, attempting recovery");
        window.__REACT_CONTEXT_ERROR = false;
      }
      
      return () => {
        // Clean up when unmounting
        if (typeof window !== 'undefined') {
          console.log("AppProviders: Cleaning up before unmounting");
        }
      };
    }, []);
    
    // Simple log for debugging initialization
    console.log("AppProviders: Component mounted");
    
    // Use multiple nested ErrorBoundaries for better error isolation
    return (
      <ErrorBoundary 
        fallback={<div className="p-4 text-red-500">Root error occurred. Please refresh the page.</div>}
      >
        <BrowserRouter>
          <ErrorBoundary 
            fallback={<div className="p-4 text-red-500">Router error occurred. Please refresh the page.</div>}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <QueryClientProvider client={queryClient}>
                <ErrorBoundary 
                  fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
                  suppressDevErrors={isDevelopment}
                >
                  {/* TooltipProvider moved inside ErrorBoundary but before ScrollToTop */}
                  <TooltipProvider>
                    <ScrollToTop>
                      {children}
                    </ScrollToTop>
                  </TooltipProvider>
                  <Toaster />
                </ErrorBoundary>
              </QueryClientProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </ErrorBoundary>
    );
  } catch (error) {
    // Fallback rendering if any error occurs during hook initialization
    console.error("AppProviders: Critical error during initialization:", error);
    return (
      <div className="p-4 text-red-500">
        Application initialization error. Please refresh the page.
      </div>
    );
  }
};

export default AppProviders;
