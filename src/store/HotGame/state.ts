import { IHotGame } from "@/type/Game"
import { IStringDict } from "@/type/Global"

export type TState = {
    HotGames: IHotGame,
    SiteGameMapping: IStringDict
}


export const state: TState = {
    HotGames: {} as IHotGame,
    SiteGameMapping: {}
}
