
// Import the toast functionality from sonner
import { toast as sonnerToast, Toaster } from "sonner";

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
  id?: string;
};

/**
 * Toast API for showing notifications
 * 
 * This implementation uses sonner under the hood while maintaining
 * the same API that components expect. It adds deduplication based on ID
 * to prevent duplicate notifications.
 * 
 * @param props - Toast configuration including title, description, and variant
 * @returns Object with toast id, dismiss and update methods
 */
const toast = (props: ToastProps) => {
  const { title, description, variant, id } = props;
  
  // Create a unique ID for the toast if one isn't provided
  const toastId = id || `${title}-${Date.now()}`;
  
  // Map our variant to sonner's equivalent
  const variantType = variant === "destructive" ? "error" : "default";
  
  // Use sonner's toast function with built-in deduplication
  return sonnerToast[variantType](title as string, {
    id: toastId, // Use consistent ID for deduplication
    description,
    // Add custom styling based on variant
    style: variantType === "error" 
      ? { 
          backgroundColor: "var(--destructive)", 
          color: "var(--destructive-foreground)" 
        } 
      : {}
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
export { toast, useToast, Toaster };
