import { IDict } from "./Global"

export interface IReqHeadToHead {
    date: string
    gameType: string
    gameID: string
    leagueID: string
}

export interface IHeadToHeadData {
    status: IHeadToHeadStatus
    recentGame: Array<IHeadToHeadGame>
    beforeGame: IHeadToHeadGames
    afterGame: IHeadToHeadGames

}

export interface IHeadToHeadStatus {
    gameDate: string
    gameTime: string
    teamH: IHeadToHeadStatusTeam
    teamA: IHeadToHeadStatusTeam
}

export interface IHeadToHeadStatusTeam {
    name: string
    hightscore: string
    avgscore: string
    recentStatus: Array<string>
}

export interface IHeadToHeadGames {
    teamH: Array<IHeadToHeadGame>
    teamA: Array<IHeadToHeadGame>
}

export interface IHeadToHeadGame {
    gameDate: string
    gameTime: string
    teamH: string
    teamA: string
    scoreH: number
    scoreA: number
}

export interface IReqOverview {
    date: string
    leagueID: string
    gameType: string
}

export interface IOverviewData {
    dashboard: IDict<Array<IOverviewDashborad>>
    beforegame: Array<IOverviewGame>
    aftergame: Array<IOverviewGame>
}

export interface IOverviewDashborad {
    name: string,
    win: number,
    lose: number,
    draw: number,
    conf: string,
    Conf: string,
    div: string,
    home: string,
    road: string,
}

export interface IOverviewGame {
    gameDate: string,
    gameTime: string,
    teamH: string,
    teamA: string,
    scoreH: number,
    scoreA: number,
}