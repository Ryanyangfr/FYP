<template>
    <div class="EditDrawing">
       <div class="card">
            <div class="card-title">
                <h5>Edit Drawing</h5>
            </div>
            <!--{{quiz}}-->
            <form @submit.prevent="drawingOnSubmitToEdit">
                <div class="edit-drawing-body">
                    <!--<div class="view-drawing-input">
                        <label for="edit-drawing-title-input">Title</label>
                        <input name="edit-drawing-title-input" type="text" placeholder="Title" v-model="drawing_title"> 
                    </div>  -->
                    <div class="edit-drawing-input">
                        <label for="edit-drawing-title-input">Drawing Question</label>
                        <input name="edit-drawing-title-input" type="text" placeholder="Question" v-model="drawing_question"> 
                    </div>  
                    <div class="submit-btn-area">
                        <router-link to='/mission'><button class="cancel-btn" type="button">Cancel</button></router-link>
                        <button class="submit-btn" type="submit">Save</button>
                    </div>  
                </div>
  
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editDrawing",
    data() {
        return{
            drawing_title: "",
            drawing_question: "",
            drawing_ID: 0
            
        }  
    },

    computed: {
         selectedDrawingTitle(){
            return this.$store.state.selectedDrawingTitle
        },

        selectedDrawingID(){
            return this.$store.state.selectedDrawingID
        },

        selectedDrawingQuestion(){
            return this.$store.state.selectedDrawingQuestion
        }

    }, 

    methods:{

        drawingOnSubmitToEdit() {
            var postBody = {
                "id": this.drawing_ID,
                "question": this.drawing_question,
            }

            // console.log(this.quiz);
            axios.post('//54.255.245.23:3000/edit/editDrawingQuestion', postBody)
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

        this.drawing_title = this.$store.state.selectedDrawingTitle;
        this.drawing_ID = this.$store.state.selectedDrawingID;
        console.log(this.drawing_ID);
        this.drawing_question = this.$store.state.selectedDrawingQuestion;
        
    }           
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .EditDrawing .card{
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

   .edit-drawing-input label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /* background-color: pink; */
        height: inherit;
        /*align-items: center;*/
        min-width: 11%

    }

    .edit-drawing-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .edit-drawing-input input{
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

    .edit-drawing-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .submit-btn-area{
        width: 100%;
    }

    .EditDrawing .submit-btn{
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
        font-size: 17px;
        color: white;
        margin-top: 50px;
    }

     .EditDrawing .submit-btn:hover{
        background-color: #5a52c4;
     }

     .EditDrawing .cancel-btn{
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

    .EditDrawing .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditDrawing .cancel-btn a{
        text-decoration: none!important;
        color: white
    }


</style>
