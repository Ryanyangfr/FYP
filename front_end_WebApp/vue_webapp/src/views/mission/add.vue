<template>
    <div class="AddMission">
       <div class="card">
            <div class="card-title">
                <h6>Add New Mission</h6>
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
                                    <label for="question-input">Question</label>
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
                                    <input name="answer" type="text" placeholder="Answer" v-model="input.answer">
                                </div>
                                <div class="delete-quiz-question-area">
                                    <button class="delete-quiz-question" @click="deleteRow(index)">Delete</button>
                                </div>
                        </div>
                        <button class="add-new-question-btn" type="button" @click="addRow">ADD QUESTION</button>
                        <div class="submit-btn-area">
                            <button class="submit-btn" type="submit">Submit</button>
                        </div>
                    </form>
                </div>

                <div v-if="missionType == allMissionTypes[1]">
                    <form @submit.prevent="wefieOnSubmitToAdd" class="add-mission-body">
                        <div class="add-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div> 
                        <div class="add-mission-input">
                            <label for="add-wefie-instruction-input">Instruction</label>
                            <input name="add-wefie-instruction-input" type="text" placeholder="Wefie Instruction" v-model="title"> 
                        </div> 
                        <div class="submit-btn-area">
                            <button class="submit-btn" type="submit">Submit</button>
                        </div>
                    </form>

                </div>
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
            allMissionTypes: ["Quiz", "Wefie", "Drawing"],
            missionType: "",
            title: "",
            quiz: [],
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
                answer: ""
            })
        },

        deleteRow(index){
            this.$delete(this.quiz, index);
        },

        quizOnSubmitToAdd(){
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
                this.$router.go();
            })
            // this.hotspot = "";
            // this.quiz = [];
            // location.reload();
            // this.$router.go();
        }
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

    .card-title h6{
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
        font-size: 14px;
        min-width:75%;
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

    .edit-hotspot-input input, .add-mission-input input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .add-question-body, .add-mission-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .add-question-body{
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
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
        min-width: 100%;
        /*background-color: pink;*/
    }

    .add-quiz-options-body input{
        /*background-color: red;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
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
        margin-bottom: 25px;
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

    .submit-btn-area{
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
        min-height: 45px;
        padding:8px 15px 8px 15px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
        margin-top: 70px;
    }

     .AddMission .submit-btn:hover{
        background-color: #5a52c4;
     }

</style>
