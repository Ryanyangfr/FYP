<template>
    <div>
        <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
        <v-select :options="missionTypes" v-model="mission" placeholder="Choose your mission" style="width:200px;"></v-select>
        <br>
        <div v-if="mission == missionTypes[0]">
            <form @submit.prevent="quizOnSubmitToAdd" v-if="func == functionsAvailable[0]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>             
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
        <!-- {{narrative}} -->
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "hotspot",
    data() {
        return{
            func: "Add",
            functionsAvailable: ["Add", "Edit", "Delete"],
            mission: "",
            missionTypes: ["Quiz", "Drag-N-Drop", "Selfie", "Drawing"],
            hotspotList: [],
            quiz: [],
            hotspot: "",
            missionList: [],
            missionToEdit: "",
            questionList: [],
            questionToBeEdited: "",
            editedOptions: {
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                option1ID: "",
                option2ID: "",
                option3ID: "",
                option4ID: ""
            }
        }
    }, 
    components:{
        vSelect
    },
    methods: {
        addRow(){
            this.quiz.push({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: ""
            })
        },
        fetchMissions(){
            // console.log('entered')
            this.missionList = [];
            axios.get('http://54.255.245.23:3000/mission/getMission?hotspot=' + this.hotspot.value)
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
                "quiz": this.quiz
            }
            axios.post('http://54.255.245.23:3000/add/addQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
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
            })
            this.hotspotToBeEdited = "";
            this.latitude = "";
            this.longtitude = "";
            this.narrative = "";
            location.reload();

        },
        quizOnSubmitToDelete(){
            var postBody = {
                "hotspot_name": this.hotspotToBeDeleted,
            }
            axios.post('http://54.255.245.23:3000/delete/deleteQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
            this.hotspotToBeDeleted = "";
            location.reload();
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
        // axios.get('http://54.255.245.23:3000/narrative/getNarratives')
        // .then(response => {
        //     let data = response.data;
        //     for(var row in data){
        //         console.log(data[row])
        //         this.dropDownList.push({label: data[row].narrative_title, value: data[row].narrative_id})
        //     }
        // })

        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.hotspotList.push({label: data[row], value: data[row]})
            }
        })
    }
}
</script>
