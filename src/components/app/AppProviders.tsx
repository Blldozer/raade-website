
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

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
 * 2. ThemeProvider - Makes theme available to all components including Toasters
 * 3. QueryClientProvider - Makes React Query available
 * 4. TooltipProvider - Makes tooltip context available to all components
 * 5. Error handling and UI components
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Log that we've mounted the component
  console.log("AppProviders: Component mounted");
  
  // Important: Using explicit render tree structure with no hooks outside of React components
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ErrorBoundary 
              fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
              suppressDevErrors={isDevelopment}
            >
              {children}
              <Toaster />
            </ErrorBoundary>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
