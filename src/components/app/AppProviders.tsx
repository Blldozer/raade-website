
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import { ThemeProvider } from "next-themes";

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
 * 4. Error handling and UI components
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  // Log that we've mounted the component
  console.log("AppProviders: Component mounted");
  
  // We removed useEffect that was causing the error and using simple console log
  // Logging environment information for debugging without useEffect
  if (typeof window !== 'undefined') {
    console.log("App: Window dimensions", {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio
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
  }

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary 
            fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
            suppressDevErrors={isDevelopment}
          >
            {children}
            <Toaster />
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
