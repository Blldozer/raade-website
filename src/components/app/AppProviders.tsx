
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
 * Enhanced with React context initialization check
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Global initialization check
  useEffect(() => {
    // Explicitly set a global flag to indicate React is initialized
    if (typeof window !== 'undefined') {
      window.__REACT_INITIALIZED = true;
      console.log("AppProviders: React context initialized and ready");
    }
  }, []);
  
  // Simple log for debugging initialization
  console.log("AppProviders: Component mounted");
  
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
};

export default AppProviders;
