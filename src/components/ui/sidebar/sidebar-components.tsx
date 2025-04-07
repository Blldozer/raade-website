import * as React from "react"
import { cn } from "@/lib/utils"
import { withRadix } from "../radix-wrapper"
import { Button } from "../button"
import { Input } from "../input"
import { Separator } from "../separator"
import { PanelLeft } from "lucide-react"
import { useSidebar } from "./sidebar"

const SidebarTrigger = withRadix(
  ({ children, ...props }: React.ComponentProps<typeof Button>) => {
    const { toggleSidebar } = useSidebar()
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        {...props}
      >
        {children || <PanelLeft className="h-5 w-5" />}
      </Button>
    )
  },
  "SidebarTrigger"
)

const SidebarRail = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex h-full w-full flex-col", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarRail"
)

const SidebarInset = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex h-full w-full flex-col p-4", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarInset"
)

const SidebarInput = withRadix(
  (props: React.ComponentProps<typeof Input>) => {
    return <Input {...props} />
  },
  "SidebarInput"
)

const SidebarHeader = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex h-16 items-center px-4", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarHeader"
)

const SidebarFooter = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex h-16 items-center px-4", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarFooter"
)

const SidebarSeparator = withRadix(
  (props: React.ComponentProps<typeof Separator>) => {
    return <Separator {...props} />
  },
  "SidebarSeparator"
)

const SidebarContent = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex-1 overflow-y-auto", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarContent"
)

const SidebarGroup = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("flex flex-col gap-2", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarGroup"
)

const SidebarGroupLabel = withRadix(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn("px-4 text-sm font-medium text-muted-foreground", props.className)}
        {...props}
      >
        {children}
      </div>
    )
  },
  "SidebarGroupLabel"
)

const SidebarGroupAction = withRadix(
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
  "SidebarGroupAction"
)

const SidebarGroupContent = withRadix(
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
  "SidebarGroupContent"
)

export {
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
} 