
import { useEffect } from "react";
import AppProviders from "./components/app/AppProviders";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";

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
        {/* NavigationWrapper moved to AppRoutes to ensure it's within Router context */}
        <AppRoutes />
        <Footer />
      </div>
    </AppProviders>
  );
};

export default App;
