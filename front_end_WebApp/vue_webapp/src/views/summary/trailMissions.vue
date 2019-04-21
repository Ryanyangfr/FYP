//View the all missions for the selected trail. 
//shows all the missions in diferent tables
//same as the view all missions page
<template>
    <div class="TrailMissions">
        <div class="card">
            <div class="card-title">
                <h5>Trail ID: {{this.trailID}} | View All Missions</h5>
            </div>

            <!--table for mission: quiz begins-->
            <h6>All Quizzes</h6>
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Quiz Title</td>
                    <td>Questions</td>
                    <td>Details</td>
                </tr>
                <tr class="quiz-data" v-for="quiz in missionList" :key="quiz.mission_id">
                    <td>{{quiz.mission_title}}</td>
                    <td>
                        <div v-for="(question,index) in quiz.questions" :key="question.quiz_id">
                            {{index+1}}. 
                            {{question.question}}
                            
                        </div>  
                    </td>
                    <td><button class="view-quiz-btn" @click="saveSelectedQuiz(quiz.mission_id, quiz.mission_title)"><router-link to='/viewQuizHistory'>View full details</router-link></button></td>
                </tr>
            </table>
            <!--table for mission: quiz ends-->

            <br>

            <h6>All Wefie Questions</h6>
            <!--table for mission: wefie begins-->
            <table>
                <tr class="mission-table-header">
                    <td>Wefie Title</td>
                    <td>Wefie Question</td>
                </tr>
                <tr class = "wefie-data" v-for="wefie in wefieQuestionList" :key="wefie.wefie_id">
                    <td>{{wefie.title}}</td>
                    <td>{{wefie.wefie_question}}</td>
        
                </tr>
            </table>
            <!--table for mission: wefie ends-->

            <br>

            <h6>All Drag and Drop Questions</h6>
            <!--table for mission: drag and drop begins-->
            <table>
                <tr class="mission-table-header">
                    <td class="mission-title-header">Drag And Drop Title</td>
                    <td>Question</td>
                    <!-- <td>Details</td> -->
                    <td>Words To Match</td>
                    <td>Answers</td>
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
                </tr>
            </table>
            <!--table for mission: draganddrop ends-->

            <br>

            <h6>All Drawing Questions</h6>
            <!-- table for mission: drawing starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Drawing Title</td>
                    <td>Drawing Question</td>
                </tr>
                <tr class = "drawing-data" v-for="drawing in drawingQuestionList" :key="drawing.drawing_id">
                    <td>{{drawing.title}}</td>
                    <td>{{drawing.drawing_question}}</td>
                </tr>
            </table>
            <!-- table for mission: drawing ends -->

            <br>

            <h6>All Anagram Questions</h6>
            <!-- table for anagram: anagram starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Anagram Title</td>
                    <td>Word</td>
                </tr>
                <tr class = "anagram-data" v-for="anagram in anagramList" :key="anagram.anagram_id">
                    <td>{{anagram.title}}</td>
                    <td>{{anagram.word}}</td>
                </tr>
            </table>
            <!-- table for mission: anagram ends -->

            <br>

            <h6>All Wordsearch Questions</h6>
            <!-- table for mission: wordsearch starts -->
                <table>
                <tr class="mission-table-header">
                    <td>Wordsearch Title</td>
                    <td>Words</td>
                </tr>
                <tr class = "wordsearch-data" v-for="wordsearch in wordsearchList" :key="wordsearch.title">
                    <td>{{wordsearch.title}}</td>
                    <td>
                        <div v-for="wordsearchWord in wordsearch.words" :key="wordsearchWord.word">{{wordsearchWord.word}}</div>
                    </td>
                </tr>
            </table>
            <!-- table for mission: wordsearch ends -->
        </div>
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "trailMissions",

    computed: {
        selectedMissionTrailID(){
            return this.$store.state.selectedMissionTrailID;
        }
       
    }, 
    data() {
        return{
            trailID: 0,

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
        //store to vuex store methods ends 
        
        fetchMissions(){
            this.missionList = [];
            axios.get('//amazingtrail.ml/api/mission/getMissionQuizHistory')
            .then(response =>{
                var data = response.data;
                for(var index in data){
                    this.missionList.push({label: data[index].title, value: data[index].mission});
                }
            })
        },

        getMissionQuizQuestions(missionid, mission){
            axios.get('//amazingtrail.ml/api/quiz/getQuizQuestionHistory?mission=' + missionid)
                .then(response =>{
                    var data = response.data;
                    this.missionList.push({mission_id: missionid, mission_title: mission.title, questions: data});
                    
                })
        }

    },
    mounted(){
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
        this.trailID = this.$store.state.selectedMissionTrailID

        axios.get('//amazingtrail.ml/api/upload/getSubmissionQuestionHistory?trailInstanceID=' + this.trailID)
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.wefieQuestionList.push({title:data[row].title, mission_id: data[row].mission, wefie_question: data[row].question, wefie_id: data[row].id})
            }
        })

        axios.get('//amazingtrail.ml/api/mission/getMissionQuizHistory?trailInstanceID=' + this.trailID)
        .then(response =>{
            let data = response.data;
            for(var index in data){
                this.getMissionQuizQuestions(data[index].mission, data[index])
            }           
        })

        axios.get('//amazingtrail.ml/api/draganddrop/getDragAndDropHistory?trailInstanceID=' + this.trailID)
        .then(response =>{
            let data = response.data;
            this.dragAndDropList = data;      
        })

        axios.get('//amazingtrail.ml/api/upload/getDrawingQuestionHistory?trailInstanceID=' + this.trailID)
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.drawingQuestionList.push({title:data[row].title, mission_id: data[row].mission, drawing_question: data[row].question, drawing_id: data[row].id})
            }
        })

        axios.get('//amazingtrail.ml/api/anagram/getAnagramsHistory?trailInstanceID=' + this.trailID)
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.anagramList.push({title:data[row].title, word: data[row].word, anagram_id: data[row].id})
            }
        })

        axios.get('//amazingtrail.ml/api/wordsearch/getWordSearchWordsHistory?trailInstanceID=' + this.trailID)
        .then(response => {
            let data = response.data;
             let wordsearchWords = []
            for(var row in data){
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
    .TrailMissions .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .card .card-title{
        font-size: 20px;
        margin-bottom: 30px
    }

    .TrailMissions h5,h6{
        display: flex;
        float: left;
    }

    .TrailMissions h6{
        margin-left: 18px
    }

    .card table{
        margin: 10px 18px 18px 18px;
        font-size: 17px;
        font-family: "Roboto", sans-serif;
        border-bottom: 1px solid #DEE2E6;
       
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
        max-width: 700px;
        padding: 15px;
    }

    .quiz-data a, .draganddrop-data a, .wefie-data a, .drawing-data a, .anagram-data a, .wordsearch-data a{
        text-decoration: none!important;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
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
