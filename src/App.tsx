
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";

// Original imports (uncommented to continue development)
import Index from "./pages/Index";
import InnovationStudios from "./pages/InnovationStudios";
import Conference from "./pages/Conference";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

// Initialize the QueryClient
const queryClient = new QueryClient();

// A wrapper component to decide what to show based on URL params
const AppContent = () => {
  const location = useLocation();
  const showDev = new URLSearchParams(location.search).get('dev') === 'true';
  
  // For the Navigation component - show it only on dev mode and not on the About page
  const shouldShowNavigation = () => {
    if (!showDev) return false;
    return location.pathname !== '/about';
  };

  if (!showDev) {
    // Show coming soon page for regular visitors
    return (
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </div>
    );
  }

  // Show development site when ?dev=true is in the URL
  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavigation() && <Navigation />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/studios" element={<InnovationStudios />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
