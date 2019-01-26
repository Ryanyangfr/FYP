import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showSidebar: false
    },
    
    mutations: {
        changeSideBarState(state) {
            state.showSidebar = !(state.showSidebar)
        }
    }
});