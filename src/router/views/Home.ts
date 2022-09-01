import Home from '@/views/Home.vue'

export const home = {
    path: '/',
    component: Home,
    children: [
        {
            path: ':id',
            props: (route: any) => ({ id: route.params.id || 'Live' }),
            name: 'maincontent',
            component: Home,
            meta: {
                "title": 'Home'
            }
        },
    ]
};
