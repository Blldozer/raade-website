
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NavigationProvider } from '@/components/navigation/context/NavigationContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      networkMode: 'always',
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * AppProviders Component
 * 
 * Wraps the application with all necessary context providers:
 * - QueryClientProvider for data fetching
 * - ThemeProvider for dark/light mode
 * - Toaster for notifications
 * - NavigationProvider for consistent navigation state
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <ThemeProvider defaultTheme="light" storageKey="raade-theme-preference">
          {children}
          <Toaster />
        </ThemeProvider>
      </NavigationProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
