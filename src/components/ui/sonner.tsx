
import { useTheme } from "next-themes"
import { Toaster as SonnerToaster, ToasterProps } from "sonner"

/**
 * Sonner Toaster Component
 * 
 * This component renders the toasts with improved handling:
 * - Deduplicates toasts automatically
 * - Respects theme from next-themes
 * - Better animation and positioning
 * - Provides rich colors for different status types
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        // Reduce duplicate toasts and prevent notification spam
        duration: 4000,
        position: "bottom-right"
      }}
      {...props}
    />
  )
}

export { Toaster }
