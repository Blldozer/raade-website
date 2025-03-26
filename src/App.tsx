
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
  
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        {/* Use TooltipProvider here for proper React context access */}
        <TooltipProvider>
          <AppRoutes />
          <Footer />
        </TooltipProvider>
      </div>
    </AppProviders>
  );
};

export default App;
