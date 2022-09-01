export const DateLibrary = new class {
    UnixToDate = (unix: number): string => {
        const date = new Date(unix);
        const years = date.getFullYear()
        const months = date.getMonth() + 1
        const days = date.getDate()

        return `${years}/${months < 10 ? `0${months}` : months}/${days < 10 ? `0${days}` : days}`
    }
    UnixToJsDate = (unix: number): string => {
        const date = new Date(unix);
        const years = date.getFullYear()
        const months = date.getMonth() + 1
        const days = date.getDate()

        return `${years}-${months < 10 ? `0${months}` : months}-${days < 10 ? `0${days}` : days}`
    }
}

export const GetWeek = (year: number, month: number, day: number) => {
    const week = new Date(year, month, day).getDay()
    return week
}