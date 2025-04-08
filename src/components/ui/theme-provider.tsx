
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider Component
 * 
 * Wraps the application with theme support, enabling dark/light mode functionality.
 * Leverages next-themes for consistent theme handling across the application.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
