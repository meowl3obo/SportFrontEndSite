import Live from '@/views/Live.vue'

export const live = {
    path: '/livechat/:gtype/:gid',
    component: Live,
    name: 'livechat',
    meta: {
        "title": 'Live Chat'
    }
};
