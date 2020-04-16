/**
 * 推荐文章
 */
let recommendArticle = () => import('@/view/blog/recommend-article');

let recommendArticleAdd = () =>
    import('@/view/blog/recommend-article/component/Add.vue');

let recommendArticleEdit = () =>
    import('@/view/blog/recommend-article/component/Edit.vue');

/**
 * 热门文章
 */
let hotArticle = () => import('@/view/blog/hot-article');

let hotArticleAdd = () => import('@/view/blog/hot-article/component/Add.vue');

let hotArticleEdit = () => import('@/view/blog/hot-article/component/Edit.vue');
export default [
    /**
     * 推荐文章
     */
    {
        path: '/entry/recommend',
        name: 'recommendArticle',
        meta: {
            title: '推荐文章'
        },
        component: recommendArticle
    },
    {
        path: '/entry/recommend/add',
        name: 'recommendArticleAdd',
        meta: {
            title: '推荐文章新增'
        },
        component: recommendArticleAdd
    },
    {
        path: '/entry/recommend/edit',
        name: 'recommendArticleEdit',
        meta: {
            title: '推荐文章编辑'
        },
        component: recommendArticleEdit
    },
    /**
     * 热门文章
     */
    {
        path: '/entry/hot',
        name: 'hotArticle',
        meta: {
            title: '推荐文章'
        },
        component: hotArticle
    },
    {
        path: '/entry/hot/add',
        name: 'hotArticleAdd',
        meta: {
            title: '推荐文章新增'
        },
        component: hotArticleAdd
    },
    {
        path: '/entry/hot/edit',
        name: 'hotArticleEdit',
        meta: {
            title: '推荐文章编辑'
        },
        component: hotArticleEdit
    }
];
