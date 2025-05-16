"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Tag, Calendar, Trash2, Edit, Save, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { formatDate } from "@/lib/utils"

interface JournalEntry {
    id: string
    title: string
    content: string
    date: string
    category: string
    color: string
}

export function IdeasJournal() {
    const { t, i18n } = useTranslation()
    const [entries, setEntries] = useState<JournalEntry[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [newEntry, setNewEntry] = useState<JournalEntry>({
        id: "",
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        category: "idea",
        color: "#0abab5",
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    useEffect(() => {
        const savedEntries = localStorage.getItem("journalEntries")
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries))
        }
    }, [])

    const saveEntries = (updatedEntries: JournalEntry[]) => {
        setEntries(updatedEntries)
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))
    }

    const handleAddEntry = () => {
        if (newEntry.title.trim() === "" || newEntry.content.trim() === "") return

        const entryToAdd = {
            ...newEntry,
            id: Date.now().toString(),
            date: new Date().toISOString().split("T")[0],
        }

        const updatedEntries = [entryToAdd, ...entries]
        saveEntries(updatedEntries)

        setNewEntry({
            id: "",
            title: "",
            content: "",
            date: new Date().toISOString().split("T")[0],
            category: "idea",
            color: "#0abab5",
        })
    }

    const handleDeleteEntry = (id: string) => {
        const updatedEntries = entries.filter((entry) => entry.id !== id)
        saveEntries(updatedEntries)
    }

    const handleEditEntry = (entry: JournalEntry) => {
        setIsEditing(true)
        setEditingId(entry.id)
        setNewEntry({ ...entry })
    }

    const handleUpdateEntry = () => {
        if (newEntry.title.trim() === "" || newEntry.content.trim() === "") return

        const updatedEntries = entries.map((entry) => (entry.id === editingId ? { ...newEntry } : entry))

        saveEntries(updatedEntries)

        setIsEditing(false)
        setEditingId(null)
        setNewEntry({
            id: "",
            title: "",
            content: "",
            date: new Date().toISOString().split("T")[0],
            category: "idea",
            color: "#0abab5",
        })
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setEditingId(null)
        setNewEntry({
            id: "",
            title: "",
            content: "",
            date: new Date().toISOString().split("T")[0],
            category: "idea",
            color: "#0abab5",
        })
    }

    const filteredEntries = entries.filter((entry) => {
        const matchesSearch =
            entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "all" || entry.category === filterCategory

        return matchesSearch && matchesCategory
    })

    const categoryOptions = [
        { value: "idea", label: t("ideas.categories.idea") },
        { value: "goal", label: t("ideas.categories.goal") },
        { value: "quote", label: t("ideas.categories.quote") },
        { value: "reflection", label: t("ideas.categories.reflection") },
        { value: "gratitude", label: t("ideas.categories.gratitude") },
    ]

    const colorOptions = [
        { value: "#0abab5", label: t("ideas.colors.tiffanyBlue") },
        { value: "#ff5555", label: t("ideas.colors.red") },
        { value: "#f1fa8c", label: t("ideas.colors.yellow") },
        { value: "#bd93f9", label: t("ideas.colors.purple") },
        { value: "#50fa7b", label: t("ideas.colors.green") },
    ]

    const getCategoryLabel = (value: string) => {
        const category = categoryOptions.find((cat) => cat.value === value)
        return category ? category.label : value
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card className="bg-black/30 border-[#0abab5]/20 text-white sticky top-24">
                        <CardHeader>
                            <CardTitle>{isEditing ? t("ideas.editEntry") : t("ideas.newEntry")}</CardTitle>
                            <CardDescription className="text-gray-400">
                                {isEditing ? t("ideas.editDescription") : t("ideas.addDescription")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder={t("ideas.titlePlaceholder")}
                                    value={newEntry.title}
                                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                                    className="bg-black/50 border-[#0abab5]/30 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder={t("ideas.contentPlaceholder")}
                                    value={newEntry.content}
                                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                                    className="min-h-[150px] bg-black/50 border-[#0abab5]/30 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Select
                                        value={newEntry.category}
                                        onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}
                                    >
                                        <SelectTrigger className="bg-black/50 border-[#0abab5]/30 text-white">
                                            <SelectValue placeholder={t("ideas.category")} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/90 border-[#0abab5]/30 text-white">
                                            {categoryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Select value={newEntry.color} onValueChange={(value) => setNewEntry({ ...newEntry, color: value })}>
                                        <SelectTrigger className="bg-black/50 border-[#0abab5]/30 text-white">
                                            <SelectValue placeholder={t("ideas.color")} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/90 border-[#0abab5]/30 text-white">
                                            {colorOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    <div className="flex items-center">
                                                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: option.value }}></div>
                                                        {option.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="outline"
                                        className="border-[#0abab5]/30 text-white hover:bg-[#0abab5]/10"
                                        onClick={cancelEditing}
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        {t("ideas.cancel")}
                                    </Button>
                                    <Button className="bg-[#0abab5] hover:bg-[#0abab5]/80 text-black" onClick={handleUpdateEntry}>
                                        <Save className="h-4 w-4 mr-2" />
                                        {t("ideas.update")}
                                    </Button>
                                </>
                            ) : (
                                <Button className="w-full bg-[#0abab5] hover:bg-[#0abab5]/80 text-black" onClick={handleAddEntry}>
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    {t("ideas.addEntry")}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <div className="mb-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder={t("ideas.searchPlaceholder")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-black/50 border-[#0abab5]/30 text-white"
                            />
                        </div>
                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                            <SelectTrigger className="w-[180px] bg-black/50 border-[#0abab5]/30 text-white">
                                <SelectValue placeholder={t("ideas.filterCategory")} />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-[#0abab5]/30 text-white">
                                <SelectItem value="all">{t("ideas.allCategories")}</SelectItem>
                                {categoryOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {filteredEntries.length === 0 ? (
                        <div className="text-center py-12 bg-black/30 border border-[#0abab5]/20 rounded-xl">
                            <p className="text-gray-400">{t("ideas.noEntries")}</p>
                        </div>
                    ) : (
                        <motion.div
                            className="space-y-4"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            {filteredEntries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="bg-black/30 border-[#0abab5]/20 text-white overflow-hidden">
                                        <div className="h-1" style={{ backgroundColor: entry.color }}></div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle>{entry.title}</CardTitle>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-white"
                                                        onClick={() => handleEditEntry(entry)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                                                        onClick={() => handleDeleteEntry(entry.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                                                <div className="flex items-center">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {formatDate(new Date(entry.date), i18n.language)}
                                                </div>
                                                <div className="flex items-center">
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {getCategoryLabel(entry.category)}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="whitespace-pre-line">{entry.content}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
