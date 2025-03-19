
// This file properly exports the toast functionality from the UI components
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastAction,
  ToastClose,
  type ToastProps,
  type ToastActionElement,
} from "@/components/ui/toast";

import {
  useToast as useToastHook,
} from "@/components/ui/use-toast";

/**
 * Toast API for showing notifications
 * 
 * @param props - Toast configuration including title, description, and variant
 */
const toast = ({ ...props }: ToastProps) => {
  const { toast } = useToastHook();
  return toast(props);
};

// Re-export with a clean API
export { toast, useToastHook as useToast, type ToastProps, type ToastActionElement };
