import Analysis from '@/views/Analysis.vue'

export const analysis = {
    path: '/analysis',
    component: Analysis,
    children: [
        {
            path: '/analysis/overview/:gtype/:date/:lid',
            name: 'overview',
            component: () => import('@/views/analysis/Overview.vue'),
            meta: {
                "title": 'Overview'
            }
        },
        {
            path: '/analysis/match/:gtype/:date/:lid/:gid',
            name: 'match',
            component: () => import('@/views/analysis/HeadToHead.vue'),
            meta: {
                "title": 'Head to Head'
            }
        },
    ]
};
