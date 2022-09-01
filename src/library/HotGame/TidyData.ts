import { IHotGame, IResApiGame, IWSData, IWSPlayByPlay, IHotGames } from "@/type/Game"
import vuex from "@/store"

export const tidyData = (gameDtos: Array<IResApiGame>): void => {
    const hotGames: IHotGame = {};
    gameDtos.forEach((item: IResApiGame) => {
        hotGames[item.id] = {} as IHotGames;
        hotGames[item.id].gameType = item.gameType;
        hotGames[item.id].gameID = item.id;
        hotGames[item.id].gameDate = item.gDate;
        hotGames[item.id].gameTime = item.gTime;
        hotGames[item.id].league = item.leagueNameMap;
        hotGames[item.id].leagueID = item.lid;
        hotGames[item.id].teamH = item.teamHNameMap;
        hotGames[item.id].teamA = item.teamANameMap;
        hotGames[item.id].leagueDefault = item.league;
        hotGames[item.id].teamADefault = item.teamH;
        hotGames[item.id].teamHDefault = item.teamA;
        hotGames[item.id].scoreH = item.matchH;
        hotGames[item.id].scoreA = item.matchA
    })
    vuex.dispatch("HotGame/SetHotGames", hotGames)
}

export const tidyWSData = (wsDataStr: string): void => {
    if (wsDataStr.includes('DeCompress Error')) return
    const wsData = JSON.parse(wsDataStr);
    const siteGames: Array<IWSData> = wsData.SiteGames;
    const hotGameDatas: IHotGame = JSON.parse(JSON.stringify(vuex.getters["HotGame/GetHotGames"])) as IHotGame
    if (siteGames.length <= 0) return
    const gameMapping = vuex.getters["HotGame/GetSiteGameMapping"]
    siteGames.forEach((siteGame: IWSData) => {
        const GID = gameMapping[siteGame.GameID]
        if (GID == undefined) return
        hotGameDatas[GID].scoreH = getScore(hotGameDatas[GID].scoreH, siteGame.Score1)
        hotGameDatas[GID].scoreA = getScore(hotGameDatas[GID].scoreA, siteGame.Score2)
        if ((siteGame.Site == "bet365.com" || siteGame.Site == "ku888") && siteGame.GameStatus == 'InProgress' && siteGame.PlayByPlay != null) {
            siteGame.PlayByPlay.forEach((playByPlay: IWSPlayByPlay) => {
                if (playByPlay.Key != 'Time') return
                hotGameDatas[GID].gameDate = ''
                hotGameDatas[GID].gameTime = playByPlay.Value
            })
        }
    })

    vuex.dispatch("HotGame/SetHotGames", hotGameDatas) 
}

const getScore = (original: number, newSorce: number): number => {
    if (original > newSorce) return original
    else return newSorce
}