import Vue from 'vue';
import Router from '@/router';
import Store from '@/store';
import App from './App';

// 接口
import Api from '@/api';


Vue.prototype.$http = new Api();

new Vue({
    router: Router,
    store: Store,
    render: h => h(App),
    el: '#root'
});
