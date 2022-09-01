export const allowedMethods = ['HEAD', 'GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'];

export const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'charset': 'utf-8'
};

export const timeoutSec = 30;

export const apiUrl = process.env.VUE_APP_API_URL;
// export const apiUrl = "/api";
export const forumServiceApiUrl = process.env.VUE_APP_FORUM_SERVICE;
// export const forumServiceApiUrl = "/forum/api";

export const formDataHeaders = {
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    'charset': 'utf-8'
};