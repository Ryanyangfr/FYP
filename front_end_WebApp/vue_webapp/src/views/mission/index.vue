<template>
    <div class="Missions">
        <div class="card">
            <div class="card-title">
                <h5>Missions List</h5>
                <button class="create-mission-btn"><i class="ti-plus"></i><router-link to='/addMission'>ADD NEW</router-link></button>
            </div>
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Quiz Title</td>
                    <td>Details</td>
                    <td>Actions</td>
                </tr>
                
            </table>
            <br>
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Wefie Title</td>
                    <td>Wefie Question</td>
                    <td colspan="2">Actions</td>
                </tr>
                <tr class = "wefie-data" v-for="wefie in wefieQuestionList" :key="wefie.value">
                    <td>{{wefie.value}}</td>
                    <td>{{wefie.label}}</td>
                    <td><button @click="editHotspot(hotspot.hotspot_name,hotspot.latitude,hotspot.longtitude,hotspot.narrative)"><i class="ti-pencil-alt"></i></button></td>
                    <td><button @click="deleteHotspot(hotspot.hotspot_name)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
            <br>
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Drawing Title</td>
                    <td>Hotspot</td>
                    <td>Drawing Question</td>
                </tr>
            </table>
        </div>



        <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
        <v-select :options="missionTypes" v-model="mission" placeholder="Choose your mission" style="width:200px;"></v-select>
        <br>
        <div v-if="mission == missionTypes[0]">
            <form @submit.prevent="quizOnSubmitToAdd" v-if="func == functionsAvailable[0]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>
                Quiz Title:
                <input name="title" type="text" placeholder="title" v-model="title">            
                <ul>
                    <li v-for="(input, index) in quiz">
                        Quiz Question:
                        <input name="question" type="text" placeholder="question" v-model="input.question">
                        Quiz Options:
                        <input name="option1" type="text" placeholder="option1" v-model="input.option1">
                        <input name="option2" type="text" placeholder="option2" v-model="input.option2">
                        <input name="option3" type="text" placeholder="option3" v-model="input.option3">
                        <input name="option4" type="text" placeholder="option4" v-model="input.option4">
                        Quiz Answer:
                        <input name="answer" type="text" placeholder="answer" v-model="input.answer">
                        <button @click="deleteRow(index)">Delete</button>
                    </li>
                </ul>
                 <button type="button" @click="addRow">Add row</button>
                 <button type="submit">submit</button> 
            </form>
            <!-- {{this.quiz}} -->
            <form @submit.prevent="quizOnSubmitToEdit" v-if="func == functionsAvailable[1]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>
                <button type="button" @click="fetchMissions">Fetch Missions</button>

                Mission ID:
                <v-select :options="missionList" v-model="missionToEdit" placeholder="Please select a mission" style="width:200px;"></v-select>
                <button type="button" @click="fetchQuestions">Fetch Questions</button>

                Question:
                <v-select :options="questionList" v-model='questionToBeEdited' placeholder='Please select a question' style="width:400px;"></v-select>
                <button type="button" @click="fetchOptions">Fetch Quiz Options</button>

                <div v-if="editedOptions.option1 != ''">
                    Question:
                    <input name="question" type="text" placeholder="question" v-model="questionToBeEdited.label" :style="{width: '800px'}">
                    <br>
                    Options:
                    <input name="option1" type="text" placeholder="option1" v-model="editedOptions.option1">
                    <input name="option2" type="text" placeholder="option2" v-model="editedOptions.option2">
                    <input name="option3" type="text" placeholder="option3" v-model="editedOptions.option3">
                    <input name="option4" type="text" placeholder="option4" v-model="editedOptions.option4">
                
                    <button type="submit">submit</button>
                </div>
            </form>

            <form @submit.prevent="quizOnSubmitToDelete" v-if="func == functionsAvailable[2]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>
                <button type="button" @click="fetchMissions">Fetch Missions</button>

                Mission:
                <v-select :options="missionList" v-model="missionToEdit" placeholder="Please select a mission to delete" style="width:200px;"></v-select>
                <button type="submit">submit</button>
            </form>
        </div>

        <div v-if="mission == missionTypes[1]">
            <form @submit.prevent="wefieOnSubmitToAdd" v-if="func == functionsAvailable[0]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>
                Title:
                <input name="title" type="text" placeholder="title" v-model="title">
                <br>
                Wefie Question:
                <input name="wefie" type="text" placeholder="wefie_question" v-model="wefie_question">
                <button type="submit">submit</button>
            </form>

            <form @submit.prevent="wefieOnSubmitToEdit" v-if="func == functionsAvailable[1]">
                Wefie Question:
                <v-select :options="wefieQuestionList" v-model="wefieID" placeholder="Please select a wefie question" style="width:500px;"></v-select>
                <button type="button" @click="updateCurrWefieQn">Edit</button>
                <br>
                Wefie Question:
                <input name="wefie" type="text" v-model="wefie_question">
                <button type="submit">submit</button>
            </form>

            <form @submit.prevent="wefieOnSubmitToDelete" v-if="func == functionsAvailable[2]">
                Wefie Question:
                <v-select :options="wefieQuestionList" v-model="wefieID" placeholder="Please select a wefie question" style="width:500px;"></v-select>
                <button type="submit">delete</button>
            </form>
        </div>
        <!-- {{narrative}} -->
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "mission",
    data() {
        return{
            func: "Add",
            functionsAvailable: ["Add", "Edit", "Delete"],
            mission: "",
            missionTypes: ["Quiz", "Wefie", "Drawing"],
            hotspotList: [],
            quiz: [],
            hotspot: "",
            missionList: [],
            missionToEdit: "",
            questionList: [],
            questionToBeEdited: "",
            title: "",
            missionDictionary:{},
            editedOptions: {
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                option1ID: "",
                option2ID: "",
                option3ID: "",
                option4ID: ""
            },
            wefie_question: "",
            wefieQuestionList: [],
            wefieID: ""
        }
    }, 
    components:{
        vSelect
    },
    methods: {
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
            axios.get('http://54.255.245.23:3000/mission/getMissionQuiz?hotspot=' + this.hotspot.value)
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
                    this.missionDictionary[data[index].quiz_id] = data[index].question;
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
        quizOnSubmitToDelete(){
            var postBody = {
                "hotspot_name": this.hotspotToBeDeleted,
            }
            axios.post('http://54.255.245.23:3000/delete/deleteQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.go();
            })
            this.hotspotToBeDeleted = "";
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
                this.$router.go();
            })
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.hotspotList.push({label: data[row].hotspot_name, value: data[row].hotspot_name})
            }
        })

        axios.get('http://54.255.245.23:3000/upload/getAllSubmissionQuestion')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.wefieQuestionList.push({label: data[row].question, value: data[row].id})
            }
        })
    }
}
</script>

<style>
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
        font-size: 14px;
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

    .wefie-data td{
        text-overflow: ellipsis;
        max-height: 10px;
        padding: 15px;
    }

    .wefie-data button{
        background: none;
        border: none;
        cursor: pointer;
    }

    .wefie-data i{
        font-size: 20px
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
</style>
