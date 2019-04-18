<template>
    <div class="ViewQuiz">
       <div class="card">
            <div class="card-title">
                <h5>Quiz Details</h5>
            </div>

            <div>
                <div>
                    <div class="view-mission-body">
                        <div class="view-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="title" readonly> 
                        </div>

                        <div v-for="quiz in quiz" :key="quiz.quiz_id" class="view-options-and-answers"> 
                            <div class="view-mission-input">
                                <label>Question</label>
                                <div class="question">{{quiz.quiz_question}}</div>
                            </div>

                            <div class="add-quiz-options-body">
                                <label>Question Options</label>
                                <div class="add-quiz-options">
                                    <div class="option" v-for="options in quiz.options" :key="options.option_id">
                                        <div>{{options.option}}</div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="view-mission-input">
                                <label>Answer</label>
                                <div class="answer">{{quiz.quiz_answer}}</div>
                            </div>
                        </div>    
                    </div>
                </div>

                
            </div>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "addMission",
    data() {
        return{
            title: "",
            quiz: []
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

        getQuizOptions(quiz_question, quiz_id, quiz_answer){
             axios.get('//amazingtrail.ml/api/quiz/getQuizOptions?quizID=' + quiz_id)
            .then(response =>{
                var data = response.data;
                this.quiz.push({quiz_id:quiz_id, quiz_question:quiz_question, quiz_answer:quiz_answer, options: data})
         
            });
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
        console.log(this.selectedQuizTitle)
        
    }           
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .ViewQuiz .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .card .card-title{
        font-size: 20px;
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .ViewQuiz div{
        min-width: inherit;
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
        height: inherit;
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
    }


    .add-quiz-options-body{
        margin-left:30px;
        display: flex;
        flex-direction: row;
    }

    .view-options-and-answers{
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
        display: flex;
        flex-direction: column;
    }

    .question, .option, .answer{
        float: left;
        display: flex;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        margin-bottom: 25px;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        width:75%;
        font-family: 'Roboto', sans-serif;
    }
</style>
