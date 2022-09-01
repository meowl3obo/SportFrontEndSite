'use strict';

function makeid(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

process.env.VUE_APP_VERSION = (new Date().getTime()) + '-' + makeid(8) + '-' + (new Date().toLocaleDateString());
// Vue.prototype.API =  process.env.NODE_ENV == 'production' ? '' : '';
module.exports = {
    productionSourceMap: false,
    publicPath : process.env.BASE_URL,
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8000,
        proxy: {
            "^/api": {
                target: `${process.env.VUE_APP_API_URL}`,
                pathRewrite: {
                    ['^' + "/api"]: ''
                },
                changeOrigin: true,
                headers: {
                    'X-Forwarded-For': '',
                },
                // logLevel: 'debug',
            },
            "^/forum/api": {
                target: `${process.env.VUE_APP_FORUM_SERVICE}`,
                pathRewrite: {
                    ['^' + "/forum/api"]: ''
                },
                changeOrigin: true,
                headers: {
                    'X-Forwarded-For': '',
                },
                // logLevel: 'debug',
            },
            "^/chat": {
                target: `${process.env.VUE_APP_CHAT}`,
                pathRewrite: {
                    ['^' + "/chat"]: ''
                },
                changeOrigin: true,
                headers: {
                    'X-Forwarded-For': '',
                },
                // logLevel: 'debug',
            }
        }
    }
};
