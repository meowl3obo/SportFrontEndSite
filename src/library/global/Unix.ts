export const UnixToDate = (unixTime: number) => {
    let strtingUnix = unixTime.toString()
    const count = 13 - strtingUnix.length
    for (let i = 0; i < count; i++) {
        strtingUnix = `${strtingUnix}0`
    }
    const date = new Date(Number(strtingUnix));
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

    return `${year}/${month}/${day}`
}