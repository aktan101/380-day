"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dumbbell, Scale, Utensils, Plus, Minus, Save } from "lucide-react"
import { useTranslation } from "react-i18next"

interface WorkoutDay {
    id: number
    day: string
    exercises: Exercise[]
    isRestDay: boolean
}

interface Exercise {
    id: number
    name: string
    sets: number
    reps: number
    weight: number
}

interface FitnessStats {
    currentWeight: number
    targetWeight: number
    dailyCalories: number
    weeklyWorkouts: number
}

export function FitnessTracker() {
    const { t, i18n } = useTranslation()
    const [activeTab, setActiveTab] = useState("routine")
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([])
    const [stats, setStats] = useState<FitnessStats>({
        currentWeight: 0,
        targetWeight: 0,
        dailyCalories: 0,
        weeklyWorkouts: 0,
    })

    useEffect(() => {
        // Load saved workout plan from localStorage
        const savedPlan = localStorage.getItem("workoutPlan")
        if (savedPlan) {
            setWorkoutPlan(JSON.parse(savedPlan))
        } else {
            // Default workout plan with translations
            const getDayName = (day: string) => {
                if (i18n.language === "ru") {
                    const dayMap: { [key: string]: string } = {
                        Monday: "Понедельник",
                        Tuesday: "Вторник",
                        Wednesday: "Среда",
                        Thursday: "Четверг",
                        Friday: "Пятница",
                        Saturday: "Суббота",
                        Sunday: "Воскресенье",
                    }
                    return dayMap[day] || day
                }
                return day
            }

            const getExerciseName = (name: string) => {
                if (i18n.language === "ru") {
                    const exerciseMap: { [key: string]: string } = {
                        "Bench Press": "Жим лежа",
                        "Incline Dumbbell Press": "Жим гантелей на наклонной скамье",
                        "Cable Flyes": "Разводка на тросах",
                        Squats: "Приседания",
                        "Leg Press": "Жим ногами",
                        "Leg Extensions": "Разгибание ног",
                        "Pull-ups": "Подтягивания",
                        "Barbell Rows": "Тяга штанги в наклоне",
                        "Lat Pulldowns": "Тяга верхнего блока",
                        "Overhead Press": "Жим штанги над головой",
                        "Lateral Raises": "Разведение рук с гантелями",
                        "Face Pulls": "Тяга к лицу",
                        Deadlifts: "Становая тяга",
                        "Romanian Deadlifts": "Румынская становая тяга",
                        "Leg Curls": "Сгибание ног",
                    }
                    return exerciseMap[name] || name
                }
                return name
            }

            const defaultPlan: WorkoutDay[] = [
                {
                    id: 1,
                    day: getDayName("Monday"),
                    isRestDay: false,
                    exercises: [
                        { id: 1, name: getExerciseName("Bench Press"), sets: 4, reps: 8, weight: 135 },
                        { id: 2, name: getExerciseName("Incline Dumbbell Press"), sets: 3, reps: 10, weight: 50 },
                        { id: 3, name: getExerciseName("Cable Flyes"), sets: 3, reps: 12, weight: 30 },
                    ],
                },
                {
                    id: 2,
                    day: getDayName("Tuesday"),
                    isRestDay: false,
                    exercises: [
                        { id: 1, name: getExerciseName("Squats"), sets: 4, reps: 8, weight: 185 },
                        { id: 2, name: getExerciseName("Leg Press"), sets: 3, reps: 10, weight: 300 },
                        { id: 3, name: getExerciseName("Leg Extensions"), sets: 3, reps: 12, weight: 100 },
                    ],
                },
                {
                    id: 3,
                    day: getDayName("Wednesday"),
                    isRestDay: true,
                    exercises: [],
                },
                {
                    id: 4,
                    day: getDayName("Thursday"),
                    isRestDay: false,
                    exercises: [
                        { id: 1, name: getExerciseName("Pull-ups"), sets: 4, reps: 8, weight: 0 },
                        { id: 2, name: getExerciseName("Barbell Rows"), sets: 3, reps: 10, weight: 135 },
                        { id: 3, name: getExerciseName("Lat Pulldowns"), sets: 3, reps: 12, weight: 120 },
                    ],
                },
                {
                    id: 5,
                    day: getDayName("Friday"),
                    isRestDay: false,
                    exercises: [
                        { id: 1, name: getExerciseName("Overhead Press"), sets: 4, reps: 8, weight: 95 },
                        { id: 2, name: getExerciseName("Lateral Raises"), sets: 3, reps: 12, weight: 20 },
                        { id: 3, name: getExerciseName("Face Pulls"), sets: 3, reps: 15, weight: 50 },
                    ],
                },
                {
                    id: 6,
                    day: getDayName("Saturday"),
                    isRestDay: false,
                    exercises: [
                        { id: 1, name: getExerciseName("Deadlifts"), sets: 4, reps: 6, weight: 225 },
                        { id: 2, name: getExerciseName("Romanian Deadlifts"), sets: 3, reps: 10, weight: 155 },
                        { id: 3, name: getExerciseName("Leg Curls"), sets: 3, reps: 12, weight: 80 },
                    ],
                },
                {
                    id: 7,
                    day: getDayName("Sunday"),
                    isRestDay: true,
                    exercises: [],
                },
            ]
            setWorkoutPlan(defaultPlan)
            localStorage.setItem("workoutPlan", JSON.stringify(defaultPlan))
        }

        // Load saved stats from localStorage
        const savedStats = localStorage.getItem("fitnessStats")
        if (savedStats) {
            setStats(JSON.parse(savedStats))
        } else {
            // Default stats
            const defaultStats: FitnessStats = {
                currentWeight: i18n.language === "ru" ? 82 : 180, // Convert to kg for Russian
                targetWeight: i18n.language === "ru" ? 75 : 165, // Convert to kg for Russian
                dailyCalories: 2200,
                weeklyWorkouts: 5,
            }
            setStats(defaultStats)
            localStorage.setItem("fitnessStats", JSON.stringify(defaultStats))
        }
    }, [i18n.language])

    const saveStats = () => {
        localStorage.setItem("fitnessStats", JSON.stringify(stats))
    }

    const updateExercise = (dayId: number, exerciseId: number, field: keyof Exercise, value: number) => {
        const updatedPlan = workoutPlan.map((day) => {
            if (day.id === dayId) {
                return {
                    ...day,
                    exercises: day.exercises.map((exercise) => {
                        if (exercise.id === exerciseId) {
                            return { ...exercise, [field]: value }
                        }
                        return exercise
                    }),
                }
            }
            return day
        })

        setWorkoutPlan(updatedPlan)
        localStorage.setItem("workoutPlan", JSON.stringify(updatedPlan))
    }

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
        <div className="w-full max-w-6xl mx-auto">
            <Tabs defaultValue="routine" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/30 border border-[#0abab5]/20">
                    <TabsTrigger
                        value="routine"
                        className="data-[state=active]:bg-[#0abab5]/20 data-[state=active]:text-[#0abab5]"
                    >
                        <Dumbbell className="h-4 w-4 mr-2" />
                        {t("fitness.tabs.routine")}
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-[#0abab5]/20 data-[state=active]:text-[#0abab5]">
                        <Scale className="h-4 w-4 mr-2" />
                        {t("fitness.tabs.stats")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="nutrition"
                        className="data-[state=active]:bg-[#0abab5]/20 data-[state=active]:text-[#0abab5]"
                    >
                        <Utensils className="h-4 w-4 mr-2" />
                        {t("fitness.tabs.nutrition")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="routine" className="mt-6">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {workoutPlan.map((day) => (
                            <motion.div key={day.id} variants={item}>
                                <Card className="bg-black/30 border-[#0abab5]/20 text-white">
                                    <CardHeader className={day.isRestDay ? "bg-black/50" : "bg-[#0abab5]/10"}>
                                        <CardTitle className="flex justify-between items-center">
                                            <span>{day.day}</span>
                                            {day.isRestDay && <span className="text-sm text-gray-400">{t("fitness.workout.rest")}</span>}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        {!day.isRestDay ? (
                                            <div className="space-y-4">
                                                {day.exercises.map((exercise) => (
                                                    <div key={exercise.id} className="space-y-2 border-b border-gray-800 pb-3">
                                                        <div className="font-medium">{exercise.name}</div>
                                                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
                                                            <div>
                                                                <span className="block">{t("fitness.workout.sets")}</span>
                                                                <div className="flex items-center mt-1">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() =>
                                                                            updateExercise(day.id, exercise.id, "sets", Math.max(1, exercise.sets - 1))
                                                                        }
                                                                    >
                                                                        <Minus className="h-3 w-3" />
                                                                    </Button>
                                                                    <span className="mx-2">{exercise.sets}</span>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() => updateExercise(day.id, exercise.id, "sets", exercise.sets + 1)}
                                                                    >
                                                                        <Plus className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="block">{t("fitness.workout.reps")}</span>
                                                                <div className="flex items-center mt-1">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() =>
                                                                            updateExercise(day.id, exercise.id, "reps", Math.max(1, exercise.reps - 1))
                                                                        }
                                                                    >
                                                                        <Minus className="h-3 w-3" />
                                                                    </Button>
                                                                    <span className="mx-2">{exercise.reps}</span>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() => updateExercise(day.id, exercise.id, "reps", exercise.reps + 1)}
                                                                    >
                                                                        <Plus className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="block">{t("fitness.workout.weight")}</span>
                                                                <div className="flex items-center mt-1">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() =>
                                                                            updateExercise(day.id, exercise.id, "weight", Math.max(0, exercise.weight - 5))
                                                                        }
                                                                    >
                                                                        <Minus className="h-3 w-3" />
                                                                    </Button>
                                                                    <span className="mx-2">{exercise.weight}</span>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-6 w-6 border-gray-800"
                                                                        onClick={() => updateExercise(day.id, exercise.id, "weight", exercise.weight + 5)}
                                                                    >
                                                                        <Plus className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center text-gray-400">
                                                <p>{t("fitness.workout.recovery")}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </TabsContent>

                <TabsContent value="stats" className="mt-6">
                    <Card className="bg-black/30 border-[#0abab5]/20 text-white">
                        <CardHeader>
                            <CardTitle>{t("fitness.stats.title")}</CardTitle>
                            <CardDescription className="text-gray-400">{t("fitness.stats.subtitle")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="currentWeight">{t("fitness.stats.currentWeight")}</Label>
                                    <Input
                                        id="currentWeight"
                                        type="number"
                                        value={stats.currentWeight}
                                        onChange={(e) => setStats({ ...stats, currentWeight: Number.parseFloat(e.target.value) })}
                                        className="bg-black/50 border-[#0abab5]/30 text-white"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="targetWeight">{t("fitness.stats.targetWeight")}</Label>
                                    <Input
                                        id="targetWeight"
                                        type="number"
                                        value={stats.targetWeight}
                                        onChange={(e) => setStats({ ...stats, targetWeight: Number.parseFloat(e.target.value) })}
                                        className="bg-black/50 border-[#0abab5]/30 text-white"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="dailyCalories">{t("fitness.stats.dailyCalories")}</Label>
                                    <Input
                                        id="dailyCalories"
                                        type="number"
                                        value={stats.dailyCalories}
                                        onChange={(e) => setStats({ ...stats, dailyCalories: Number.parseFloat(e.target.value) })}
                                        className="bg-black/50 border-[#0abab5]/30 text-white"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="weeklyWorkouts">{t("fitness.stats.weeklyWorkouts")}</Label>
                                    <Input
                                        id="weeklyWorkouts"
                                        type="number"
                                        value={stats.weeklyWorkouts}
                                        onChange={(e) => setStats({ ...stats, weeklyWorkouts: Number.parseFloat(e.target.value) })}
                                        className="bg-black/50 border-[#0abab5]/30 text-white"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-medium mb-4">{t("fitness.stats.weightProgress")}</h3>
                                <div className="h-4 w-full bg-black/50 rounded-full overflow-hidden">
                                    {stats.currentWeight > stats.targetWeight ? (
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#0abab5] to-[#81D8D0]"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${Math.min(100, Math.max(0, 100 - ((stats.currentWeight - stats.targetWeight) / (stats.currentWeight - stats.targetWeight + 20)) * 100))}%`,
                                            }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        ></motion.div>
                                    ) : (
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#0abab5] to-[#81D8D0]"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${Math.min(100, Math.max(0, 100 - ((stats.targetWeight - stats.currentWeight) / stats.targetWeight) * 100))}%`,
                                            }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        ></motion.div>
                                    )}
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>
                    {t("fitness.stats.current")}: {stats.currentWeight} {i18n.language === "ru" ? "кг" : "lbs"}
                  </span>
                                    <span>
                    {t("fitness.stats.target")}: {stats.targetWeight} {i18n.language === "ru" ? "кг" : "lbs"}
                  </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#0abab5] hover:bg-[#0abab5]/80 text-black" onClick={saveStats}>
                                <Save className="h-4 w-4 mr-2" />
                                {t("fitness.stats.saveStats")}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-6">
                    <Card className="bg-black/30 border-[#0abab5]/20 text-white">
                        <CardHeader>
                            <CardTitle>{t("fitness.nutrition.title")}</CardTitle>
                            <CardDescription className="text-gray-400">{t("fitness.nutrition.subtitle")}</CardDescription>
                        </CardHeader>
                        <CardContent className="py-10 text-center">
                            <p className="text-gray-400">{t("fitness.nutrition.comingSoon")}</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
