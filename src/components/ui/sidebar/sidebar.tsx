import * as React from "react"
import { Sheet, SheetContent } from "../sheet"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { withRadix } from "../radix-wrapper"

// Create the sidebar context directly here to avoid circular dependencies
interface SidebarContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
  state: "expanded" | "collapsed"
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SIDEBAR_WIDTH = "280px"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = withRadix(
  ({ children, ...props }: SidebarProps) => {
    const [open, setOpen] = React.useState(props.defaultOpen ?? false)
    const [openMobile, setOpenMobile] = React.useState(false)
    const isMobile = useMobile()
    const state = open ? "expanded" : "collapsed"

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev)
      } else {
        setOpen((prev) => !prev)
      }
    }, [isMobile])

    const contextValue: SidebarContextValue = {
      open,
      setOpen,
      isMobile,
      state,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          data-sidebar="provider"
          className={cn("relative", props.className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  },
  "SidebarProvider"
)

const Sidebar = withRadix(
  ({ children, ...props }: SidebarProps) => {
    const { isMobile, open, state } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={open} onOpenChange={() => {}} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            data-state={state}
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            side="left"
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        data-sidebar="sidebar"
        data-state={state}
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground",
          props.className
        )}
        style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
        {...props}
      >
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>
    )
  },
  "Sidebar"
)

export { Sidebar, SidebarProvider } 