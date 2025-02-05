import { jsxDEV } from "react/jsx-dev-runtime";
import { Toaster } from "@/components/ui" 
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InnovationStudios from "./pages/InnovationStudios";
import Conference from "./pages/Conference";
import About from "./pages/About";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import Navigation from "./components/Navigation";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            {!isMobile && <Navigation />}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/studios" element={<InnovationStudios />} />
                <Route path="/conference" element={<Conference />} />
              </Routes>
            </div>
            <Footer />
            {isMobile && <BottomNav />}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;