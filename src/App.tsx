"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Header } from "./components/layout/header"
import { Footer } from "./components/layout/footer"
import { Section } from "./components/ui/section"
import { CountdownTimer } from "./components/sections/countdown-timer"
import { VisionBoard } from "./components/sections/vision-board"
import { ProgressCalendar } from "./components/sections/progress-calendar"
import { FitnessTracker } from "./components/sections/fitness-tracker"
import { IdeasJournal } from "./components/sections/ideas-journal"

export default function App() {
    const { t } = useTranslation()
    const [activeSection, setActiveSection] = useState<string>("hero")

    useEffect(() => {
        const handleScroll = () => {
            // Update active section based on scroll position
            const sections = ["hero", "vision", "progress", "fitness", "ideas"]
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSectionChange = (section: string) => {
        setActiveSection(section)
        const element = document.getElementById(section)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-black text-white">
            <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

            {/* Hero Section */}
            <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center pt-16 relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0abab5]/10 via-transparent to-transparent opacity-30"></div>
                </div>

                <motion.div
                    className="container mx-auto px-4 py-16 z-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0abab5] to-[#81D8D0]">
              {t("hero.title")}
            </span>
                    </h1>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-12 tracking-wide">
                        <span className="text-gray-300">{t("hero.subtitle")}</span>
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <CountdownTimer targetDate="May 25, 2026" />
                    </div>

                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        onClick={() => handleSectionChange("vision")}
                    >
                        <ChevronDown className="h-8 w-8 text-[#0abab5]" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Vision Board Section */}
            <Section id="vision" title={t("vision.title")} subtitle={t("vision.subtitle")}>
                <VisionBoard />
            </Section>

            {/* Progress Calendar Section */}
            <Section id="progress" title={t("progress.title")} subtitle={t("progress.subtitle")} background="alternate">
                <ProgressCalendar />
            </Section>

            {/* Fitness Tracker Section */}
            <Section id="fitness" title={t("fitness.title")} subtitle={t("fitness.subtitle")}>
                <FitnessTracker />
            </Section>

            {/* Ideas Journal Section */}
            <Section id="ideas" title={t("ideas.title")} subtitle={t("ideas.subtitle")} background="alternate">
                <IdeasJournal />
            </Section>

            <Footer />
        </main>
    )
}
