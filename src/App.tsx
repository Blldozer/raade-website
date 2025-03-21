
import { useEffect } from "react";
import AppProviders from "./components/app/AppProviders";
import NavigationWrapper from "./components/app/NavigationWrapper";
import AppRoutes from "./components/app/AppRoutes";
import Footer from "./components/Footer";

/**
 * App Component - Main application container
 * 
 * Features:
 * - All providers consolidated in AppProviders
 * - Routes centralized in AppRoutes
 * - Navigation logic encapsulated in NavigationWrapper
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
        <NavigationWrapper />
        <AppRoutes />
        <Footer />
      </div>
    </AppProviders>
  );
};

export default App;
