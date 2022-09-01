import { $priceCenterSite } from './http';
import { IPaymentPlanQuery, IStoredBody, ISubscribeBody, IBalanceQuery, IPointLogQuery, IStoredLogQuery } from '@/type/Payment'
import { IDict } from '@/type/Global';

export const PointLog = async (requestData: IPointLogQuery) => { //交易紀錄
    const PointLogData = await $priceCenterSite('GET', '/payment/getpaylog', {query: requestData});
    return PointLogData;
}

export const StoredLog = async (requestData: IStoredLogQuery) => { //儲值紀錄
    const StoredLogData = await $priceCenterSite('GET', '/payment/getstoredlog', {query: requestData});
    return StoredLogData;
}

export const GetMemberBalance = async (query: IBalanceQuery) => {//查詢餘額
    const MemberBalanceData = await $priceCenterSite('GET', '/payment/getmemberbalance', {query: query});
    return MemberBalanceData;
}

export const GetPaymentPlan = async (query: IPaymentPlanQuery) => {//取得方案
    const PaymentPlanData = await $priceCenterSite('GET', '/payment/getpaymentplan', {query: query});
    return PaymentPlanData;
}

export const MemberArticle = async (requestData: IDict<string | number>) => {//是否購買文章
    const MemberArticleData = await $priceCenterSite('GET', '/payment/getmemberarticle', {query: requestData});
    return MemberArticleData;
}

// export const MemberAllArticle = async (requestData) => {//全部已買文章
//     const MemberAllArticleData = await $priceCenterSite('GET', '/payment/getmemberallarticle', {query: requestData});
//     return MemberAllArticleData;
// }

export const StoredValue = async (storedValueData: IStoredBody) => { //儲值
    const StoredValueResult = await $priceCenterSite('POST', '/payment/storedvalue', { body: storedValueData });
    return StoredValueResult;
}

export const Subscribe = async (subscribeData: ISubscribeBody) => { //訂閱
    const SubscribeResult = await $priceCenterSite('POST', '/payment/subscribe', { body: subscribeData });
    return SubscribeResult;
}