import { $priceCenterSite } from './http';
import { IReqApiLiveGame, IReqLiveGame } from '@/type/Game'
export const HotGame = async () => {
    const hotGameData = await $priceCenterSite('GET', '/game/hotgame', {});
    return hotGameData;
}

export const LiveGame = async (requestData: IReqApiLiveGame) => {
    const liveGameData = await $priceCenterSite('GET', '/game/gamedata', { query: requestData });
    return liveGameData;
}

export const GetLiveGame = async (gameType: string, query: IReqLiveGame) => {
    const liveGameData = await $priceCenterSite('GET', `/game/live/${gameType}`, { query: query });
    return liveGameData;
}