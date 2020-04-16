import Vue from 'vue';
import VueRouter from 'vue-router';
import Stroe from '@/store';
import Blog from './blog';
import { getSessionStorage } from '@/util/common';
Vue.use(VueRouter);

let Home = () => import('@/view/home');
let Layout = () => import('@/view/layout');
let Login = () => import('@/view/login');
let Notfount = () => import('@/view/notfount');

const router = new VueRouter({
    mode: 'history',
    base: 'backstage',
    routes: [
        {
            path: '/',
            name: 'Login',
            meta: {
                title: '用户登录'
            },
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '用户登录'
            },
            component: Login
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/entry',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home
                },
                {
                    path: 'login',
                    component: Login
                },
                ...Blog
            ]
        },
        {
            path: '*',
            name: 'Notfount',
            meta: {
                title: '404'
            },
            component: Notfount
        }
    ]
});

router.beforeEach((to, from, next) => {
    let id = getSessionStorage('id');
    let user = getSessionStorage('user' + id);
    if (user) {
        // 判断用户信息不存在  取出session 放入
        if (!Stroe.state.userinfo) {
            Stroe.commit('SET_USERINFO', { userinfo: user });
        }
        next();
    } else if (to.path === '/login') {
        next();
    } else {
        next('/login');
    }
});

export default router;
