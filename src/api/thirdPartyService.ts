import { $http } from './http';

export const FacebookRequest = async (url: string) => {
    return await $http("GET", url, {});
}