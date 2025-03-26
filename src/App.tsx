
import { useEffect } from "react";
import AppProviders from "./components/app/AppProviders";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * App Component - Main application container
 * 
 * Features:
 * - All providers consolidated in AppProviders
 * - Routes centralized in AppRoutes
 * - Navigation handled within AppRoutes component
 * - Simplified structure for better maintainability
 */
const App = () => {
  // Add console logging to help debug startup issues
  console.log("App: Rendering");
  
  useEffect(() => {
    console.log("App: Component mounted");
    
    return () => {
      console.log("App: Component unmounting");
    };
  }, []);
  
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        {/* Use TooltipProvider here instead of in AppProviders */}
        <TooltipProvider>
          <AppRoutes />
          <Footer />
        </TooltipProvider>
      </div>
    </AppProviders>
  );
};

export default App;
