
import { useEffect } from "react";
import AppProviders from "./components/app/AppProviders";
import NavigationWrapper from "./components/app/NavigationWrapper";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";

/**
 * App Component - Main application container
 * 
 * Features:
 * - Enhanced with error resilience for mobile devices
 * - Simplified initialization to avoid React hook issues
 * - All providers consolidated in AppProviders
 * - Routes centralized in AppRoutes
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  // Safe effect hook with error handling
  useEffect(() => {
    try {
      console.log("App: Component mounted");
      
      // Safe device detection
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      console.log("App: Is mobile device?", isMobile);
      
      // Set mobile class on document for CSS optimizations
      if (isMobile) {
        document.documentElement.classList.add('mobile-device');
      }
      
      return () => {
        console.log("App: Component unmounting");
        if (isMobile) {
          document.documentElement.classList.remove('mobile-device');
        }
      };
    } catch (error) {
      console.error("Error in App useEffect:", error);
    }
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
