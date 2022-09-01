

export interface IResultQuery {
    gameType: string,
    date: string
}

export interface IResult {
    gameDate: string,
    gameID: string,
    gameStatus: string,
    gameTime: string,
    league: string,
    leagueID: string,
    score1: number,
    score2: number,
    team1: string,
    team1ID: string,
    team2: string,
    team2ID: string,
}