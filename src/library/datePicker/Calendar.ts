export const GetCalendar = (d: string | number | Date) => {
    const date = new Date(d || new Date);
    const year = date.getFullYear(); //年
    const month = date.getMonth(); //月
    const day = date.getDate(); //日
    const lastDays = new Date(year, month, 0).getDate(); //上個月最後一天幾號
    const days = new Date(year, month + 1, 0).getDate(); //本月最後一天幾號
    const week = new Date(year, month, 1).getDay() //本月第一天星期幾

    const weekLength = Math.ceil((days + week) / 7)

    const allWaek = getWeak(lastDays, days, week, weekLength)

    return { year, month, day, lastDays, days, week, weekLength, allWaek }
}

const getWeak = (lastDays: number, days: number, week: number, weekLength: number) => {
    const allWeak = []
    let day = 1
    if (week != 0) day = lastDays - week + 1
    for (let i = 0; i < weekLength; i++) {
        const aWeak = []
        for (let j = 0; j < 7; j++) {
            aWeak.push(day)
            if ((day == lastDays && i == 0) || (day == days && i == weekLength - 1)) day = 1
            else day ++
        }
        allWeak.push(aWeak)
    }

    return allWeak
}