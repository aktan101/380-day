"use client"

import { motion } from "framer-motion"
import { Car, Smartphone, Dumbbell, Youtube, Gift, Plane, Home, CarFront } from "lucide-react"
import { useTranslation } from "react-i18next"

export function VisionBoard() {
    const { t } = useTranslation()

    const visionItems = [
        {
            id: 1,
            title: t("vision.items.camry.title"),
            description: t("vision.items.camry.description"),
            icon: <Car className="h-8 w-8 text-[#0abab5]" />,
            image: "/images/camry.jpg",
        },
        {
            id: 2,
            title: t("vision.items.apple.title"),
            description: t("vision.items.apple.description"),
            icon: <Smartphone className="h-8 w-8 text-[#0abab5]" />,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 3,
            title: t("vision.items.physique.title"),
            description: t("vision.items.physique.description"),
            icon: <Dumbbell className="h-8 w-8 text-[#0abab5]" />,
            image: "/images/fitness.jpg",
        },
        {
            id: 4,
            title: t("vision.items.youtube.title"),
            description: t("vision.items.youtube.description"),
            icon: <Youtube className="h-8 w-8 text-[#0abab5]" />,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 5,
            title: t("vision.items.gifts.title"),
            description: t("vision.items.gifts.description"),
            icon: <Gift className="h-8 w-8 text-[#0abab5]" />,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 6,
            title: t("vision.items.hajj.title"),
            description: t("vision.items.hajj.description"),
            icon: <Plane className="h-8 w-8 text-[#0abab5]" />,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 7,
            title: t("vision.items.home.title"),
            description: t("vision.items.home.description"),
            icon: <Home className="h-8 w-8 text-[#0abab5]" />,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 8,
            title: t("vision.items.audi.title"),
            description: t("vision.items.audi.description"),
            icon: <CarFront className="h-8 w-8 text-[#0abab5]" />,
            image: "/images/audi.jpg",
        },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            {visionItems.map((visionItem) => (
                <motion.div
                    key={visionItem.id}
                    className="bg-black border border-[#0abab5]/20 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(10,186,181,0.2)] transition-all duration-300 group"
                    variants={item}
                    whileHover={{ y: -5 }}
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={visionItem.image || "/placeholder.svg"}
                            alt={visionItem.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                            <div className="p-2 bg-black/70 rounded-full">{visionItem.icon}</div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{visionItem.title}</h3>
                        <p className="text-gray-400 text-sm">{visionItem.description}</p>
                    </div>
                    <div className="h-1 w-0 bg-gradient-to-r from-[#0abab5] to-[#81D8D0] group-hover:w-full transition-all duration-500"></div>
                </motion.div>
            ))}
        </motion.div>
    )
}
