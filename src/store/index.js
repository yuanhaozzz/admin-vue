import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userinfo: ''
    },
    getters: {
        getUser(state) {
            return state.userinfo;
        }
    },
    mutations: {
        SET_USERINFO(state, payload) {
            return (state.userinfo = payload.userinfo);
        }
    },
    actions: {}
});
