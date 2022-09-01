import DocsTemplate from '@/views/Docs.vue';

export const docs = {
    path: '/docs',
    component: DocsTemplate,
    children: [
        {
            path: `/docs/:page`,
            name: 'docs',
            component: DocsTemplate,
            meta: {
                "title": 'Docs'
            }
        },
    ]
};
