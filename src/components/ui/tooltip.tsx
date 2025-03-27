
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { createSafeHooks } from "@/utils/reactContextSafety"

import { cn } from "@/lib/utils"

/**
 * Tooltip components using Radix UI
 * 
 * This component has been enhanced with safe hooks usage to prevent
 * "Cannot read properties of null (reading 'useState')" errors.
 * 
 * The component now uses our createSafeHooks utility to ensure React context is available
 * before attempting to use hooks.
 */

// Get safe versions of React hooks
const { useState, useEffect } = createSafeHooks();

// Create a proper React functional component to ensure hooks work correctly
const TooltipProvider: React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>> = ({ 
  children,
  ...props
}) => {
  // Safe version of React.useState
  const [mounted, setMounted] = useState(false);
  
  // Safe version of React.useEffect
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Only render the provider if we can safely use React hooks
  if (!mounted && typeof window !== 'undefined' && !(window as any).__REACT_INITIALIZED) {
    return <>{children}</>; // Return children without the provider if not mounted
  }
  
  return (
    <TooltipPrimitive.Provider {...props}>
      {children}
    </TooltipPrimitive.Provider>
  );
};

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
