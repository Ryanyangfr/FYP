<template>
    <div class="EditWefie">
       <div class="card">
            <div class="card-title">
                <h5>Edit Wefie</h5>
            </div>
            <!--{{quiz}}-->
            <form @submit.prevent="wefieOnSubmitToEdit">
                <div class="view-wefie-body">
                    <!--<div class="view-wefie-input">
                        <label for="edit-wefie-title-input">Title</label>
                        <input name="edit-wefie-title-input" type="text" placeholder="Title" v-model="wefie_title"> 
                    </div>  -->
                    <div class="view-wefie-input">
                        <label for="edit-wefie-title-input">Wefie Question</label>
                        <input name="edit-wefie-title-input" type="text" placeholder="Question" v-model="wefie_question"> 
                    </div>  
                    <div class="submit-btn-area">
                        <button class="submit-btn" type="submit">Submit</button>
                    </div>  
                </div>
  
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editWefie",
    data() {
        return{
            wefie_title: "",
            wefie_question: "",
            wefie_ID: 0
            
        }  
    },

    computed: {
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

    methods:{

        wefieOnSubmitToEdit() {
            var postBody = {
                "id": this.wefie_ID,
                "question": this.wefie_question,
            }

            // console.log(this.quiz);
            axios.post('http://54.255.245.23:3000/edit/editWefieQuestion', postBody)
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

        this.wefie_title = this.$store.state.selectedWefieTitle;
        this.wefie_ID = this.$store.state.selectedWefieID;
        this.wefie_question = this.$store.state.selectedWefieQuestion;
        
    }           
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .EditWefie .card{
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

   .view-wefie-input label{
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

    .view-wefie-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .view-wefie-input input{
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

    .view-wefie-body{
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
    }

    .EditWefie .submit-btn{
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
        margin-top: 50px;
    }

     .EditWefie .submit-btn:hover{
        background-color: #5a52c4;
     }


</style>
