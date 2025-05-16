"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { I18nextProvider as Provider } from "react-i18next"
import i18n from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Set default language to Russian if not already set
        if (!localStorage.getItem("i18nextLng")) {
            i18n.changeLanguage("ru")
            localStorage.setItem("i18nextLng", "ru")
        }
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return <Provider i18n={i18n}>{children}</Provider>
}
