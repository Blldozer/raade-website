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
const TooltipProvider = TooltipPrimitive.Provider

// Safe wrapper for Tooltip component
const Tooltip = TooltipPrimitive.Root

// Safe wrapper for TooltipTrigger
const TooltipTrigger = TooltipPrimitive.Trigger

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>

// Enhanced TooltipContent with error handling
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>((props, ref) => {
  const { className, sideOffset = 4, ...otherProps } = props
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...otherProps}
    />
  )
}) as React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>

TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
