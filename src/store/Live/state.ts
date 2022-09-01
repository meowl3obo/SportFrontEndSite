import { IGameData } from "@/type/Game"
import { IStringDict } from "@/type/Global"

export type TState = {
    GameDatas: IGameData,
    SiteLeagueMapping: IStringDict,
    SiteGameMapping: IStringDict
}


export const state: TState = {
    GameDatas: {} as IGameData,
    SiteLeagueMapping: {},
    SiteGameMapping: {}
}
