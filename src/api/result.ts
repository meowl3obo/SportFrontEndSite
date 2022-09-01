import { IResultQuery } from '@/type/Result';
import { $priceCenterSite } from './http';
export const GetResults = async (gameQuery: IResultQuery) => {
    return await $priceCenterSite('GET', '/game/gameresult', {query: gameQuery})
}