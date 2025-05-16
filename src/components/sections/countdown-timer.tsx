"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"

interface CountdownTimerProps {
    targetDate: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const { t } = useTranslation()
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [startDate] = useState<Date>(() => {
        // Get the current date and subtract 7 days
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return date
    })
    const [endDate] = useState<Date>(new Date(targetDate))
    const [daysCompleted, setDaysCompleted] = useState(0)
    const [totalDays, setTotalDays] = useState(380)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const target = new Date(targetDate).getTime()

        const calculateTimeLeft = () => {
            // Get current date minus 7 days
            const now = new Date()
            now.setDate(now.getDate() - 7)
            const currentTime = now.getTime()

            const difference = target - currentTime

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            }
        }

        // Calculate total days and days completed
        const totalDaysCalc = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        setTotalDays(totalDaysCalc)

        const now = new Date()
        now.setDate(now.getDate() - 7) // Subtract 7 days
        const daysCompletedCalc = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        setDaysCompleted(Math.max(0, daysCompletedCalc))

        // Calculate progress percentage
        const progressPercentage = (daysCompletedCalc / totalDaysCalc) * 100
        setProgress(Math.min(100, Math.max(0, progressPercentage)))

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate, startDate, endDate])

    const timeUnits = [
        { label: t("time.days"), value: timeLeft.days },
        { label: t("time.hours"), value: timeLeft.hours },
        { label: t("time.minutes"), value: timeLeft.minutes },
        { label: t("time.seconds"), value: timeLeft.seconds },
    ]

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {timeUnits.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    >
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black border border-[#0abab5]/30 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(10,186,181,0.15)]">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                            </div>
                            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0abab5] to-transparent"></div>
                        </div>
                        <span className="mt-2 text-xs text-gray-400 uppercase tracking-wider">{unit.label}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <Card className="bg-black/30 border-[#0abab5]/20 text-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-[#0abab5]">{t("countdown.daysCompleted")}</h3>
                            <span className="text-2xl font-bold">{daysCompleted}</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-black/50" indicatorClassName="bg-[#0abab5]" />
                        <div className="mt-4 text-xs text-gray-400">
                            <div className="flex justify-between">
                <span>
                  {t("countdown.startDate")}: {startDate.toLocaleDateString()}
                </span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/30 border-[#0abab5]/20 text-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-[#0abab5]">{t("countdown.daysLeft")}</h3>
                            <span className="text-2xl font-bold">{timeLeft.days}</span>
                        </div>
                        <Progress
                            value={100 - progress}
                            className="h-2 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-[#0abab5] to-[#81D8D0]"
                        />
                        <div className="mt-4 text-xs text-gray-400">
                            <div className="flex justify-between">
                <span>
                  {t("countdown.endDate")}: {endDate.toLocaleDateString()}
                </span>
                                <span>{Math.round(100 - progress)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="mt-8 text-center">
                <motion.div
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#0abab5]/10 to-[#0abab5]/5 border border-[#0abab5]/30 text-[#0abab5]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <span className="text-sm font-medium">{t("hero.journey")}</span>
                </motion.div>
            </div>
        </div>
    )
}
