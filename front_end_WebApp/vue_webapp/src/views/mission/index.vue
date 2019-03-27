<template>
    <div class="Missions">
        <div class="card">
            <div class="card-title">
                <h5>Missions List</h5>
                <button class="create-mission-btn"><router-link to='/addMission'><i class="ti-plus"></i>ADD MISSION</router-link></button>
            </div>

            <!--table for mission: quiz begins-->
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Quiz Title</td>
                    <td>Questions</td>
                    <td>Details</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class="quiz-data" v-for="quiz in missionList" :key="quiz.mission_id">
                    <td>{{quiz.mission_title}}</td>
                    <td>
                        <div v-for="(question,index) in quiz.questions" :key="question.quiz_id">
                            {{index+1}}. 
                            {{question.question}}
                            
                        </div>  
                    </td>
                    <td><button class="view-quiz-btn" @click="saveSelectedQuiz(quiz.mission_id, quiz.mission_title)"><router-link to='/viewQuiz'>View full details</router-link></button></td>
                    <td>
                        <button @click="saveSelectedQuiz(quiz.mission_id, quiz.mission_title)"><router-link to='/editQuiz'><i class="ti-pencil-alt"></i></router-link></button>
                    </td>
                    <td>
                        <button @click="deleteQuiz(quiz.mission_id, quiz.mission_title)"><i class="ti-trash"></i></button>
                    </td>
                </tr>
                
            </table>
            <!--table for mission: quiz ends-->

            <br>

            <!--table for mission: wefie begins-->
            <table>
                <tr class="mission-table-header">
                    <td>Wefie Title</td>
                    <td>Wefie Question</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "wefie-data" v-for="wefie in wefieQuestionList" :key="wefie.wefie_id">
                    <td>{{wefie.title}}</td>
                    <td>{{wefie.wefie_question}}</td>
                    <td>
                        <button @click="saveSelectedWefie(wefie.title, wefie.wefie_question, wefie.wefie_id)">
                            <router-link to='/editWefie'>
                            <i class="ti-pencil-alt"></i>
                            </router-link>
                        </button>
                    </td>
                    <td><button @click="deleteWefie(wefie.title, wefie.wefie_id)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <!--table for mission: wefie ends-->

            <br>

            <!--table for mission: drag and drop begins-->
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Drag And Drop Title</td>
                    <td>Question</td>
                    <!-- <td>Details</td> -->
                    <td>Words To Match</td>
                    <td>Answers</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "draganddrop-data" v-for="draganddrop in dragAndDropList" :key="draganddrop.id">
                    <td>{{draganddrop.title}}</td>
                    <td>{{draganddrop.question}}</td>
                    <td>
                        <div v-for="option in draganddrop.options" :key="option.option">
                            {{option.option}}    
                        </div>
                    </td>
                    <td>
                        <div v-for="option in draganddrop.options" :key="option.option">
                            {{option.answer}}    
                        </div>
                    </td>
                    <!-- <td><button class="view-quiz-btn" @click="saveSelectedDragAndDrop(dragandrop.title, dragandrop.question, draganddrop.id)"><router-link to='/viewDragAndDrop'>View full details</router-link></button></td> -->
                    <td>
                        <button @click="saveSelectedDragAndDrop(draganddrop.title, draganddrop.missionID, draganddrop.question, draganddrop.id)">
                            <router-link to='/editDragAndDrop'>
                            <i class="ti-pencil-alt"></i>
                            </router-link>
                        </button>
                    </td>
                    <td><button @click="deleteDragAndDrop(draganddrop.title, draganddrop.missionID, draganddrop.id)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <!--table for mission: draganddrop ends-->

            <!-- table for mission: drawing starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Drawing Title</td>
                    <td>Drawing Question</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "drawing-data" v-for="drawing in drawingQuestionList" :key="drawing.drawing_id">
                    <td>{{drawing.title}}</td>
                    <td>{{drawing.drawing_question}}</td>
                    <td>
                        <button @click="saveSelectedDrawing(drawing.title, drawing.drawing_question, drawing.drawing_id)">
                            <router-link to='/editDrawing'>
                            <i class="ti-pencil-alt"></i>
                            </router-link>
                        </button>
                    </td>
                    <td><button @click="deleteDrawing(drawing.title, drawing.drawing_id)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <!-- table for mission: drawing ends -->

            <!-- table for anagram: anagram starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Anagram Title</td>
                    <td>Word</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "anagram-data" v-for="anagram in anagramList" :key="anagram.anagram_id">
                    <td>{{anagram.title}}</td>
                    <td>{{anagram.word}}</td>
                    <td>
                        <button @click="saveSelectedAnagram(anagram.title, anagram.word, anagram.anagram_id)">
                            <router-link to='/editAnagram'>
                            <i class="ti-pencil-alt"></i>
                            </router-link>
                        </button>
                    </td>
                    <td><button @click="deleteAnagram(anagram.title, anagram.anagram_id)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <!-- table for mission: anagram ends -->

            <!-- table for mission: wordsearch starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Wordsearch Title</td>
                    <td>Words</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "wordsearch-data" v-for="wordsearch in wordsearchList" :key="wordsearch.title">
                    <td>{{wordsearch.title}}</td>
                    <td>
                        <div v-for="wordsearchWord in wordsearch.words" :key="wordsearchWord.word">{{wordsearchWord.word}}</div>
                    </td>
                    <td>
                        <button @click="saveSelectedWordsearch(wordsearch.title, wordsearch.words, wordsearch.wordsearch_id)">
                            <router-link to='/editWordsearch'>
                            <i class="ti-pencil-alt"></i>
                            </router-link>
                        </button>
                    </td>
                    <td><button @click="deleteWordsearch(wordsearch.title, wordsearch.wordsearch_id)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <!-- table for mission: wordsearch ends -->
            
        </div>

        <!--delete quiz popup begins-->
        <!--shows when user clicks on delete icon for quiz. showDeleteQuiz = true-->
        <div class="black-blur-bg" v-if="showDeleteQuiz"> 
            <div class="delete-quiz-popup">
                <div class="delete-quiz-header">
                    <h5>Delete</h5>
                    <button class="close-delete-quiz" @click="closeDeleteQuiz()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-quiz-body" @submit="onSubmitToDeleteQuiz">
                    <div class="delete-quiz-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div class="btm-header"><hr></div>-->
                    <div class="delete-quiz-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteQuiz()">Cancel</button>
                        <button type="submit" class="delete-quiz-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

         <div class="black-blur-bg" v-if="quizDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <hr>
                
                <div><h6>{{quizDeleteMessage}}</h6></div>
                <div><hr></div>
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="quizCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
            </div>
        </div>
        <!--delete quiz popup ends-->

        <!--delete wefie popup begins-->
        <!--shows when user clicks on delete icon for wefie. showDeleteWefie = true-->
        <div class="black-blur-bg" v-if="showDeleteWefie"> 
            <div class="delete-wefie-popup">
                <div class="delete-wefie-header">
                    <h5>Delete</h5>
                    <button class="close-delete-wefie" @click="closeDeleteWefie()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-wefie-body" @submit="onSubmitToDeleteWefie">
                    <div class="delete-wefie-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="delete-wefie-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteWefie()">Cancel</button>
                        <button type="submit" class="delete-wefie-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="wefieDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <!--<hr>-->
                
                <div class="delete-quiz-content"><h6>{{wefieDeleteMessage}}</h6></div>
                <!--<div><hr></div>-->
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="wefieCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete wefie popup ends-->

        <!--delete drag and drop popup begins-->
        <!--shows when user clicks on delete icon for drag and drop. showDeleteDragDrop = true-->
        <div class="black-blur-bg" v-if="showDeleteDragDrop"> 
            <div class="delete-dragdrop-popup">
                <div class="delete-dragdrop-header">
                    <h5>Delete</h5>
                    <button class="close-delete-dragdrop" @click="closeDeleteDragDrop()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-dragdrop-body" @submit="onSubmitToDeleteDragDrop">
                    <div class="delete-dragdrop-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="delete-dragdrop-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteDragDrop()">Cancel</button>
                        <button type="submit" class="delete-dragdrop-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="dragAndDropDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <!--<hr>-->
                <div><h6>{{dragAndDropDeleteMessage}}</h6></div>
                <!--<div><hr></div>-->
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="dragDropCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete drag drop popup ends-->

        <!--delete drawing popup begins-->
        <!--shows when user clicks on delete icon for drawing. showDeleteDrawing = true-->
        <div class="black-blur-bg" v-if="showDeleteDrawing"> 
            <div class="delete-drawing-popup">
                <div class="delete-drawing-header">
                    <h5>Delete</h5>
                    <button class="close-delete-drawing" @click="closeDeleteDrawing()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-drawing-body" @submit="onSubmitToDeleteDrawing">
                    <div class="delete-drawing-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="delete-drawing-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteDrawing()">Cancel</button>
                        <button type="submit" class="delete-drawing-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="drawingDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <!--<hr>-->
                
                <div class="delete-quiz-content"><h6>{{drawingDeleteMessage}}</h6></div>
                <!--<div><hr></div>-->
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="drawingCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete drawing popup ends-->

        <!--delete anagram popup begins-->
        <!--shows when user clicks on delete icon for anagram. showDeleteAnagram = true-->
        <div class="black-blur-bg" v-if="showDeleteAnagram"> 
            <div class="delete-anagram-popup">
                <div class="delete-anagram-header">
                    <h5>Delete</h5>
                    <button class="close-delete-anagram" @click="closeDeleteAnagram()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-anagram-body" @submit="onSubmitToDeleteAnagram">
                    <div class="delete-anagram-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="delete-anagram-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteAnagram()">Cancel</button>
                        <button type="submit" class="delete-anagram-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="anagramDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <!--<hr>-->
                
                <div class="delete-quiz-content"><h6>{{anagramDeleteMessage}}</h6></div>
                <!--<div><hr></div>-->
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="anagramCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete anagram popup ends-->

        <!--delete wordsearch popup begins-->
        <!--shows when user clicks on delete icon for wordsearch. showDeleteWordsearch = true-->
        <div class="black-blur-bg" v-if="showDeleteWordsearch"> 
            <div class="delete-wordsearch-popup">
                <div class="delete-wordsearch-header">
                    <h5>Delete</h5>
                    <button class="close-delete-wordsearch" @click="closeDeleteWordsearch()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <form class="delete-wordsearch-body" @submit="onSubmitToDeleteWordsearch">
                    <div class="delete-wordsearch-content"><h6>Are you sure you want to delete "{{this.titleToBeDeleted}}"?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="delete-wordsearch-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteWordsearch()">Cancel</button>
                        <button type="submit" class="delete-wordsearch-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="wordsearchDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <!--<hr>-->
                
                <div class="delete-quiz-content"><h6>{{wordsearchDeleteMessage}}</h6></div>
                <!--<div><hr></div>-->
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="wordsearchCloseDeleteMessage()">Close</button>
                </div>
               
            </div>
        </div>
        <!--delete wordsearch popup ends-->
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "mission",

    computed: {
        selectedQuizID(){
            return this.$store.state.selectedQuizID;
            // console.log(this.$store.state.selectedQuiz);
        },

        selectedQuizTitle(){
            return this.$store.state.selectedQuizTitle;
            // console.log(this.$store.state.selectedQuiz);
        },

        selectedWefieTitle(){
            return this.$store.state.selectedWefieTitle
        },

        selectedWefieID(){
            return this.$store.state.selectedWefieID
        },

        selectedWefieQuestion(){
            return this.$store.state.selectedWefieQuestion
        },

        selectedDragAndDropID(){
            return this.$store.state.selectedDragAndDropID
        },

        selectedDragAndDropQuestion(){
            return this.$store.state.selectedDragAndDropQuestion
        },

        selectedDragAndDropTitle(){
            return this.$store.state.selectedDragAndDropTitle
        },

        selectedDragAndDropMissionID(){
            return this.$store.state.selectedDragAndDropMissionID
        },

        selectedDrawingTitle(){
            return this.$store.state.selectedDrawingTitle
        },

        selectedDrawingID(){
            return this.$store.state.selectedDrawingID
        },

        selectedDrawingQuestion(){
            return this.$store.state.selectedDrawingQuestion
        },

        selectedAnagramTitle(){
            return this.$store.state.selectedAnagramTitle
        },

        selectedAnagramWord(){
            return this.$store.state.selectedAnagramWord
        },

        selectedAnagramID(){
            return this.$store.state.selectedAnagramID
        },

        selectedWordsearchTitle(){
            return this.$store.state.selectedWordsearchTitle
        },

        selectedWords(){
            return this.$store.state.selectedWords
        },

        selectedWordsearchID(){
            return this.$store.state.selectedWordsearchID
        }

        

    }, 
    data() {
        return{
            // mission: "",
            // missionToEdit: "",
            // questionList: [],
            // questionToBeEdited: "",
            // title: "",

            //quiz
            quiz: [],
            missionList: [],
            
            //wefie
            wefie_question: "",
            wefieQuestionList: [],
            wefieID: "",

            //draganddrop
            dragAndDropList: [],

            //drawing
            drawingQuestionList: [],

            //anagram
            anagramList: [],

            //wordsearch
            wordsearchList: [],
            
            //delete variables
            showDeleteQuiz: false,
            missionIDToBeDeleted:0,
            titleToBeDeleted:"",
            showDeleteWefie: false,
            wefieIDToBeDeleted:0,
            quizDeleteMessage: "",
            quizCloseMessage: false,
            wefieDeleteMessage: "",
            wefieCloseMessage: false,
            // showDeleteDragAndDrop: false,
            dragAndDropDeleteMessage: "",
            dragAndDropCloseMessage:false,
            showDeleteDragDrop: false,
            dragDropMissionIDToBeDeleted: 0,
            dragDropIDToBeDeleted: 0,
            drawingIDToBeDeleted: 0,
            showDeleteDrawing: false,
            drawingDeleteMessage: "",
            drawingCloseMessage: false,
            showDeleteAnagram: false,
            anagramDeleteMessage: "",
            anagramCloseMessage: false,
            anagramIDToBeDeleted: 0,
            showDeleteWordsearch: false,
            wordsearchDeleteMessage: "",
            wordsearchIDToBeDeleted: 0,
        }
    }, 
    components:{
        vSelect
    },
    methods: {
        //store to vuex store methods:
        saveSelectedQuiz(missionid, missiontitle){
            this.$store.commit('saveSelectedQuizID', missionid);
            this.$store.commit('saveSelectedQuizTitle', missiontitle)
        },

        saveSelectedWefie(mission_title, wefie_question, wefie_id){
            this.$store.commit('saveSelectedWefieTitle', mission_title);
            this.$store.commit('saveSelectedWefieQuestion', wefie_question);
            this.$store.commit('saveSelectedWefieID', wefie_id);
        },

        saveSelectedDragAndDrop(mission_title, missionID, question, id){
            // console.log(mission_title)
            // console.log(missionID)
            // console.log(id)
            // console.log(question)
            this.$store.commit('saveSelectedDragAndDropTitle', mission_title);
            this.$store.commit('saveSelectedDragAndDropQuestion', question);
            this.$store.commit('saveSelectedDragAndDropID', id);
            this.$store.commit('saveSelectedDragAndDropMissionID', missionID);
        },

        saveSelectedDrawing(drawing_title, drawing_question, drawing_id){
            this.$store.commit('saveSelectedDrawingTitle', drawing_title);
            this.$store.commit('saveSelectedDrawingQuestion', drawing_question);
            this.$store.commit('saveSelectedDrawingID', drawing_id);
        },

        saveSelectedAnagram(anagram_title, anagram_word, anagram_id){
            this.$store.commit('saveSelectedAnagramTitle', anagram_title);
            this.$store.commit('saveSelectedAnagramID', anagram_id);
            this.$store.commit('saveSelectedAnagramWord', anagram_word);
        },

        saveSelectedWordsearch(wordsearch_title, wordsearch_words, wordsearch_id){
            this.$store.commit('saveSelectedWordsearchTitle', wordsearch_title);
            this.$store.commit('saveSelectedWords', wordsearch_words);
            this.$store.commit('saveSelectedWordsearchID', wordsearch_id);
        },
        //store to vuex store methods ends 
        
        fetchMissions(){
            // console.log('entered')
            this.missionList = [];
            axios.get('//54.255.245.23:3000/mission/getMissionQuiz')
            .then(response =>{
                var data = response.data;
                // console.log(data)
                for(var index in data){
                    // console.log(index)
                    this.missionList.push({label: data[index].title, value: data[index].mission});
                }
            })
        },

        getMissionQuizQuestions(missionid, mission){
            axios.get('//54.255.245.23:3000/quiz/getQuizQuestion?mission=' + missionid)
                .then(response =>{
                    // console.log(data[index].mission);
                    var data = response.data;
                    console.log(data);
                    // for(var index in data){
                        // console.log(data[index])
                    this.missionList.push({mission_id: missionid, mission_title: mission.title, questions: data});
                    // }
                })

                console.log(this.missionList)
        },

        // delete methods:
        deleteQuiz(mission_id, mission_title){
            this.missionIDToBeDeleted = mission_id;
            this.titleToBeDeleted = mission_title;

            if(this.showDeleteQuiz){
                this.showDeleteQuiz = false;
            } else{
                this.showDeleteQuiz = true;
            }
            //console.log(this.missionIDToBeDeleted)
        },

        onSubmitToDeleteQuiz(){
            var postBody = {
                "mission_id": this.missionIDToBeDeleted
            }
            
            axios.post('//54.255.245.23:3000/delete/deleteQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.quizDeleteMessage = "Quiz Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.quizDeleteMessage = "Error Please Remove Quiz From All Existing Trails"
                }
            })

            if(this.showDeleteQuiz){
                this.showDeleteQuiz = false;
            } else{
                this.showDeleteQuiz = true;
            }
            
            // location.reload();
        },

        closeDeleteQuiz(){
             if(this.showDeleteQuiz){
                this.showDeleteQuiz = false;
            } else{
                this.showDeleteQuiz = true;
            }
        },

        quizCloseDeleteMessage(){
            this.showDeleteQuiz = false;
            this.quizCloseMessage = true;
            if( this.quizDeleteMessage === "Quiz Successfully Deleted") {
                this.quizDeleteMessage = "";
                this.$router.go();
            }
            this.quizDeleteMessage = "";
        },

        deleteWefie(wefie_title, wefie_id){
            this.wefieIDToBeDeleted = wefie_id;
            this.titleToBeDeleted = wefie_title;

            if(this.showDeleteWefie){
                this.showDeleteWefie = false;
            } else{
                this.showDeleteWefie = true;
            }
            //console.log(this.missionIDToBeDeleted)
            
        },

        wefieCloseDeleteMessage(){
            this.showDeleteWefie = false;
            this.wefieCloseMessage = true;
            if( this.wefieDeleteMessage === "Wefie Question Successfully Deleted") {
                this.wefieDeleteMessage = "";
                this.$router.go();
            }
            this.wefieDeleteMessage = "";
        },

        onSubmitToDeleteWefie(){
            var postBody = {
                "id": this.wefieIDToBeDeleted
            }
            
            axios.post('//54.255.245.23:3000/delete/deleteWefieQuestion', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.wefieDeleteMessage ="Wefie Question Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.wefieDeleteMessage = "Error Please Remove Wefie Question From All Existing Trails";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteWefie){
                this.showDeleteWefie = false;
            } else{
                this.showDeleteWefie = true;
            }
            
            // location.reload();
        },

        closeDeleteWefie(){
             if(this.showDeleteWefie){
                this.showDeleteWefie = false;
            } else{
                this.showDeleteWefie = true;
            }
        },

        deleteDragAndDrop(draganddrop_title, dragdrop_mission_id, draganddrop_id){
            this.titleToBeDeleted = draganddrop_title;
            this.dragDropMissionIDToBeDeleted = dragdrop_mission_id;
            this.dragDropIDToBeDeleted = draganddrop_id;

            if(this.showDeleteDragDrop){
                this.showDeleteDragDrop = false;
            } else{
                this.showDeleteDragDrop = true;
            }
        },

        onSubmitToDeleteDragDrop(){
            var postBody = {
                "id": this.dragDropIDToBeDeleted,
                "missionID": this.dragDropMissionIDToBeDeleted
            }

            // console.log(postBody)
            
            axios.post('//54.255.245.23:3000/delete/deleteDragAndDrop', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.dragAndDropDeleteMessage ="Drag and Drop Question Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.dragAndDropDeleteMessage = "Error Please Remove Drag and Drop Question From All Existing Trails";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteDragDrop){
                this.showDeleteDragDrop = false;
            } else{
                this.showDeleteDragDrop = true;
            }
            
            // location.reload();
        },

        closeDeleteDragDrop(){
             if(this.showDeleteDragDrop){
                this.showDeleteDragDrop = false;
            } else{
                this.showDeleteDragDrop = true;
            }
        },

        dragDropCloseDeleteMessage(){
            this.showDeleteDragDrop = false;
            this.dragAndDropCloseMessage = true;
            if( this.dragAndDropDeleteMessage === "Drag and Drop Question Successfully Deleted") {
                this.dragAndDropDeleteMessage = "";
                this.$router.go();
            }
            this.dragAndDropDeleteMessage = "";
        },

        onSubmitToDeleteAnagram(){
            const postBody = {
                id: this.anagramIDToBeDeleted
            }

            axios.post('//54.255.245.23:3000/delete/deleteAnagram', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.anagramDeleteMessage ="Anagram Word Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.anagramDeleteMessage = "Error Please Remove Drawing Question From All Existing Trails";
                }
                // this.$router.go();
            })
        },

        deleteAnagram(anagram_title, anagram_id){
            this.titleToBeDeleted = anagram_title;
            this.anagramIDToBeDeleted = anagram_id;

            if(this.showDeleteAnagram){
                this.showDeleteAnagram = false;
            } else{
                this.showDeleteAnagram = true;
            }
        },

        onSubmitToDeleteAnagram(){
            var postBody = {
                "id": this.anagramIDToBeDeleted
            }
            
            axios.post('//54.255.245.23:3000/delete/deleteAnagram', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.anagramDeleteMessage ="Anagram Question Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.anagramDeleteMessage = "Error Please Remove Anagram Question From All Existing Trails";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteAnagram){
                this.showDeleteAnagram = false;
            } else{
                this.showDeleteAnagram = true;
            }
            
            // location.reload();
        },

        closeDeleteAnagram(){
             if(this.showDeleteAnagram){
                this.showDeleteAnagram = false;
            } else{
                this.showDeleteAnagram = true;
            }
        },

        anagramCloseDeleteMessage(){
            this.showDeleteAnagram = false;
            this.anagramCloseMessage = true;
            if( this.anagramDeleteMessage === "Anagram Word Successfully Deleted") {
                this.anagramDeleteMessage = "";
                this.$router.go();
            }
        },

        deleteDrawing(drawing_title, drawing_id){
            this.drawingIDToBeDeleted = drawing_id;
            this.titleToBeDeleted = drawing_title;

            if(this.showDeleteDrawing){
                this.showDeleteDrawing = false;
            } else{
                this.showDeleteDrawing = true;
            }
            console.log(this.drawingIDToBeDeleted)
            
        },

        onSubmitToDeleteDrawing(){
            var postBody = {
                "id": this.drawingIDToBeDeleted
            }
            
            axios.post('//54.255.245.23:3000/delete/deleteDrawingQuestion', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.drawingDeleteMessage ="Drawing Question Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.drawingDeleteMessage = "Error Please Remove Drawing Question From All Existing Trails";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteDrawing){
                this.showDeleteDrawing = false;
            } else{
                this.showDeleteDrawing = true;
            }
            
            // location.reload();
        },

        closeDeleteDrawing(){
             if(this.showDeleteDrawing){
                this.showDeleteDrawing = false;
            } else{
                this.showDeleteDrawing = true;
            }
        },

        drawingCloseDeleteMessage(){
            this.showDeleteDrawing = false;
            this.drawingCloseMessage = true;
            if( this.drawingDeleteMessage === "Drawing Question Successfully Deleted") {
                this.drawingDeleteMessage = "";
                this.$router.go();
            }
            this.drawingDeleteMessage = "";
        },

        onSubmitToDeleteWordsearch(){
            var postBody = {
                "id": this.wordsearchIDToBeDeleted
            }
            
            console.log(postBody)
            axios.post('//54.255.245.23:3000/delete/deleteWordsearch', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.wordsearchDeleteMessage ="Wordsearch Question Successfully Deleted"
                    // this.$router.go();
                } else {
                    this.wordsearchDeleteMessage = "Error Please Remove Wordsearch Question From All Existing Trails";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteWordsearch){
                this.showDeleteWordsearch = false;
            } else{
                this.showDeleteWordsearch = true;
            }
            
            // location.reload();
        },

        deleteWordsearch(wordsearch_title, wordsearch_ID){
            this.titleToBeDeleted = wordsearch_title;
            this.wordsearchIDToBeDeleted = wordsearch_ID

            if(this.showDeleteWordsearch){
                this.showDeleteWordsearch = false;
            } else{
                this.showDeleteWordsearch = true;
            }
        },

        closeDeleteWordsearch(){
             if(this.showDeleteWordsearch){
                this.showDeleteWordsearch = false;
            } else{
                this.showDeleteWordsearch = true;
            }
        },

        wordsearchCloseDeleteMessage(){
            this.showDeleteWordsearch = false;
            this.wordsearchCloseMessage = true;
            if( this.wordsearchDeleteMessage === "Wordsearch Question Successfully Deleted") {
                this.wordsearchDeleteMessage = "";
                this.$router.go();
            }
            this.wordsearchDeleteMessage = "";
        },


    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        // axios.get('//54.255.245.23:3000/hotspot/getHotspots')
        // .then(response => {
        //     let data = response.data;
        //     for(var row in data){
        //         console.log(data[row])
        //         this.hotspotList.push({label: data[row].hotspot_name, value: data[row].hotspot_name})
        //     }
        // })

        axios.get('//54.255.245.23:3000/upload/getAllSubmissionQuestion')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.wefieQuestionList.push({title:data[row].title, mission_id: data[row].mission, wefie_question: data[row].question, wefie_id: data[row].id})
            }
        })

        axios.get('//54.255.245.23:3000/mission/getMissionQuiz')
        .then(response =>{
            let data = response.data;
            // console.log(data);
            for(var index in data){
        
                this.getMissionQuizQuestions(data[index].mission, data[index])
               //this.missionList.push({label: data[index].title, value: data[index].mission});
            }           
        })

        axios.get('//54.255.245.23:3000/draganddrop/getAllDragAndDrop')
        .then(response =>{
            let data = response.data;
            console.log(data);
            this.dragAndDropList = data;      
        })

        axios.get('//54.255.245.23:3000/upload/getAllDrawingQuestion')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.drawingQuestionList.push({title:data[row].title, mission_id: data[row].mission, drawing_question: data[row].question, drawing_id: data[row].id})
            }
        })

        axios.get('//54.255.245.23:3000/anagram/getAllAnagrams')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.anagramList.push({title:data[row].title, word: data[row].word, anagram_id: data[row].id})
            }
        })

        axios.get('//54.255.245.23:3000/wordsearch/getAllWordSearchWords')
        .then(response => {
            let data = response.data;
             let wordsearchWords = []
            for(var row in data){
                console.log(data[row])
                let wordsList = data[row].words;
                wordsearchWords = []
                for(var index in wordsList){
                    wordsearchWords.push({word: wordsList[index]})
                }
                this.wordsearchList.push({title:data[row].title, words: wordsearchWords, wordsearch_id: data[row].id})
            }
        })
    }
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }
    .Missions .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .card .card-title{
        /*display: flex;*/
        /*float: left;*/
        font-size: 20px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .create-mission-btn{
        background-color: #645cdd;;
        border: none;
        border-radius: 5px;
        color: white;
        font-size:15px;
        display: flex;
        float: right;
        padding:12px;
        margin-right: 12px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
    }

    .create-mission-btn:hover{
        background-color: #6200EE;
    }

    .create-mission-btn i{
        font-size: 13px;
        margin-right: 5px;
        
    }

    .create-mission-btn a {
        text-decoration: none!important;
        font-size: 15px;
        color:white;
        font-family: 'Roboto Condensed', sans-serif;
    }

    .card table{
        margin: 18px;
        font-size: 17px;
        font-family: "Roboto", sans-serif;
       
    }

    .card table td{
        text-align: left;
        
    }

    
    tr:nth-child(even) {
        background-color: #f2f2f2;
        border-top: 1px solid #DEE2E6;
        border-bottom: 1px solid #DEE2E6;
    }

    .wefie-data td, .quiz-data td, .draganddrop-data td, .drawing-data td, .anagram-data td, .wordsearch-data td{
        /*max-height: 10px;*/
        max-width: 700px;
        padding: 15px;
    }

    .quiz-data a, .draganddrop-data a, .wefie-data a, .drawing-data a, .anagram-data a, .wordsearch-data a{
        text-decoration: none!important;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        /*color: #536479;*/
    }

    .wefie-data button, .quiz-data button, .draganddrop-data button, .drawing-data button, .anagram-data button, .wordsearch-data button{
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px
    }

    .view-quiz-btn{
        background:none;
        border:none;
        cursor: pointer;
        display: flex;
        float: left;
    }

    .wefie-data i, .quiz-data i, .draganddrop-data i, .drawing-data i, .anagram-data i, .wordsearch-data i{
        font-size: 20px;
        color: #536479;
    }

    .mission-table-header td{
        font-size: 15px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .mission-title-header{
        min-width: 200px;
    }

    /*delete quiz and drag and drop popup starts*/
    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 4;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .delete-quiz-popup, .delete-dragdrop-popup, .delete-wefie-popup, .delete-drawing-popup, .delete-anagram-popup, .delete-wordsearch-popup{
        min-width: 30%;
        min-height: 23%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    
    .delete-quiz-body, .delete-dragdrop-body, .delete-wefie-body, .delete-drawing-body, .delete-anagram-body, .delete-wordsearch-body{
        width: 100%;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        /*background-color: pink;*/
        flex: 10;
    }

    .delete-quiz-content, .delete-wefie-content, .delete-dragdrop-content, .delete-drawing-content, .delete-anagram-content, .delete-wordsearch-content{
        flex: 4;
        padding: 12px;
    }

    .delete-quiz-header, .delete-dragdrop-header, .delete-wefie-header, .delete-drawing-header, .delete-anagram-header, .delete-wordsearch-header{
        flex: 1;
        width: 100%;
        padding:10px; 
        border-bottom: 1px solid #C6C4BC;
    }

    .delete-quiz-body h6, .delete-dragdrop-body h6, .delete-wefie-body h6, .delete-drawing-body h6, .delete-anagram-body h6{
        display: flex;
        flex: 9;
        float: left;
        height: 100%;
        width: 100%;
        align-items: flex-start;
        font-size: 15px;
        margin-left: 20px;
        /*margin-bottom: 10px;*/
        flex-direction: column;
    }

    .delete-quiz-btm, .delete-dragdrop-btm, .delete-wefie-btm, .delete-drawing-btm, .delete-anagram-btm, .delete-wordsearch-btm{
        margin-bottom: 0px;
        /*flex: 4;*/
        margin-top: 10px;
        border-top: 1px solid #C6C4BC;
        padding: 10px;
        position: relative;
    }

    .cancel-delete{
        background: none;
        border: 1px solid #C6C4BC;
        border-radius: 4px;
        display: flex;
        float: left;
        padding:8px 15px 8px 15px;
        margin-left: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: #666666;
    }

    .delete-quiz-btn, .delete-dragdrop-btn, .delete-wefie-btn, .delete-drawing-btn, .delete-anagram-btn, .delete-wordsearch-btn{
        background: none;
        border: none;
        background-color: #F15E5E;
        border-radius: 4px;
        display: flex;
        float: right;
        padding:8px 15px 8px 15px;
        margin-right: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }

    .close-delete-quiz, .close-delete-dragdrop, .close-delete-wefie, .close-delete-drawing, .close-delete-anagram, .close-delete-wordsearch{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .delete-quiz-popup h5, .delete-dragdrop-popup h5, .delete-wefie-popup h5, .delete-drawing-popup h5, .delete-anagram-popup h5, .delete-wordsearch-popup h5{
        display: flex;
        float: left;
    }

    /*deleted quiz popup ends*/

    /*delete wefie popup starts*/
    /*.black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 2;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .delete-wefie-popup{
        min-width: 30%;
        min-height: 33%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
    }
    
    .delete-wefie-body{
        width:100%;
        height: 130px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }

    .delete-wefie-body h6{
        display: flex;
        float: left;
        height: 100%;
        width: 100%;
        font-size: 15px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .delete-wefie-btm{
        margin-bottom: 10px;
        margin-top: 10px;
    
    }

    .cancel-delete{
        background: none;
        border: 1px solid #C6C4BC;
        border-radius: 4px;
        display: flex;
        float: left;
        padding:8px 15px 8px 15px;
        margin-left: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: #666666;
    }

    .delete-wefie-btn{
        background: none;
        border: none;
        background-color: #F15E5E;
        border-radius: 4px;
        display: flex;
        float: right;
        padding:8px 15px 8px 15px;
        margin-right: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }

    .close-delete-wefie{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .delete-wefie-popup h5{
        display: flex;
        float: left;
    }

    .delete-wefie-header{
        max-width: 100%;
        padding:18px;
    }*/

    /*deleted wefie popup ends*/

</style>
