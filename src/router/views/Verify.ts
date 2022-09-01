import Verify from '@/views/Verify.vue'

export const verify = {
    path: '/verify',
    component: Verify,
    children: [
        {
            path: '/verify/register',
            name: 'verifyregister',
            component: () => import('@/views/verify/Verify.vue'),
            meta: {
                "title": 'Validate'
            }
        },
        {
            path: '/verify/password',
            name: 'verifypassword',
            component: () => import('@/views/verify/SetPassword.vue'),
            meta: {
                "title": 'Forget Password'
            }
        },
    ]
};
