import { $priceCenterSite } from './http';
import { IRequestAdvData } from '@/type/Adv'

export const GetAdvData = async function (query: IRequestAdvData) {
    const hotGameData = await $priceCenterSite('GET', '/adv/advertisingData', { query: query });
    return hotGameData;
}
