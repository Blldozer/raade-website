import React from "react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

// Set global flag to indicate React is initialized
if (typeof window !== 'undefined') {
  window.__REACT_INITIALIZED = true;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * App Providers Component
 * 
 * Wraps the application with necessary providers:
 * - React Query for data fetching and caching
 * - Theme provider for dark/light mode support
 * - Sonner toast provider for notifications
 * 
 * Enhanced with improved error handling for React context issues
 */
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  // Safely check if we're in a component context
  if (typeof React === 'undefined' || !React.useState) {
    console.error("AppProviders: React not properly initialized");
    // Return children without providers as fallback
    return <>{children}</>;
  }
  
  try {
    // Mark React as initialized in the window object
    if (typeof window !== 'undefined') {
      window.__REACT_INITIALIZED = true;
    }
    
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: "toast-custom-class",
              duration: 4000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("Critical error in AppProviders:", error);
    // Return children without providers as fallback in case of error
    return <>{children}</>;
  }
};

export default AppProviders;
