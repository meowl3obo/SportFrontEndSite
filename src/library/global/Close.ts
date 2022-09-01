import Mitt from "@/library/global/Mitt"

const allListName = ["GameType", "Hour", "HomeType", "HeadControl", "UserControl", "Chat", "Date", "Pen", "Analysis"]

export const CloseAll = (componentName?: string, randomNmae?: string) => {
    allListName.forEach((listName: string) => {
        if (listName != componentName) {
            Mitt.emit(`close${listName}`)
        } else if (randomNmae) {
            Mitt.emit(`close${listName}`, randomNmae)
        }
    })
}