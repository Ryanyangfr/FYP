<template>
    <div class="EditWefie">
       <div class="card">
            <div class="card-title">
                <h5>Edit Wefie</h5>
            </div>
            <!--{{quiz}}-->
            <form @submit.prevent="wefieOnSubmitToEdit">
                <div class="edit-wefie-body">
                    <!--<div class="edit-wefie-input">
                        <label for="edit-wefie-title-input">Title</label>
                        <input name="edit-wefie-title-input" type="text" placeholder="Title" v-model="wefie_title"> 
                    </div>  -->
                    <div class="edit-wefie-input">
                        <label for="edit-wefie-title-input">Wefie Question</label>
                        <input name="edit-wefie-title-input" type="text" placeholder="Question" v-model="wefie_question"> 
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
            axios.post('//amazingtrail.ml/api/edit/editWefieQuestion', postBody)
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

<style scoped>
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

   .edit-wefie-input label{
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

    .edit-wefie-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .edit-wefie-input input{
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

    .edit-wefie-body{
        display: flex;
        flex-direction: column;
        width:100%;
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

     .EditWefie .submit-btn:hover{
        background-color: #5a52c4;
     }

     .EditWefie .cancel-btn{
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

    .EditWefie .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditWefie .cancel-btn a{
        text-decoration: none!important;
        color: white
    }


</style>
