import { IDict } from "./Global"

export interface IReqOnlyGame {
    gameType: string
    gameID: string
}

export interface IOdd {
    oddType: string,
    odd: number
}

export interface IPrice {
    originSpread: null | string,
    spread: string,
    main: boolean,
    odds: Array<IOdd>
}

export interface ISiteOdd {
    playMode: string,
    prices: Array<IPrice>
    suggest: null | string,
    ds: null | string
}
export interface ISiteDto {
    site: string,
    heartBeat: number,
    leagueID: string,
    league: string,
    team1ID: string,
    team1: string,
    team2ID: string,
    team2: string,
    gameDate: null,
    gameTime: null,
    gameID: string,
    score1: number,
    score2: number,
    isTrading: boolean,
    scores: null,
    gameStatus: string,
    playByPlay: null,
    requestTime: number,
    odds: Array<ISiteOdd>
    is2ndHalf: boolean,
    hadSwap: boolean
}

export interface ILiveDto {
    liveUrl: null,
    leagueID: string,
    league: string,
    team1ID: null,
    team1: string,
    team2ID: null,
    team2: string,
    gameDate: string,
    gameTime: string,
    gameID: string,
    score1: number,
    score2: number,
    gameStatus: string,
    siteGameDtos: Array<ISiteDto>
}

export interface IMapLang {
    en: string | null
    jp: string | null
    tw: string | null
    cn: string | null
}

export interface IMap {
    mapLang: IMapLang
}

export interface IOnlyGame {
    gameLiveDtos: Array<ILiveDto>
    code: number,
    message: string,
    leagueMap: IDict<IMap>,
    teamMap: IDict<IMap>,
    gameType: null,
    dateTime: null,
    gameDtos: null
}