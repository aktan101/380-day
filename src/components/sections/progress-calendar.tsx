"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, RotateCcw } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getDayNames, getMonthNames } from "@/lib/utils"

interface DayProgress {
    date: string
    completed: boolean
}

export function ProgressCalendar() {
    const { t, i18n } = useTranslation()
    const [progress, setProgress] = useState<DayProgress[]>([])
    const [selectedMonth, setSelectedMonth] = useState<string>("all")
    const [startDate] = useState<Date>(() => {
        // Get the current date and subtract 7 days
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return date
    })
    const [endDate] = useState<Date>(new Date(startDate.getTime() + 380 * 24 * 60 * 60 * 1000))

    // Generate all dates between start and end
    useEffect(() => {
        const savedProgress = localStorage.getItem("journeyProgress")
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress))
        } else {
            const dates: DayProgress[] = []
            const currentDate = new Date(startDate)

            while (currentDate <= endDate) {
                dates.push({
                    date: currentDate.toISOString().split("T")[0],
                    completed: false,
                })
                currentDate.setDate(currentDate.getDate() + 1)
            }

            setProgress(dates)
            localStorage.setItem("journeyProgress", JSON.stringify(dates))
        }
    }, [startDate, endDate])

    const toggleDayCompletion = (date: string) => {
        const updatedProgress = progress.map((day) => (day.date === date ? { ...day, completed: !day.completed } : day))
        setProgress(updatedProgress)
        localStorage.setItem("journeyProgress", JSON.stringify(updatedProgress))
    }

    const resetProgress = () => {
        const resetData = progress.map((day) => ({ ...day, completed: false }))
        setProgress(resetData)
        localStorage.setItem("journeyProgress", JSON.stringify(resetData))
    }

    const filteredProgress =
        selectedMonth === "all" ? progress : progress.filter((day) => day.date.startsWith(selectedMonth))

    const completedDays = progress.filter((day) => day.completed).length
    const totalDays = progress.length
    const completionPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

    // Group days by month for the calendar view
    const groupedByMonth: { [key: string]: DayProgress[] } = {}
    filteredProgress.forEach((day) => {
        const monthYear = day.date.substring(0, 7) // YYYY-MM format
        if (!groupedByMonth[monthYear]) {
            groupedByMonth[monthYear] = []
        }
        groupedByMonth[monthYear].push(day)
    })

    // Get all unique months for the filter
    const months = Object.keys(
        progress.reduce(
            (acc, day) => {
                const monthYear = day.date.substring(0, 7)
                acc[monthYear] = true
                return acc
            },
            {} as { [key: string]: boolean },
        ),
    ).sort()

    const formatMonthYear = (monthYear: string) => {
        const [year, month] = monthYear.split("-")
        const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
        const monthNames = getMonthNames(i18n.language)

        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    // Get today's date minus 7 days
    const getAdjustedToday = () => {
        const today = new Date()
        today.setDate(today.getDate() - 7)
        return today.toISOString().split("T")[0]
    }

    const adjustedToday = getAdjustedToday()

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 bg-black/30 border border-[#0abab5]/20 rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-white">{t("progress.overview")}</h3>
                        <p className="text-gray-400 text-sm">
                            {completedDays} {t("progress.completed")} {totalDays} {t("progress.days")} ({completionPercentage}%)
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px] border-[#0abab5]/30 bg-black text-white">
                                <SelectValue placeholder={t("progress.filter")} />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-[#0abab5]/30 text-white">
                                <SelectItem value="all">{t("progress.allMonths")}</SelectItem>
                                {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                        {formatMonthYear(month)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            className="border-[#0abab5]/30 text-[#0abab5] hover:bg-[#0abab5]/10"
                            onClick={resetProgress}
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            {t("progress.reset")}
                        </Button>
                    </div>
                </div>

                <Card className="bg-black/20 border-[#0abab5]/20 mb-6">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">{t("progress.overview")}</span>
                            <span className="text-sm font-medium text-[#0abab5]">{completionPercentage}%</span>
                        </div>
                        <Progress
                            value={completionPercentage}
                            className="h-2 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-[#0abab5] to-[#81D8D0]"
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                {Object.entries(groupedByMonth).map(([monthYear, days]) => (
                    <motion.div
                        key={monthYear}
                        className="bg-black/30 border border-[#0abab5]/20 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-lg font-bold text-white mb-4">{formatMonthYear(monthYear)}</h3>
                        <div className="grid grid-cols-7 gap-2">
                            {getDayNames(i18n.language).map((day) => (
                                <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
                                    {day}
                                </div>
                            ))}

                            {/* Add empty cells for proper alignment */}
                            {days.length > 0 &&
                                Array.from({ length: new Date(days[0].date).getDay() }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-10 md:h-12"></div>
                                ))}

                            {days.map((day) => {
                                const date = new Date(day.date)
                                const isToday = adjustedToday === day.date

                                return (
                                    <motion.button
                                        key={day.date}
                                        className={`h-10 md:h-12 rounded-md flex items-center justify-center relative ${
                                            isToday ? "border-2 border-[#0abab5]" : "border border-gray-800"
                                        } ${day.completed ? "bg-[#0abab5]/20" : "bg-black/50 hover:bg-black/70"}`}
                                        onClick={() => toggleDayCompletion(day.date)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-xs md:text-sm">{date.getDate()}</span>
                                        {day.completed && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                <Check className="h-4 w-4 text-[#0abab5]" />
                                            </div>
                                        )}
                                        {isToday && (
                                            <div className="absolute -top-2 -right-2 bg-[#0abab5] text-black text-[8px] px-1 rounded-full">
                                                {t("progress.today")}
                                            </div>
                                        )}
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
