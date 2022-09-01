import { IGameData, ILeague, IGame, ISite, ILiveGame, ILiveSiteGame } from "@/type/Game"
// import { IDict, IStringDict } from "@/type/Global"
import vuex from "@/store"

const siteModel = {
  "bet365.com": {} as ILiveSiteGame,
  "betfair.com": {} as ILiveSiteGame,
  "bwin.com": {} as ILiveSiteGame,
  "ku888": {} as ILiveSiteGame,
  "twsl": {} as ILiveSiteGame,
  "pinnacle.com": {} as ILiveSiteGame,
} as ISite

export const tidyApiData = (liveDtos: Array<ILiveGame>): void => {
    const liveDatas: IGameData = {}
    if (liveDtos == null || liveDtos.length <= 0) return
    liveDtos.forEach((item: ILiveGame) => {
        const gameData = {} as IGame;
        if (!item.lid && !Object.keys(liveDatas).includes("undefined")) {
            liveDatas["undefined"] = {} as ILeague
        } else if (item.lid && !Object.keys(liveDatas).includes(item.lid)) {
            liveDatas[item.lid] = {} as ILeague
        }
        const { siteData } = tidySite(item.siteInfos, item.lid ? item.lid : 'undefined', item.id);
        gameData.gameType = item.gameType
        gameData.gameDate = item.gDate;
        gameData.leagueID = item.lid ? item.lid : 'undefined';
        gameData.league = item.leagueNameMap;
        gameData.leagueDefault = item.league;
        gameData.gameID = item.id;
        gameData.gameTime = item.gTime;
        gameData.teamH = item.teamHNameMap;
        gameData.teamHDefault = item.teamH;
        gameData.teamA = item.teamANameMap;
        gameData.teamADefault = item.teamA;
        gameData.scoreH = item.matchH;
        gameData.scoreA = item.matchA;
        gameData.live = "item.liveUrl"
        gameData.site = siteData;
        liveDatas[item.lid ? item.lid : 'undefined'][item.id] = gameData
    });

    // console.log(liveDatas)
    vuex.dispatch("Live/SetGameDatas", liveDatas)
    // vuex.dispatch("Live/SetSiteLeagueMapping", leagueMapping)
    // vuex.dispatch("Live/SetSiteGameMapping", gameMapping)
}

const tidySite = (siteDtos: Array<ILiveSiteGame>, lid: string, gid: string) => {
    const siteData: ISite = JSON.parse(JSON.stringify(siteModel));
    siteDtos.forEach((siteItem: ILiveSiteGame) => {
        siteData[siteItem.site] = siteItem
    });
    return { siteData: siteData };
}

// const singleSiteAPI = (siteItem: ILiveSiteGame) => {
//     const siteData: IOdds = {
//         "ID": siteItem.gameID,
//         "HA": {},
//         "1X2": {},
//         "OU": {},
//     };
//     siteItem.odds.forEach((oddItem: ISiteOdds) => {
//         if (oddItem.playMode.includes("OU")) {
//             siteData['OU'] = getOU(oddItem)
//         } else if (oddItem.playMode.includes("HA")) {
//             const { HA, X } = getHA(oddItem);
//             siteData['HA'] = HA
//             siteData['1X2'] = X
//         }
//     });

//     return siteData
// }

// const getOU = (ou: ISiteOdds) => {
//     const ouData: IOdd = {};
//     ou.prices.forEach((priceItem: ISitePrices) => {
//         if (priceItem.main) {
//             ouData['spread'] = `o${priceItem.spread}`
//             priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
//                 if (oddItem.oddType == "O") {
//                     ouData['o'] = oddItem.odd
//                 } else if (oddItem.oddType == "U") {
//                     ouData['u'] = oddItem.odd
//                 }
//             });
//         }
//     });
//     return ouData;
// }

// const getHA = (ha: ISiteOdds) => {
//     const haData: IDict<IOdd> = { HA: {}, X: {} };
//     ha.prices.forEach((priceItem: ISitePrices) => {
//         if (priceItem.main) {
//             if (priceItem.spread == "1X2") {
//                 haData["X"]["spread"] = priceItem.spread
//                 priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
//                     if (oddItem.oddType == "H") {
//                         haData["X"]['h'] = oddItem.odd
//                     } else if (oddItem.oddType == "A") {
//                         haData["X"]['a'] = oddItem.odd
//                     }
//                 });
//             } else {
//                 haData["HA"]["spread"] = priceItem.spread
//                 priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
//                     if (oddItem.oddType == "H") {
//                         haData["HA"]['h'] = oddItem.odd
//                     } else if (oddItem.oddType == "A") {
//                         haData["HA"]['a'] = oddItem.odd
//                     }
//                 });
//             }
//         }
//     });
//     return haData;
// }

// export const tidyWSData = (wsDataStr: string): void => {
//     // console.log(wsDataStr)
//     if (wsDataStr.includes('DeCompress Error')) return
//     const leagueMapping = vuex.getters["Live/GetSiteLeagueMapping"]
//     const gameMapping = vuex.getters["Live/GetSiteGameMapping"]
//     const wsData = JSON.parse(wsDataStr);
//     const siteGames: Array<IWSData> = wsData.SiteGames
//     const liveDatas: IGameData = vuex.getters["Live/GetGameDatas"] as IGameData
//     siteGames.forEach((siteGame: IWSData) => {
//         const LID = leagueMapping[siteGame.GameID]
//         const GID = gameMapping[siteGame.GameID]
//         if (LID == undefined || GID == undefined) return
//         if ((siteGame.Site == "bet365.com" || siteGame.Site == "ku888") && siteGame.GameStatus == "InProgress") {
//             liveDatas[LID][GID].ScoreH = siteGame.Score1;
//             liveDatas[LID][GID].ScoreA = siteGame.Score2;
//             if (siteGame.PlayByPlay != null) {
//                 liveDatas[LID][GID].Status = getStatus(siteGame.PlayByPlay);
//             }
//         }
//         const site: ISite = liveDatas[LID][GID].Site
//         site[siteGame.Site] = getOdds(siteGame)
//         liveDatas[LID][GID].Site = site
//     })
//     vuex.dispatch("Live/SetGameDatas", liveDatas)
// }

// const getStatus = (playByPlay: Array<IWSPlayByPlay>) => {
//     const status: IStatus = {}
//     playByPlay.forEach((item: IWSPlayByPlay) => {
//         status[item.Key] = item.Value
//     })
//     return status
// }

// const getOdds = (siteItem: IWSData) => {
//     const siteData: IOdds = {
//         "ID": siteItem.GameID,
//         "HA": {},
//         "1X2": {},
//         "OU": {},
//     };
//     siteItem.Odds.forEach((oddItem: IWSOdds) => {
//         if (oddItem.PlayMode.includes("OU")) {
//             siteData['OU'] = getWSOU(oddItem)
//         } else if (oddItem.PlayMode.includes("HA")) {
//             const { HA, X } = getWSHA(oddItem);
//             siteData['HA'] = HA
//             siteData['1X2'] = X
//         }
//     });
//     return siteData
// }

// const getWSOU = (ou: IWSOdds) => {
//     const ouData: IOdd = {};
//     ou.Prices.forEach((priceItem: IWSPrices) => {
//         if (priceItem.Main) {
//             ouData['spread'] = `o${priceItem.Spread}`
//             priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
//                 if (oddItem.OddType == "O") {
//                     ouData['o'] = oddItem.Odd
//                 } else if (oddItem.OddType == "U") {
//                     ouData['u'] = oddItem.Odd
//                 }
//             });
//         }
//     });
//     return ouData;
// }

// const getWSHA = (ha: IWSOdds) => {
//     const haData: IDict<IOdd> = { HA: {}, X: {} };
//     ha.Prices.forEach((priceItem: IWSPrices) => {
//         if (priceItem.Main) {
//             if (priceItem.Spread == "1X2") {
//                 haData["X"]["spread"] = priceItem.Spread
//                 priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
//                     if (oddItem.OddType == "1") {
//                         haData["X"]['h'] = oddItem.Odd
//                     } else if (oddItem.OddType == "2") {
//                         haData["X"]['a'] = oddItem.Odd
//                     }
//                 });
//             } else {
//                 haData["HA"]["spread"] = priceItem.Spread
//                 priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
//                     if (oddItem.OddType == "1") {
//                         haData["HA"]['h'] = oddItem.Odd
//                     } else if (oddItem.OddType == "2") {
//                         haData["HA"]['a'] = oddItem.Odd
//                     }
//                 });
//             }
//         }
//     });
//     return haData;
// }