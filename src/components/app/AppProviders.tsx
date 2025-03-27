
import { ReactNode } from "react";
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
 * 3. ScrollToTop - Manages scroll position when routes change
 * 4. ThemeProvider - Makes theme available to all components including Toasters
 * 5. QueryClientProvider - Makes React Query available
 * 6. Inner ErrorBoundary - Provides error protection for all app components
 * 7. TooltipProvider - Makes tooltip context available to all components
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Simple log for debugging initialization
  console.log("AppProviders: Component mounted");
  
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div className="p-4 text-red-500">Router error occurred. Please refresh the page.</div>}>
        <ScrollToTop>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary 
                fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
                suppressDevErrors={isDevelopment}
              >
                {/* TooltipProvider moved inside ErrorBoundary but before children */}
                <TooltipProvider>
                  {children}
                </TooltipProvider>
                <Toaster />
              </ErrorBoundary>
            </QueryClientProvider>
          </ThemeProvider>
        </ScrollToTop>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppProviders;
