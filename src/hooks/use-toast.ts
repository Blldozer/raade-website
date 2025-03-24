
// Import the toast functionality from sonner
import { toast as sonnerToast } from "sonner";

/**
 * Extended toast props interface that includes description property
 * This ensures TypeScript compatibility with how we're using toasts throughout the app
 */
export interface ToastActionElement extends React.ReactElement {}

// Define our own ToastProps instead of importing it
export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

/**
 * Toast API for showing notifications
 * 
 * This implementation uses sonner under the hood while maintaining
 * the same API that components expect
 * 
 * @param props - Toast configuration including title, description, and variant
 * @returns Object with toast id, dismiss and update methods
 */
const toast = (props: ToastProps) => {
  const { title, description, variant } = props;
  
  // Map our variant to sonner's type
  const type = variant === "destructive" ? "error" : "default";
  
  // Use sonner's toast function
  return sonnerToast(title as string, {
    description,
    type,
  });
};

/**
 * Hook to access toast functionality in components
 * This acts as a compatibility layer to allow existing code to work
 * without major changes while using sonner under the hood
 */
const useToast = () => {
  return {
    toast,
    // Dummy values for compatibility, not used with sonner
    toasts: [],
    dismiss: () => {},
  };
};

// Re-export with a clean API
export { toast, useToast };
