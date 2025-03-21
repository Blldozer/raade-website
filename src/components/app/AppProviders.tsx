
import { ReactNode, useEffect, createElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import TouchDebugger from "../TouchDebugger";
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

// Mobile detection with safe fallback - no hooks yet
const isMobileUserAgent = () => {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
};

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component
 * Wraps the application with all necessary providers
 * Enhanced with mobile-specific reliability improvements
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Safe effect hook with error handling
  useEffect(() => {
    try {
      console.log("AppProviders: Component mounted");
      
      // Log environment information
      console.log("App: Window dimensions", {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        isMobile: isMobileUserAgent()
      });
      
      // Disable React's console errors in production
      if (process.env.NODE_ENV === 'production') {
        const originalConsoleError = console.error;
        console.error = (...args) => {
          // Filter out React-specific development errors in production
          const errorMessage = args[0]?.toString() || '';
          if (errorMessage.includes('React will try to recreate this component tree')) {
            return;
          }
          originalConsoleError(...args);
        };
      }
      
      return () => {
        console.log("AppProviders: Component unmounting");
      };
    } catch (error) {
      console.error("Error in AppProviders useEffect:", error);
    }
  }, []);

  // Bail early if missing React
  if (typeof React === 'undefined' || !React) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold text-red-600">App Initialization Error</h2>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ErrorBoundary 
            fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
            suppressDevErrors={isDevelopment}
          >
            <ScrollToTop />
            {children}
            {/* Only load TouchDebugger in development and with desktop capability */}
            {isDevelopment && !isMobileUserAgent() && <TouchDebugger />}
          </ErrorBoundary>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
