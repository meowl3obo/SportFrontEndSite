import { IReqBuyTopic } from "@/type/Forum";
import { $forumService, $priceCenterSite } from "./http";
export const UpdateUserName = async function (account: string) {
    const formusUpdateUsernameRes = await $forumService(
        'POST',
        `/custom-includes/Service/Router.php`,
        {
            body: {
                account,
                action: 'updateNickName'
            }
        }
    );
    return formusUpdateUsernameRes;
}

export const Register = async function (account: string) {
    const forumsRegisterResponse = await $forumService(
        'POST',
        `/custom-includes/Service/Router.php`,
        {
            body: {
                account,
                action: 'Register'
            }
        }
    );
    return forumsRegisterResponse;
}

export const Heartbeat = async function () {
    const forumsRegisterResponse = await $forumService(
        'GET',
        `heart.php`,
    );
    return forumsRegisterResponse;
}

export const BuyArticle = async function (buyArticleData: IReqBuyTopic) { //購買文章
    const BuyArticleResult = await $priceCenterSite('POST', '/payment/buyarticles', { body: buyArticleData });
    return BuyArticleResult;
}