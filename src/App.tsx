
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

// Import main pages
import Index from "./pages/Index";
import InnovationStudios from "./pages/InnovationStudios";
import Conference from "./pages/Conference";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ProjectDetail from "./pages/ProjectDetail";
import StudentApplication from "./pages/StudentApplication";
import PartnerApplication from "./pages/PartnerApplication";
import ConferenceRegistration from "./pages/ConferenceRegistration";
import SpeakerProfile from "./pages/SpeakerProfile";

// Add TouchDebugger for development
import TouchDebugger from "./components/TouchDebugger";

// Initialize the QueryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Handle scroll restoration and navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ScrollToTop: Pathname changed to", pathname);
    
    // If no hash is present, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Handle anchor links after the page has fully loaded
    const scrollToElement = () => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        console.log("ScrollToTop: Scrolling to element", hash);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If element not found, scroll to top as fallback
        console.log("ScrollToTop: Element not found, scrolling to top");
        window.scrollTo(0, 0);
      }
    };

    // Small delay to ensure the DOM is fully loaded
    setTimeout(scrollToElement, 100);

  }, [pathname, hash, navigate]);

  return null;
};

const NavigationWrapper = () => {
  const location = useLocation();
  
  // Don't show the main navigation on the About page
  if (location.pathname === '/about') {
    // Return null so no main navigation is rendered but route still works
    return null;
  }
  
  // Check if we're on application pages that need special handling
  const isApplicationPage = 
    location.pathname === "/apply/student" || 
    location.pathname === "/apply/partner";
  
  // Force dark mode on project detail pages, but ensure proper styling for application pages
  const isProjectDetailPage = location.pathname.startsWith('/projects/');
  
  return <Navigation forceDarkMode={isProjectDetailPage} />;
};

// Fallback component for when pages are loading
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-raade-navy border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-raade-navy">Loading page...</p>
    </div>
  </div>
);

// Global error fallback component
const GlobalErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
    <div className="max-w-md text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="mb-4">We're sorry, but we couldn't load the page.</p>
      <p className="text-sm text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-raade-navy text-white px-4 py-2 rounded"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// Check if we're running in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  useEffect(() => {
    console.log("App: Component mounted");
    
    // Log environment information
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
    
    return () => {
      console.log("App: Component unmounting");
    };
  }, []);
  
  // Check if we're in development mode - only show debugger in dev
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary 
          fallback={<GlobalErrorFallback error={new Error("Application failed to render")} />}
          suppressDevErrors={isDevelopment} // Suppress dev errors in development mode
        >
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <NavigationWrapper />
              <ErrorBoundary 
                fallback={<GlobalErrorFallback error={new Error("Content failed to render")} />}
                suppressDevErrors={isDevelopment} // Suppress dev errors in development mode
              >
                <div className="flex-grow">
                  <Suspense fallback={<PageLoading />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/studios" element={<InnovationStudios />} />
                      <Route path="/conference" element={<Conference />} />
                      <Route path="/conference/register" element={<ConferenceRegistration />} />
                      <Route path="/conference/speakers/:speakerId" element={<SpeakerProfile />} />
                      <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
                      <Route path="/apply/student" element={<StudentApplication />} />
                      <Route path="/apply/partner" element={<PartnerApplication />} />
                    </Routes>
                  </Suspense>
                </div>
              </ErrorBoundary>
              <Footer />
            </div>
          </BrowserRouter>
        </ErrorBoundary>
        {isDev && <TouchDebugger />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
