import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Get adjusted date (current date - 7 days)
export function getAdjustedDate() {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date
}

// Format date based on locale
export function formatDate(date: Date, locale: string) {
    return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")
}

// Get month names based on locale
export function getMonthNames(locale: string) {
    if (locale === "ru") {
        return [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ]
    }

    return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
}

// Get day names based on locale
export function getDayNames(locale: string, short = true) {
    if (locale === "ru") {
        return short
            ? ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
            : ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    }

    return short
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}
