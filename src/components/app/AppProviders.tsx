
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./ScrollToTop";
import { createSafeHooks } from "@/utils/reactContextSafety";

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
 * Enhanced with additional safety checks for React context availability
 * and safe hooks usage
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Get React from window if available as a fallback
  const React = (window as any).__REACT_GLOBAL_REFERENCE || window.React;
  
  // Use our safe hooks
  const { useEffect: safeUseEffect } = createSafeHooks();
  
  // Global initialization check using safe version of useEffect
  safeUseEffect(() => {
    console.log("AppProviders: Component mounted safely");
    
    // Explicitly set a global flag to indicate React is initialized
    if (typeof window !== 'undefined') {
      window.__REACT_INITIALIZED = true;
      console.log("AppProviders: React context initialized and ready");
    }
    
    // Attempt to recover from React context errors
    if ((window as any).__REACT_CONTEXT_ERROR) {
      console.log("AppProviders: Detected previous context error, attempting recovery");
      (window as any).__REACT_CONTEXT_ERROR = false;
    }
  }, []);
  
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
                {/* Wrap children directly without TooltipProvider - we'll add it later */}
                <ScrollToTop>
                  {/* Use a div for TooltipProvider to ensure it doesn't impact layout */}
                  <div className="relative">
                    <TooltipProvider>
                      {children}
                    </TooltipProvider>
                  </div>
                </ScrollToTop>
                <Toaster />
              </ErrorBoundary>
            </QueryClientProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default AppProviders;
