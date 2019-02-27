<template>
    <div class="AddMission">
       <div class="card">
            <div class="card-title">
                <h5>Add New Mission</h5>
            </div>

            <form>
                <div class="missions-droplist">
                    <label for="missions-droplist-input">Select Mission Type</label>
                    <select placeholder="Select mission type" id="missions-droplist-input" v-model="missionType">
                        <option v-for="mission in allMissionTypes" :key="mission">
                            {{mission}}
                        </option> 
                    </select>  
                </div>

                <div v-if="missionType == allMissionTypes[0]">
                    <form @submit.prevent="quizOnSubmitToAdd" class="add-mission-body">
                        <div class="add-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div> 
                        <div v-for="(input, index) in quiz" :key="index" class="add-question-body">
                                <div class="add-mission-input">
                                    <label for="question-input">Question {{index + 1}}</label>
                                    <input name="question" id="question-input" type="text" placeholder="Question" v-model="input.question">
                                </div>
                                <div class="add-quiz-options-body">
                                    <label for="add-quiz-options">Question Options</label>
                                    <div class="add-quiz-options">
                                        <div class="add-mission-input">
                                            <input name="option1" type="text" placeholder="Option 1" v-model="input.option1">
                                        </div>
                                        <div class="add-mission-input">
                                            <input name="option2" type="text" placeholder="Option 2" v-model="input.option2">
                                        </div>
                                        <div class="add-mission-input">
                                            <input name="option3" type="text" placeholder="Option 3" v-model="input.option3">
                                        </div>
                                        <div class="add-mission-input">
                                            <input name="option4" type="text" placeholder="Option 4" v-model="input.option4">
                                        </div>
                                    </div>
                                </div>
                                <div class="add-mission-input">
                                    <label for="question-input">Answer</label>
                                    <select placeholder="Select mission type" id="missions-droplist-input" v-model="input.answer">
                                        <option v-for="option in answer_options" :key="option">
                                            {{option}}
                                        </option> 
                                    </select>
                                </div>
                                <div class="delete-quiz-question-area">
                                    <button type="button" class="delete-quiz-question" @click="deleteRow(index)">Delete</button>
                                </div>
                        </div>
                        <button class="add-new-question-btn" type="button" @click="addRow">ADD QUESTION</button>
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/mission'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>

                <!--add wefie begins-->
                <div v-if="missionType == allMissionTypes[1]">
                    <form @submit.prevent="wefieOnSubmitToAdd" class="add-mission-body">
                        <div class="add-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div> 
                        <div class="add-mission-input">
                            <label for="add-wefie-instruction-input">Instruction</label>
                            <input name="add-wefie-instruction-input" type="text" placeholder="Wefie Instruction" v-model="wefie_instruction"> 
                        </div> 
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/mission'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                <!--add wefie ends-->

                <!--add drag and drop begins-->
                <div v-if="missionType == allMissionTypes[2]">
                    <form @submit.prevent="dragAndDropOnSubmitToAdd" class="add-mission-body">
                        <div class="add-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div> 
                        <div class="add-mission-input">
                            <label for="add-dragAndDrop-question-input">Question</label>
                            <input name="add-dragAndDrop-question-input" type="text" placeholder="Drag And Drop Question" v-model="dragAndDropQuestion"> 
                        </div> 
                        <div v-for="(input, index) in dragAndDropOptions" :key="index" class="add-question-body">
                            <div class="add-mission-body">
                                <div class="add-mission-input">
                                    <label for="add-mission-title-input">Option {{index+1}}</label>
                                    <input name="option" type="text" placeholder="option" v-model="input.option">
                                </div>
                                
                                <div class="add-mission-input">
                                    <label for="add-mission-title-input">Answer {{index+1}}</label>
                                    <input name="option" type="text" placeholder="answer" v-model="input.answer">
                                </div>
                            </div>

                        </div>
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/mission'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                <!--add drag and drop ends-->

                <!--add drawing begins-->
                <div v-if="missionType == allMissionTypes[3]">
                    <form @submit.prevent="drawingOnSubmitToAdd" class="add-mission-body">
                        <div class="add-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div> 
                        <div class="add-mission-input">
                            <label for="add-drawing-instruction-input">Instruction</label>
                            <input name="add-drawing-instruction-input" type="text" placeholder="Drawing Instruction" v-model="drawing_instruction"> 
                        </div> 
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/mission'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                <!--add drawing ends-->
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "addMission",
    data() {
        return{
            allMissionTypes: ["Quiz", "Wefie", "Drag And Drop", "Drawing"],
            missionType: "",
            title: "",
            quiz: [],
            wefie_instruction: "",
            answer_options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            
            //drag and drop
            dragAndDropQuestion: "",
            dragAndDropOptions: [{option: "", answer: ""}, {option: "", answer: ""}, {option: "", answer: ""}, {option: "", answer: ""}],

            //drawing
            drawing_instruction: "",

        }  
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
                answer:"",
            })
        },

        deleteRow(index){
            console.log(this.quiz)        
            this.$delete(this.quiz, index);
        },

        quizOnSubmitToAdd(){
            this.quiz.forEach((question) => {
                if (question.answer === this.answer_options[0]) {
                    question.answer = question.option1;
                } else if (question.answer === this.answer_options[1]) {
                    question.answer = question.option2;
                } else if (question.answer === this.answer_options[2]) {
                    question.answer = question.option3;
                } else {
                    question.answer = question.option4;
                }
            })
            var postBody = {
                "title": this.title,
                "quiz": this.quiz
            }
            // console.log(this.hotspot.value);
            console.log(this.title);
            console.log(this.quiz);
            axios.post('http://54.255.245.23:3000/add/addQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' })
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
            // this.$router.go();
        },

        wefieOnSubmitToAdd(){
            var postBody = {
                "question": this.wefie_instruction,
                "title": this.title
            }
            // console.log(this.hotspot.value);
            console.log(this.wefie_instruction);
            console.log(this.title);
            axios.post('http://54.255.245.23:3000/add/addWefieQuestion', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' })
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
            // this.$router.go();
        },

        dragAndDropOnSubmitToAdd(){
            var postBody = {
                title: this.title,
                question: this.dragAndDropQuestion,
                options: this.dragAndDropOptions
            }

            console.log(postBody);
            axios.post('http://54.255.245.23:3000/add/addDragAndDropQuestion', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' });
            })
        },

        drawingOnSubmitToAdd(){
            var postBody = {
                "question": this.drawing_instruction,
                "title": this.title
            }
            // console.log(this.hotspot.value);
            console.log(this.drawing_instruction);
            console.log(this.title);
            axios.post('http://54.255.245.23:3000/add/addDrawingQuestion', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' })
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
            // this.$router.go();
        },
    }       
        
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .AddMission .card{
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
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .AddMission form{
        min-width: inherit;
        /*background-color: blue*/
    }

    .missions-droplist{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
        /*background-color: red*/
    }
    
    .missions-droplist select{
        height: 40px;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        padding: 5px;
        font-family: 'Roboto', sans-serif;
    }

    .missions-droplist label, .add-mission-input label{
        margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 12%

    }

    .missions-droplist select:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .add-mission-input{
        float: left;
        display: flex;
        margin-left: 18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        /*background-color: pink*/
    }

    .add-mission-input input, .add-mission-input select{
        /*margin-left: 100px;*/
        height: 45px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .add-question-body, .add-mission-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    /* add question body: whole question body for quiz and options and answer for drag and drop.
    Add a diver between each question/ option and answer */
    .add-question-body{
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
        overflow: hidden;
    }

    .add-quiz-options{
        display: flex;
        flex-direction: column;
        min-width: 100%;
    }

    .add-quiz-options-body{
        margin-left:18px;
        display: flex;
        flex-direction: row;
        width: 100%;
        /*background-color: pink;*/
    }

    .add-quiz-options-body input{
        /*background-color: red;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .add-quiz-options-body label{
        margin-right: 82px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        min-width: 12%

    }

    .delete-quiz-question-area{
        width: 100%;
        margin-bottom: 30px;
    }

    .delete-quiz-question{
        display: flex;
        float: right;
        background: none;
        border: none;
        background-color: #F15E5E;
        border-radius: 4px;
        max-width: 100px;
        max-height: 50px;
        padding:8px 15px 8px 15px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }

    .add-new-question-btn{
        background: none;
        border: 1px solid #CED4DA;
        padding-top: 8px;
        padding-bottom: 8px;
        font-family: 'Roboto', sans-serif;
        border-radius: 3px;
        font-size: 17px;
        margin-bottom: 25px;
        color: #536479;
        cursor: pointer;
        margin-left: 58px;
        margin-right: 58px;
    }

    .add-new-question-btn:hover{
        border:1px solid #6200EE;
        color:#6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .AddMission .submit-btn-area{
        width: 100%;
    }

    .AddMission .submit-btn{
        /*display: flex;*/
        float:right;
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

     .AddMission .submit-btn:hover{
        background-color: #5a52c4;
     }

     .AddMission .cancel-btn{
         float:right;
         background-color: #ACACAC;
         color: white;
         border:none;
         border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

    .AddMission .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .AddMission .cancel-btn a{
        text-decoration: none!important;
        color: white
    }

</style>
