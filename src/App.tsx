
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InnovationStudios from "./pages/InnovationStudios";
import Conference from "./pages/Conference";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

// import { ParticleField } from './components/particles/ParticleField';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <div className="relative min-h-screen">
              <Navigation />
              {/* <ParticleField /> */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/studios" element={<InnovationStudios />} />
                <Route path="/conference" element={<Conference />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
