import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";

/**
 * Custom hook to use the navigation context
 * Provides type-safe access to navigation state and actions
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
