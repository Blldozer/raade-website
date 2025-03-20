
import { useEffect } from "react";
import AppProviders from "./components/app/AppProviders";
import NavigationWrapper from "./components/app/NavigationWrapper";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
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
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  useEffect(() => {
    console.log("App: Component mounted");
    
    // Initialize font loading system with error recovery
    initFontLoading();
    
    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed - refreshing content');
      });
    }
    
    return () => {
      console.log("App: Component unmounting");
    };
  }, []);
  
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        <NavigationWrapper />
        <AppRoutes />
        <Footer />
      </div>
    </AppProviders>
  );
};

export default App;
