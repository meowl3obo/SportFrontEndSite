export const RandomName = () => {
    let name = ""
    for (let i = 0; i < 7; i++) {
        name = `${name}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`
    }

    return name
}