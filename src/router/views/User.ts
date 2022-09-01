import User from '@/views/User.vue'

export const user = {
    path: '/user',
    component: User,
    children: [
        {
            path: '/user/profile',
            name: 'profile',
            component: () => import('@/views/user/Profile.vue'),
            meta: {
                "title": 'Profile'
            }
        },
        {
            path: '/user/order',
            name: 'order',
            component: () => import('@/views/user/Order.vue'),
            meta: {
                "title": 'Order'
            }
        },
    ]
};
