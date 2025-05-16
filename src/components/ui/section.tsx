"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface SectionProps {
    id: string
    title: string
    subtitle: string
    children: ReactNode
    className?: string
    background?: "default" | "alternate"
}

export function Section({ id, title, subtitle, children, className = "", background = "default" }: SectionProps) {
    return (
        <section
            id={id}
            className={`w-full min-h-screen py-24 relative ${background === "alternate" ? "bg-black/50" : ""} ${className}`}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0abab5] to-[#81D8D0]">{title}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
                </motion.div>

                {children}
            </div>
        </section>
    )
}
