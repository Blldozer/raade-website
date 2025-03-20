
import { useEffect } from "react";
import { toast } from "./hooks/use-toast";
import AppProviders from "./components/app/AppProviders";
import NavigationWrapper from "./components/app/NavigationWrapper";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import { initFontLoading } from "./utils/fontLoading";

/**
 * App Component - Main application container
 * 
 * Features:
 * - All providers consolidated in AppProviders
 * - Routes centralized in AppRoutes
 * - Navigation logic encapsulated in NavigationWrapper
 * - Simplified structure for better maintainability
 * - Font loading and error recovery
 * - Non-intrusive service worker update notifications
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  useEffect(() => {
    console.log("App: Component mounted");
    
    // Initialize font loading system with error recovery
    initFontLoading();
    
    // Handle service worker updates with toast notifications
    const handleServiceWorkerUpdate = (event) => {
      console.log("Service worker update detected", event.detail);
      
      // Show a non-intrusive toast notification
      toast({
        title: "Update Available",
        description: "A new version of the site is ready. Refresh to apply changes.",
        variant: "default",
        action: (
          <button 
            className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        ),
      });
    };

    // Register event listener for service worker updates
    window.addEventListener('raade:sw-update', handleServiceWorkerUpdate);
    
    // Listen for service worker controllerchange events
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed - content will update on next refresh');
      });
    }
    
    return () => {
      console.log("App: Component unmounting");
      window.removeEventListener('raade:sw-update', handleServiceWorkerUpdate);
    };
  }, []);
  
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        <NavigationWrapper />
        <AppRoutes />
        <Footer />
        <Toaster />
      </div>
    </AppProviders>
  );
};

export default App;
