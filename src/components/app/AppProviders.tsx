
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

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
 * Enhanced with React initialization safety checks to prevent runtime errors
 */
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  // Safety check for React and React.createElement availability
  // This prevents the "Cannot read properties of null (reading 'useEffect')" error
  if (typeof React !== 'object' || React === null || typeof React.createElement !== 'function') {
    console.error("AppProviders: React not properly initialized");
    
    // Provide a minimal fallback rendering without hooks
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">Application Error</h2>
          <p className="mt-2">Failed to initialize application providers.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#274675] text-white rounded hover:bg-opacity-90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
  
  // Initialize window React flag to help other components detect React availability
  if (typeof window !== 'undefined') {
    window.__REACT_INITIALIZED = true;
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
