import * as React from "react"
import { cn } from "@/lib/utils"
import { withRadix } from "./radix-wrapper"
import { Button } from "./button"
import { Skeleton } from "./skeleton"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

const menuItemVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        active: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface MenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuItemVariants> {
  asChild?: boolean
  tooltip?: string
  children?: React.ReactElement | string | null
}

const SidebarMenuItem = withRadix(
  ({ className, variant, asChild = false, tooltip, children, ...props }: MenuItemProps) => {
    const Comp = asChild ? Slot : "div"
    
    return (
      <Comp
        className={cn(menuItemVariants({ variant }), className)}
        title={tooltip}
        {...props}
      >
        {children}
      </Comp>
    )
  },
  "SidebarMenuItem"
)

const SidebarMenuButton = withRadix(
  ({ children, ...props }: React.ComponentProps<typeof Button>) => {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="justify-start"
        {...props}
      >
        {children}
      </Button>
    )
  },
  "SidebarMenuButton"
)

const SidebarMenuAction = withRadix(
  ({ children, ...props }: React.ComponentProps<typeof Button>) => {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        {...props}
      >
        {children}
      </Button>
    )
  },
  "SidebarMenuAction"
)

const SidebarMenuBadge = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
      <span
        className={cn(
          "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground",
          props.className
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
  "SidebarMenuBadge"
)

const SidebarMenuSkeleton = withRadix(
  ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className="flex items-center gap-2 px-3 py-2" {...props}>
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    )
  },
  "SidebarMenuSkeleton"
)

const SidebarMenuSub = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex flex-col gap-1", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarMenuSub"
)

const SidebarMenuSubItem = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarMenuSubItem"
)

const SidebarMenuSubButton = withRadix(
  ({ children, ...props }: React.ComponentProps<typeof Button>) => {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="justify-start"
        {...props}
      >
        {children}
      </Button>
    )
  },
  "SidebarMenuSubButton"
)

export {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} 