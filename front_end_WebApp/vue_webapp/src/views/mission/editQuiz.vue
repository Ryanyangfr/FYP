<template>
    <div class="EditQuiz">
       <div class="card">
            <div class="card-title">
                <h5>Edit Quiz</h5>
            </div>
            <!--{{quiz}}-->
            <form @submit.prevent="quizOnSubmitToEdit">
                <div>
                    <div class="view-mission-body">
                        <div class="view-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title"> 
                        </div>
                        <div v-for="question in quiz" :key="question.quiz_id" class="view-options-and-answers"> 
                            <div class="view-mission-input">
                                <label>Question</label>
                                <input name="question" id="question-input" type="text" placeholder="Question" v-model="question.quiz_question">
                            </div>

                            <div class="add-quiz-options-body">
                                <label>Question Options</label>
                                <div class="add-quiz-options">
                                    <div class="option" v-for="option in question.options" :key="option.option_id">
                                        <input type="text" v-model="option.option">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="view-mission-input">
                                <label>Answer</label>
                                <input class="answer" v-model="question.quiz_answer">
                            </div>
                        </div>  
                        <div class="submit-btn-area">
                            <router-link to='/mission'><button class="cancel-btn" type="button">Cancel</button></router-link>
                            <button class="submit-btn" type="submit">Save</button>
                        </div>  
                    </div>
                </div>

                
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editQuiz",
    data() {
        return{
            title: "",
            quiz: [],
            quizID: 0
            
        }  
    },

    computed: {
        selectedQuizID(){
            return this.$store.state.selectedQuizID;
            console.log(this.$store.state.selectedQuizID);
        },

        selectedQuizTitle(){
            return this.$store.state.selectedQuizTitle;
            console.log(this.$store.state.selectedQuizTitle);
        },

    }, 

    methods:{

        getQuizOptions(quiz_question, quiz_id, quiz_answer) {
             axios.get('//amazingtrail.ml/api/quiz/getQuizOptions?quizID=' + quiz_id)
            .then(response =>{
                var data = response.data;
                this.quiz.push({quiz_id:quiz_id, quiz_question:quiz_question, quiz_answer:quiz_answer, options: data})
                console.log(this.quiz)
                
            });
        },

        quizOnSubmitToEdit() {
            var postBody = {
                "quiz": this.quiz,
                "missionID": this.quizID,
                "title": this.title
            }

            // console.log(this.quiz);
            axios.post('//amazingtrail.ml/api/edit/editQuiz', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' })
            })
        }

    },

    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('//amazingtrail.ml/api/quiz/getQuizQuestion?mission=' + this.$store.state.selectedQuizID)
        .then(response =>{
            var data = response.data;
            console.log(data)
            for(var index in data){
               this.getQuizOptions(data[index].question, data[index].quiz_id, data[index].quiz_answer);
            }
        })

        this.title = this.$store.state.selectedQuizTitle;
        this.quizID = this.$store.state.selectedQuizID;
        console.log('Quiz ID: ' + this.quizID)
        console.log(this.selectedQuizTitle)

        
    }           
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .EditQuiz .card{
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

    .ViewQuiz div{
        min-width: inherit;
        /*background-color: blue*/
    }

   .view-mission-input label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        /*align-items: center;*/
        min-width: 11%

    }

    .add-quiz-options-body label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        min-width: 11%
    }

    .view-mission-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .view-mission-input input{
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

    .view-mission-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .add-quiz-options{
        display: flex;
        flex-direction: column;
        float: left;
        width: 100%;
        /*background-color: blue;*/
    }


    .add-quiz-options-body{
        margin-left:30px;
        display: flex;
        flex-direction: row;
        /*background-color: pink;*/
    }

    .view-options-and-answers{
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
        display: flex;
        flex-direction: column;
    }

    .option input{
        display: flex;
        float: left;
        margin-bottom: 25px;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .EditQuiz .submit-btn{
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
        font-size: 20px;
        color: white;
        margin-top: 50px;
    }

     .EditQuiz .submit-btn:hover{
        background-color: #5a52c4;
     }

     .EditQuiz .cancel-btn{
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
        margin-top: 50px;
    }

    .EditQuiz .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditQuiz .cancel-btn a{
        text-decoration: none!important;
        color: white
    }


</style>
