
// This is a re-export file to maintain compatibility
import {
  toast,
  type ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

// Re-export with the same name for backwards compatibility
export const useToast = useToastOriginal;

export type { ToastProps, ToastActionElement };
export { toast };
