import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showSidebar: false,
        selectedQuizID: 0,
        selectedQuizTitle: "",
        selectedWefieTitle:"",
        selectedWefieID:0,
        selectedWefieQuestion:""

    },
    
    mutations: {
        changeSideBarState(state) {
            state.showSidebar = !(state.showSidebar)
        },

        resetSideBar(state){
            state.showSidebar = false;
        },

        saveSelectedQuizID(state, missionid){
            state.selectedQuizID = missionid;
        },

        saveSelectedQuizTitle(state, missiontitle){
            state.selectedQuizTitle = missiontitle;
        },

        saveSelectedWefieTitle(state, wefieTitle){
            state.selectedWefieTitle = wefieTitle
        },

        saveSelectedWefieID(state, wefieID){
            state.selectedWefieID = wefieID
        },

        saveSelectedWefieQuestion(state, wefieQuestion){
            state.selectedWefieQuestion = wefieQuestion
        }
    }
});