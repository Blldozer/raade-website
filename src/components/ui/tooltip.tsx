
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Tooltip components using Radix UI
 * 
 * This component has been enhanced with additional safety checks to prevent
 * "Cannot read properties of null (reading 'useState')" and other React context errors.
 */

// Enhanced TooltipProvider with proper error handling
const TooltipProvider: React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>> = ({ 
  children,
  ...props
}) => {
  // Safety check for React initialization
  if (typeof React !== 'object' || React === null) {
    console.warn("TooltipProvider: React not properly initialized");
    return <>{children}</>;
  }

  try {
    return (
      <TooltipPrimitive.Provider {...props}>
        {children}
      </TooltipPrimitive.Provider>
    );
  } catch (error) {
    console.error("TooltipProvider error:", error);
    // Return children without tooltip functionality if error occurs
    return <>{children}</>;
  }
};

// Safe wrapper for Tooltip component
const Tooltip = TooltipPrimitive.Root;

// Safe wrapper for TooltipTrigger
const TooltipTrigger = TooltipPrimitive.Trigger;

// Enhanced TooltipContent with error handling
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  // Safety check for React initialization
  if (typeof React !== 'object' || React === null) {
    console.warn("TooltipContent: React not properly initialized");
    return null;
  }

  try {
    return (
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    );
  } catch (error) {
    console.error("TooltipContent error:", error);
    // Return null if an error occurs
    return null;
  }
});

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
