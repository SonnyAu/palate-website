"use client"

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Use React.ComponentProps to extract the props type from NextThemesProvider
type ThemeProviderProps = {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  themes?: string[]
  forcedTheme?: string
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
