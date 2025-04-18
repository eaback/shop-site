import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
    if (!dateString) return ""

    const date = new Date(dateString)

    if (isNaN(date.getTime())) return ""

    return new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

