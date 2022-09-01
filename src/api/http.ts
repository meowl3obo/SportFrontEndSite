import axios, { Method } from 'axios';
import qs from 'qs';
import { allowedMethods, timeoutSec, headers, apiUrl, forumServiceApiUrl, formDataHeaders } from '@/config/global/Http';
const priceCenterAjax = axios.create({
    baseURL: apiUrl,
    headers: headers,
    timeout: timeoutSec * 1000
});

const forumServiceAjax = axios.create({
    baseURL: forumServiceApiUrl,
    headers: formDataHeaders,
    timeout: timeoutSec * 1000
});

const global = axios.create({
    headers: headers,
    timeout: timeoutSec * 1000
});
/**
 * HTTP請求
 * @param {string} method 請求方法
 * @param {string} url 請求路由
 * @param {object} payload 請求資料
 */

export async function $priceCenterSite(method: Method, url: string, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${ method }'`);
    }
    try {
        const response = await priceCenterAjax.request({
            url,
            method,
            data  : payload.body || null,
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        return err
    }
}

export async function $forumService(method: Method, url: string, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${ method }'`);
    }
    try {
        // console.log(formDataHeaders)
        const response = await forumServiceAjax.request({
            url,
            method,
            data  : qs.stringify(payload.body),
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        return err
    }
}

export async function $http(method: Method, url: string, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${ method }'`);
    }
    try {
        const response = await global.request({
            url,
            method,
            data  : payload.body || null,
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        return err
    }
}