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
        selectedWefieQuestion:"",
        selectedTrailID:"",
        selectedNarrativeID: 0,
        selectedNarrativeTitle:"",
        selectedNarrative:"",
        selectedHotspotName: "",
        selectedLat: "",
        selectedLng: "",
        selectedDragAndDropID: "",
        selectedDragAndDropMissionID: "",
        selectedDragAndDropTitle: "",
        selectedDragAndDropQuestion: "",
        selectedDrawingTitle:"",
        selectedDrawingID:0,
        selectedDrawingQuestion:""

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
        },

        saveSelectedTrailID(state, trailID){
            state.selectedTrailID = trailID
        },

        saveSelectedNarrativeID(state, narrativeID){
            state.selectedNarrativeID = narrativeID;
        },
        
        saveSelectedNarrativeTitle(state, narrativeTitle){
            state.selectedNarrativeTitle = narrativeTitle
        },

        saveSelectedNarrative(state, narrative){
            state.selectedNarrative = narrative
        },

        saveSelectedHotspotName(state, hotspotName){
            state.selectedHotspotName = hotspotName;
        },
        
        saveSelectedLat(state, lat){
            state.selectedLat = lat
        },

        saveSelectedLng(state, lng){
            state.selectedLng = lng
        },

        saveSelectedDragAndDropID(state, id){
            state.selectedDragAndDropID = id;
        },

        saveSelectedDragAndDropQuestion(state, question){
            state.selectedDragAndDropQuestion = question;
        },

        saveSelectedDragAndDropTitle(state, title){
            state.selectedDragAndDropTitle = title;
        },

        saveSelectedDragAndDropMissionID(state, missionID){
            state.selectedDragAndDropMissionID = missionID;
        },

        saveSelectedDrawingTitle(state, drawingTitle){
            state.selectedDrawingTitle = drawingTitle
        },

        saveSelectedDrawingID(state, drawingID){
            state.selectedDrawingID = drawingID
        },

        saveSelectedDrawingQuestion(state, drawingQuestion){
            state.selectedDrawingQuestion = drawingQuestion
        },

    }
});