
import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";

/**
 * Custom hook to access navigation context
 * 
 * Provides access to navigation state and dispatch function from anywhere in the app
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  
  return context;
};
