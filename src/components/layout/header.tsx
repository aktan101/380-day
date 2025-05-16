"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { LanguageSwitcher } from "../ui/language-switcher"
import { Menu, X } from "lucide-react"

interface HeaderProps {
    activeSection: string
    onSectionChange: (section: string) => void
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
    const { t } = useTranslation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSectionChange = (section: string) => {
        onSectionChange(section)
        setMobileMenuOpen(false)
    }

    const navItems = [
        { key: "hero", label: t("nav.home") },
        { key: "vision", label: t("nav.vision") },
        { key: "progress", label: t("nav.progress") },
        { key: "fitness", label: t("nav.fitness") },
        { key: "ideas", label: t("nav.ideas") },
    ]

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <motion.div
                        className="text-[#0abab5] font-bold text-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        380DG
                    </motion.div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <LanguageSwitcher />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 text-gray-400 hover:text-[#0abab5]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center">
                        <nav className="flex space-x-1 mr-4">
                            {navItems.map((item) => (
                                <Button
                                    key={item.key}
                                    variant="ghost"
                                    className={`text-sm relative ${
                                        activeSection === item.key ? "text-[#0abab5]" : "text-gray-400"
                                    } hover:text-[#0abab5] transition-colors`}
                                    onClick={() => handleSectionChange(item.key)}
                                >
                                    {item.label}
                                    {activeSection === item.key && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0abab5]"
                                            layoutId="activeSection"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Button>
                            ))}
                        </nav>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden bg-black/95 border-b border-[#0abab5]/20"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="flex flex-col p-4 space-y-3">
                            {navItems.map((item) => (
                                <Button
                                    key={item.key}
                                    variant="ghost"
                                    className={`justify-start ${
                                        activeSection === item.key ? "text-[#0abab5]" : "text-gray-400"
                                    } hover:text-[#0abab5]`}
                                    onClick={() => handleSectionChange(item.key)}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
