import { $priceCenterSite } from './http';
import { IReqOnlyGame } from '@/type/LiveChat'

export const GetOnlyGameData = async function (query: IReqOnlyGame) {
    const liveGameData = await $priceCenterSite('GET', '/game/onlygamedata', { query: query });
    return liveGameData;
}
