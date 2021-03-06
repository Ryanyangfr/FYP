import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersist({ // The key to store the state on in the storage provider.
  // key: 'engaging_u',
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export const store = new Vuex.Store({
  state: {
    // hasActiveTrail: false,
    currentTrailID: '-',
    showSidebar: false,
    selectedQuizID: 0,
    selectedQuizTitle: '',
    selectedWefieTitle: '',
    selectedWefieID: 0,
    selectedWefieQuestion: '',
    selectedTrailID: '',
    selectedNarrativeID: 0,
    selectedNarrativeTitle: '',
    selectedNarrative: '',
    selectedHotspotName: '',
    selectedLat: '',
    selectedLng: '',
    selectedDragAndDropID: '',
    selectedDragAndDropMissionID: '',
    selectedDragAndDropTitle: '',
    selectedDragAndDropQuestion: '',
    selectedDrawingTitle: '',
    selectedDrawingID: 0,
    selectedDrawingQuestion: '',
    selectedAnagramTitle:'',
    selectedAnagramWord:'',
    selectedAnagramID: 0,
    selectedWordsearchTitle:'',
    selectedWords:[],
    selectedWordsearchID: 0,
    instanceStartTime: '',
    trailStartTime: '',
    selectedMissionTrailID: 0,
    currentNumTeams:0,
    currentTrail:''

  },
    
  mutations: {
    saveCurrentTrailID (state, trailID) {
      state.currentTrailID = trailID;
    },

    // changeHasActiveTrailState(state){
    //     state.hasActiveTrail = !(state.hasActiveTrail)
    // },

    changeSideBarState (state) {
      state.showSidebar = !(state.showSidebar)
    },

    resetSideBar (state) {
      state.showSidebar = false;
    },

    saveSelectedQuizID (state, missionid) {
      state.selectedQuizID = missionid;
    },

    saveSelectedQuizTitle (state, missiontitle) {
      state.selectedQuizTitle = missiontitle;
    },

    saveSelectedWefieTitle (state, wefieTitle) {
      state.selectedWefieTitle = wefieTitle
    },

    saveSelectedWefieID (state, wefieID) {
      state.selectedWefieID = wefieID
    },

    saveSelectedWefieQuestion (state, wefieQuestion) {
      state.selectedWefieQuestion = wefieQuestion
    },

    saveSelectedTrailID (state, trailID) {
      state.selectedTrailID = trailID
    },

    saveSelectedNarrativeID (state, narrativeID) {
      state.selectedNarrativeID = narrativeID
    },
        
    saveSelectedNarrativeTitle (state, narrativeTitle) {
      state.selectedNarrativeTitle = narrativeTitle
    },

    saveSelectedNarrative (state, narrative) {
      state.selectedNarrative = narrative
    },

    saveSelectedHotspotName (state, hotspotName) {
      state.selectedHotspotName = hotspotName
    },
        
    saveSelectedLat (state, lat) {
      state.selectedLat = lat
    },

    saveSelectedLng (state, lng) {
      state.selectedLng = lng
    },

    saveSelectedDragAndDropID (state, id) {
      state.selectedDragAndDropID = id
    },

    saveSelectedDragAndDropQuestion (state, question) {
      state.selectedDragAndDropQuestion = question
    },

    saveSelectedDragAndDropTitle (state, title) {
      state.selectedDragAndDropTitle = title
    },

    saveSelectedDragAndDropMissionID (state, missionID) {
      state.selectedDragAndDropMissionID = missionID
    },

    saveSelectedDrawingTitle (state, drawingTitle) {
      state.selectedDrawingTitle = drawingTitle
    },

    saveSelectedDrawingID (state, drawingID) {
      state.selectedDrawingID = drawingID
    },

    saveSelectedDrawingQuestion (state, drawingQuestion) {
      state.selectedDrawingQuestion = drawingQuestion
    },

    saveSelectedAnagramTitle (state, anagramTitle) {
      state.selectedAnagramTitle = anagramTitle
    },

    saveSelectedAnagramWord (state, word) {
      state.selectedAnagramWord = word
    },

    saveSelectedAnagramID (state, anagramID) {
      state.selectedAnagramID = anagramID
    },

    saveSelectedWordsearchTitle (state, wordsearchTitle) {
      state.selectedWordsearchTitle = wordsearchTitle
    },

    saveSelectedWords (state,words) {
      state.selectedWords = words
    },

    saveSelectedWordsearchID (state,wordsearchID) {
      state.selectedWordsearchID = wordsearchID
    },

    saveInstanceStartTime (state, startTime) {
      state.instanceStartTime = startTime
    },

    saveTrailStartTime (state, startTime) {
      state.trailStartTime = startTime
    },
    
    saveMissionTrailID(state,missionTrailID){
      state.selectedMissionTrailID = missionTrailID
    },

    saveCurrentTrail(state, trail){
      state.currentTrail = trail
    },

    saveCurrentNumTeams(state, numTeams){
      state.currentNumTeams = numTeams
    }
  },
  plugins: [vuexLocal.plugin]
});