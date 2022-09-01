import { IStringDict } from "./Global"

export interface IHotGame {
    [name: string]: IHotGames
}

export interface IGameData {
    [name: string]: ILeague
}

export interface ILeague {
    [name: string]: IGame
}

export interface IGame {
    gameType: string,
    gameDate: string,
    gameID: string,
    gameTime: string,
    league: IGameLanguage,
    leagueDefault: string
    leagueID: string,
    live: string,
    scoreA: number,
    scoreH: number,
    teamA: IGameLanguage,
    teamH: IGameLanguage,
    teamADefault: string
    teamHDefault: string
    site: ISite | {},
    status: IStatus
}

export interface IHotGames {
    gameType: string,
    gameDate: string,
    gameID: string,
    gameTime: string,
    league: IGameLanguage,
    leagueDefault: string
    leagueID: string,
    live: string,
    scoreA: number,
    scoreH: number,
    teamA: IGameLanguage,
    teamH: IGameLanguage,
    teamADefault: string
    teamHDefault: string
    site: ISite | {},
    status: IStatus
}

export interface ISite {
    [name: string]: ILiveSiteGame
}

export interface IOdds {
    ID: string,
    [name: string]: IOdd | string
}

export interface IOdd {
    [name: string]: string | number
}

export interface IStatus {
    [name: string]: string
}

export interface IReqApiLiveGame {
    gameType: string,
}

export interface IReqLiveGame {
    hourrange: 3 | 6 | 12 | 24
}

export interface ILiveGame {
    gameType: string
    gDate: string
    gTime: string
    id: string
    lid: string
    league: string
    leagueNameMap: IGameLanguage
    matchA: number
    matchH: number
    siteInfos: Array<ILiveSiteGame>
    status: number
    teamA: string
    teamANameMap: IGameLanguage
    teamH: string
    teamHNameMap: IGameLanguage
}

export interface IGameLanguage {
    "en-US": string | null
    "ja-JP": string | null
    "ko-KR": string | null
    "th-TH": string | null
    "vi-VN": string | null
    "zh-CN": string | null
    "zh-TW": string | null
}

export interface ILiveSiteGame {
    mainSpread: string
    match_A: number
    match_H: number
    site: string
    status: number
}

export interface IResApiGame {
    gameType: string
    gDate: string
    gTime: string
    id: string
    lid: string
    league: string
    leagueNameMap: IGameLanguage
    matchA: number
    matchH: number
    siteInfos: Array<ILiveSiteGame>
    status: number
    teamA: string
    teamANameMap: IGameLanguage
    teamH: string
    teamHNameMap: IGameLanguage
}

export interface ISiteGameDtos {
    gameDate: string
    gameID: string
    gameStatus: string
    gameTime: string
    league: string
    leagueID: string
    playByPlay: IPlayByPlay
    requestTime: number
    score1: number
    score2: number
    scores: number
    site: string
    team1: string
    team1ID: string
    team2: string
    team2ID: string
    odds: Array<ISiteOdds>
}

export interface IPlayByPlay {
    [name: string]: any
}

export interface ISiteOdds {
    playMode: string
    prices: Array<ISitePrices>
}

export interface ISitePrices {
    main: boolean
    spread: string
    odds: Array<ISiteOddInfo>
}

export interface ISiteOddInfo {
    odd: number
    oddType: string
}

export interface ITidyDataRes {
    liveDatas: IGameData
    leagueMapping: IStringDict
    gameMapping: IStringDict
}

export interface ITidyHotGameDataRes {
    hotGames: IHotGame
    gameMapping: IStringDict
}

export interface IWSData {
    GameType: string,
    Site: string,
    GameID: string,
    GameDate: string,
    GameTime: string,
    League: string,
    GameStatus: string,
    RequestTime: number,
    Scores: Array<IWSScores>,
    Team1: string,
    Team2: string,
    Score1: number,
    Score2: number,
    PlayByPlay: Array<IWSPlayByPlay> | null,
    Odds: Array<IWSOdds>
}

export interface IWSScores {
    Match: string,
    ScoreTeam1: number,
    ScoreTeam2: number
}

export interface IWSPlayByPlay {
    Key: string,
    Value: string,
}

export interface IWSOdds {
    PlayMode: string
    Prices: Array<IWSPrices>
}

export interface IWSPrices {
    Main: boolean
    Spread: string
    Odds: Array<IWSOddInfo>
}

export interface IWSOddInfo {
    Odd: number
    OddType: string
}