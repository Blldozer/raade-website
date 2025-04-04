
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

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
 */
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  // No hooks outside of the component body
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
};

export default AppProviders;
