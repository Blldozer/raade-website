import * as React from "react"
import { cn } from "@/lib/utils"
import { withRadix } from "../radix-wrapper"
import { Button } from "../button"
import { Skeleton } from "../skeleton"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { useSidebar } from "./sidebar"

// Define the menu item variants
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Sidebar Menu
const SidebarMenu = withRadix(
  React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
  >(({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )),
  "SidebarMenu"
)

// Sidebar Menu Item
const SidebarMenuItem = withRadix(
  React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
  >(({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )),
  "SidebarMenuItem"
)

// Interface for Sidebar Menu Button props
interface SidebarMenuButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
  children?: React.ReactNode
}

// Sidebar Menu Button with tooltip as title attribute
const SidebarMenuButton = withRadix(
  React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
    (
      {
        asChild = false,
        isActive = false,
        variant = "default",
        size = "default",
        tooltip,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const { state } = useSidebar()
      const showTooltip = state === "collapsed" && tooltip;
      
      // Handle the case where asChild is true (using Slot)
      if (asChild) {
        return (
          <button
            ref={ref}
            type="button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            title={showTooltip ? tooltip : undefined}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...props}
          >
            <Slot>{children}</Slot>
          </button>
        )
      }
      
      // Regular button case
      return (
        <button
          ref={ref}
          type="button"
          data-sidebar="menu-button"
          data-size={size}
          data-active={isActive}
          title={showTooltip ? tooltip : undefined}
          className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </button>
      )
    }
  ),
  "SidebarMenuButton"
)

// Interface for Sidebar Menu Action props
interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  showOnHover?: boolean
  children?: React.ReactNode
}

// Sidebar Menu Action with fixed Slot typing
const SidebarMenuAction = withRadix(
  React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
    ({ className, asChild = false, showOnHover = false, children, ...props }, ref) => {
      if (asChild) {
        return (
          <button
            ref={ref}
            type="button"
            data-sidebar="menu-action"
            className={cn(
              "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
              "after:absolute after:-inset-2 after:md:hidden",
              "peer-data-[size=sm]/menu-button:top-1",
              "peer-data-[size=default]/menu-button:top-1.5",
              "peer-data-[size=lg]/menu-button:top-2.5",
              "group-data-[collapsible=icon]:hidden",
              showOnHover &&
                "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
              className
            )}
            {...props}
          >
            <Slot>{children}</Slot>
          </button>
        )
      }

      return (
        <button
          ref={ref}
          type="button"
          data-sidebar="menu-action"
          className={cn(
            "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
            "after:absolute after:-inset-2 after:md:hidden",
            "peer-data-[size=sm]/menu-button:top-1",
            "peer-data-[size=default]/menu-button:top-1.5",
            "peer-data-[size=lg]/menu-button:top-2.5",
            "group-data-[collapsible=icon]:hidden",
            showOnHover &&
              "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )
    }
  ),
  "SidebarMenuAction"
)

// Sidebar Menu Badge
const SidebarMenuBadge = withRadix(
  React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
  >(({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )),
  "SidebarMenuBadge"
)

// Interface for Sidebar Menu Skeleton props
interface SidebarMenuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean
}

// Sidebar Menu Skeleton
const SidebarMenuSkeleton = withRadix(
  React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
    ({ className, showIcon = false, ...props }, ref) => {
      // Random width between 50 to 90%.
      const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`
      }, [])

      return (
        <div
          ref={ref}
          data-sidebar="menu-skeleton"
          className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
          {...props}
        >
          {showIcon && (
            <Skeleton
              className="size-4 rounded-md"
              data-sidebar="menu-skeleton-icon"
            />
          )}
          <Skeleton
            className="h-4 flex-1 max-w-[--skeleton-width]"
            data-sidebar="menu-skeleton-text"
            style={
              {
                "--skeleton-width": width,
              } as React.CSSProperties
            }
          />
        </div>
      )
    }
  ),
  "SidebarMenuSkeleton"
)

// Sidebar Menu Sub
const SidebarMenuSub = withRadix(
  React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
  >(({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )),
  "SidebarMenuSub"
)

// Sidebar Menu Sub Item
const SidebarMenuSubItem = withRadix(
  React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
  >(({ ...props }, ref) => <li ref={ref} {...props} />),
  "SidebarMenuSubItem"
)

// Interface for Sidebar Menu Sub Button props
interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
  children?: React.ReactNode
}

// Sidebar Menu Sub Button with fixed Slot typing
const SidebarMenuSubButton = withRadix(
  React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
    ({ asChild = false, size = "md", isActive, className, children, ...props }, ref) => {
      if (asChild) {
        return (
          <a
            ref={ref}
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
              "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
              "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              "group-data-[collapsible=icon]:hidden",
              className
            )}
            {...props}
          >
            <Slot>{children}</Slot>
          </a>
        )
      }

      return (
        <a
          ref={ref}
          data-sidebar="menu-sub-button"
          data-size={size}
          data-active={isActive}
          className={cn(
            "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            "group-data-[collapsible=icon]:hidden",
            className
          )}
          {...props}
        >
          {children}
        </a>
      )
    }
  ),
  "SidebarMenuSubButton"
)

export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} 