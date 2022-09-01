import { $priceCenterSite } from './http';
import { IReqHeadToHead, IReqOverview } from '@/type/Analysis'

export const GetHeadToHead = async function (query: IReqHeadToHead) {
    const oneByOneData = await $priceCenterSite('GET', '/analysis/getheadtohead', { query: query });
    return oneByOneData;
}

export const GetOverview = async function (query: IReqOverview) {
    const overview = await $priceCenterSite('GET', '/analysis/getoverview', { query: query });
    return overview;
}

