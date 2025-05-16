"use client"

import { useTranslation } from "react-i18next"
import { Button } from "./button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        localStorage.setItem("i18nextLng", lng)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0abab5] transition-colors">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border-[#0abab5]/30 text-white">
                <DropdownMenuItem
                    onClick={() => changeLanguage("en")}
                    className={`${i18n.language === "en" ? "text-[#0abab5]" : "text-white"} hover:text-[#0abab5] cursor-pointer`}
                >
                    {i18n.language === "en" && (
                        <motion.span
                            className="absolute left-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            •
                        </motion.span>
                    )}
                    <span className="ml-4">English</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage("ru")}
                    className={`${i18n.language === "ru" ? "text-[#0abab5]" : "text-white"} hover:text-[#0abab5] cursor-pointer`}
                >
                    {i18n.language === "ru" && (
                        <motion.span
                            className="absolute left-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            •
                        </motion.span>
                    )}
                    <span className="ml-4">Русский</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
