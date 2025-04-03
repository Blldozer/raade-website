
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
  const toastId = id || `${String(title)}-${Date.now()}`;
  
  // Choose the right method based on variant
  const method = variant === "destructive" ? "error" : "default";
  
  // Use sonner's toast function with proper fallbacks
  if (typeof sonnerToast[method] === 'function') {
    return sonnerToast[method](String(title || ''), {
      id: toastId,
      description,
      // Add custom styling based on variant if needed
      style: method === "error" 
        ? { 
            backgroundColor: "var(--destructive)", 
            color: "var(--destructive-foreground)" 
          } 
        : {}
    });
  } else {
    // Fallback in case the method doesn't exist
    console.warn(`Toast variant "${method}" not supported, falling back to default`);
    return sonnerToast(String(title || ''), {
      id: toastId,
      description
    });
  }
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
