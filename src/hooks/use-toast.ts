
// This file properly exports the toast functionality from the UI components
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastAction,
  ToastClose,
  // Don't import ToastProps to avoid conflict
} from "@/components/ui/toast";

import {
  useToast as useToastHook,
  type ToasterToast,
} from "@/components/ui/use-toast";

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
 * @param props - Toast configuration including title, description, and variant
 * @returns Object with toast id, dismiss and update methods
 */
const toast = (props: ToastProps) => {
  const { toast } = useToastHook();
  return toast(props);
};

// Re-export with a clean API
export { toast, useToastHook as useToast };
