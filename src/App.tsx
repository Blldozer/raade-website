
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Uncomment original imports for full website development
import Index from "./pages/Index";
import InnovationStudios from "./pages/InnovationStudios";
import Conference from "./pages/Conference";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ProjectDetail from "./pages/ProjectDetail";
import StudentApplication from "./pages/StudentApplication";
import PartnerApplication from "./pages/PartnerApplication";

// Initialize the QueryClient
const queryClient = new QueryClient();

const NavigationWrapper = () => {
  const location = useLocation();
  // Don't show the main navigation on the About page
  if (location.pathname === '/about') return null;
  return <Navigation />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="*" element={<NavigationWrapper />} />
          </Routes>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/studios" element={<InnovationStudios />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
              <Route path="/apply/student" element={<StudentApplication />} />
              <Route path="/apply/partner" element={<PartnerApplication />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
