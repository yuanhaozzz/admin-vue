import Vue from 'vue';
import Vuex from 'vuex';


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
