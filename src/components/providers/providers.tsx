"use client"

import type React from "react"

import { ThemeProvider } from "./theme-provider"
import { I18nProvider } from "./i18n-provider"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
    )
}
