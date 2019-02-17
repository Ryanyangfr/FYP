<template>
    <div class="Missions">
        <div class="card">
            <div class="card-title">
                <h5>Missions List</h5>
                <button class="create-mission-btn"><i class="ti-plus"></i><router-link to='/addMission'>ADD MISSION</router-link></button>
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

            <!--table for mission: drawing begins-->
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Drawing Title</td>
                    <td>Hotspot</td>
                    <td>Drawing Question</td>
                </tr>
            </table>
            <!--table for mission: drawing ends-->
        </div>

        <!--delete quiz popup begins-->
        <!--shows when user clicks on delete icon for quiz. showDeleteQuiz = true-->
        <div class="black-blur-bg" v-if="showDeleteQuiz"> 
            <div class="delete-quiz-popup">
                <div class="delete-quiz-header">
                    <h5>Delete</h5>
                    <button class="close-delete-quiz" @click="closeDeleteQuiz()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                <form class="delete-quiz-body" @submit="onSubmitToDeleteQuiz">
                    <div><h6>Are you sure you want to delete "{{this.missionTitleToBeDeleted}}"?</h6></div>
                    <div><hr></div>
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

        <!--delete weie popup begins-->
        <!--shows when user clicks on delete icon for wefie. showDeleteWefie = true-->
        <div class="black-blur-bg" v-if="showDeleteWefie"> 
            <div class="delete-wefie-popup">
                <div class="delete-wefie-header">
                    <h5>Delete</h5>
                    <button class="close-delete-wefie" @click="closeDeleteWefie()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                <form class="delete-wefie-body" @submit="onSubmitToDeleteWefie">
                    <div><h6>Are you sure you want to delete "{{this.wefieTitleToBeDeleted}}"?</h6></div>
                    <div><hr></div>
                    <div class="delete-wefie-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteWefie()">Cancel</button>
                        <button type="submit" class="delete-wefie-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="wefieDeleteMessage.length > 0"> 
            <div class="delete-quiz-popup">
                <hr>
                
                <div><h6>{{wefieDeleteMessage}}</h6></div>
                <div><hr></div>
                <div class="delete-quiz-btm">
                    <button class="delete-quiz-btn" @click="wefieCloseDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete wefie popup ends-->
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
        }

    }, 
    data() {
        return{
            mission: "",
            quiz: [],
            missionList: [],
            missionToEdit: "",
            questionList: [],
            questionToBeEdited: "",
            title: "",
            wefie_question: "",
            wefieQuestionList: [],
            wefieID: "",

            //delete variables
            showDeleteQuiz: false,
            missionIDToBeDeleted:"",
            missionTitleToBeDeleted:"",
            showDeleteWefie: false,
            wefieIDToBeDeleted:"",
            wefieTitleToBeDeleted:"",
            quizDeleteMessage: "",
            quizCloseMessage: false,
            wefieDeleteMessage: "",
            wefieCloseMessage: false
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
        //store to vuex store methods ends 

        addRow(){
            this.quiz.push({
                question: "",
                title: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: ""
            })
        },
        updateCurrWefieQn(){
            this.wefie_question = this.wefieID.label
        },
        fetchMissions(){
            // console.log('entered')
            this.missionList = [];
            axios.get('http://54.255.245.23:3000/mission/getMissionQuiz')
            .then(response =>{
                var data = response.data;
                // console.log(data)
                for(var index in data){
                    // console.log(index)
                    this.missionList.push({label: data[index].title, value: data[index].mission});
                }
            })
        },
        fetchQuestions(){
            this.questionList = [];
            axios.get('http://54.255.245.23:3000/quiz/getQuizQuestion?mission=' + this.missionToEdit.value)
            .then(response =>{
                var data = response.data;
                console.log(data)
                for(var index in data){
                    this.questionList.push({label: data[index].question, value: data[index].quiz_id});
                }
            })
        },
        fetchOptions(){
            console.log(this.questionToBeEdited.value);
            axios.get('http://54.255.245.23:3000/quiz/getQuizOptions?quizID=' + this.questionToBeEdited.value)
            .then(response =>{
                var data = response.data;
                console.log(data)
                this.editedOptions.option1 = data[0].option
                this.editedOptions.option2 = data[1].option
                this.editedOptions.option3 = data[2].option
                this.editedOptions.option4 = data[3].option
                this.editedOptions.option1ID = data[0].option_id
                this.editedOptions.option2ID = data[1].option_id
                this.editedOptions.option3ID = data[2].option_id
                this.editedOptions.option4ID = data[3].option_id
            })
        },
        quizOnSubmitToAdd(){
            var postBody = {
                "hotspot": this.hotspot.value,
                "title": this.title,
                "quiz": this.quiz
            }
            console.log(this.hotspot.value);
            console.log(this.title);
            console.log(this.quiz);
            axios.post('http://54.255.245.23:3000/add/addQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.go();
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
            // this.$router.go();
        },
        quizOnSubmitToEdit(){
            var postBody = {
                question: this.questionToBeEdited,
                option1: {option: this.editedOptions.option1, id: this.editedOptions.option1ID},
                option2: {option: this.editedOptions.option2, id: this.editedOptions.option2ID},
                option3: {option: this.editedOptions.option3, id: this.editedOptions.option3ID},
                option4: {option: this.editedOptions.option4, id: this.editedOptions.option4ID}
            }
            axios.post('http://54.255.245.23:3000/edit/editQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.go();
            })
        },

        wefieOnSubmitToAdd(){
            var postBody = {
                "hotspot": this.hotspot.value,
                "title": this.title,
                "question": this.wefie_question
            }
            axios.post('http://54.255.245.23:3000/add/addWefieQuestion', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
                this.$router.go();
            });
            // this.hotspot = "";
            // this.quiz = [];
        },
        wefieOnSubmitToEdit(){
            var postBody = {
                "id": this.wefieID.value,
                "question": this.wefie_question
            }
            axios.post('http://54.255.245.23:3000/edit/editWefieQuestion', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
                this.$router.go();
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
        },
        wefieOnSubmitToDelete(){
            var postBody = {
                "id": this.wefieID.value
            }
            axios.post('http://54.255.245.23:3000/delete/deleteWefieQuestion', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
                // this.$router.go();
            })
        },

        getMissionQuizQuestions(missionid, mission){
            axios.get('http://54.255.245.23:3000/quiz/getQuizQuestion?mission=' + missionid)
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
            this.missionTitleToBeDeleted = mission_title;

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
            
            axios.post('http://54.255.245.23:3000/delete/deleteQuiz', postBody)
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
            this.wefieTitleToBeDeleted = wefie_title;

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
            
            axios.post('http://54.255.245.23:3000/delete/deleteWefieQuestion', postBody)
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
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        // axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        // .then(response => {
        //     let data = response.data;
        //     for(var row in data){
        //         console.log(data[row])
        //         this.hotspotList.push({label: data[row].hotspot_name, value: data[row].hotspot_name})
        //     }
        // })

        axios.get('http://54.255.245.23:3000/upload/getAllSubmissionQuestion')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.wefieQuestionList.push({title:data[row].title, mission_id: data[row].mission, wefie_question: data[row].question, wefie_id: data[row].id})
            }
        })

        axios.get('http://54.255.245.23:3000/mission/getMissionQuiz')
        .then(response =>{
            let data = response.data;
            // console.log(data);
            for(var index in data){
        
                this.getMissionQuizQuestions(data[index].mission, data[index])
               //this.missionList.push({label: data[index].title, value: data[index].mission});
            }           
        })
    }
}
</script>

<<style scoped>
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

    .wefie-data td, .quiz-data td{
        /*max-height: 10px;*/
        max-width: 700px;
        padding: 15px;
    }

    .quiz-data a{
        text-decoration: none!important;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        /*color: #536479;*/
    }

    .wefie-data button, .quiz-data button{
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

    .wefie-data i, .quiz-data i{
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

    /*delete quiz popup starts*/
    .black-blur-bg{
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

    .delete-quiz-popup{
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
    
    .delete-quiz-body{
        width:100%;
        height: 130px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }

    .delete-quiz-body h6{
        display: flex;
        float: left;
        height: 100%;
        width: 100%;
        font-size: 15px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .delete-quiz-btm{
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

    .delete-quiz-btn{
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

    .close-delete-quiz{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .delete-quiz-popup h5{
        display: flex;
        float: left;
    }

    .delete-quiz-header{
        max-width: 100%;
        padding:18px;
    }

    /*deleted quiz popup ends*/

    /*delete wefie popup starts*/
    .black-blur-bg{
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
    }

    /*deleted wefie popup ends*/
</style>
