<template>
    <div class="AddNarrative">
       <div class="card">
            <div class="card-title">
                <h5>Add New Narrative</h5>
            </div>
            <form @submit.prevent="narrativeOnSubmitToAdd" class="add-narrative-body">
                <div class="input-area">
                    <label for="add-narrative-input">Narrative Title</label>
                    <input name="add-narrative-input" type="text" placeholder="Title" v-model="title" required> 
                </div> 
                <div class="input-area">
                    <label for="add-trail-input">Narrative</label>
                    <textarea name="add-trail-input" rows="8" cols="65" type="text" placeholder="Type your narrative here" v-model="narrative" required></textarea>
                </div> 
                <div class="submit-btn-area">
                    <button class="cancel-btn" type="button"><router-link to='/viewNarrative'>Cancel</router-link></button>
                    <button class="submit-btn" type="submit">Create</button>
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
            narrative: "",
            title: "",
        }  
    },

    methods: {
        narrativeOnSubmitToAdd(){
          var postBody = {
                "narrative": this.narrative,
	            "title": this.title
            }
            axios.post('//127.0.0.1:3000/add/addNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/viewNarrative' })
            })
        }
    }      
        
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    /*card styling begins*/
    .AddNarrative .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .AddNarrative .card .card-title{
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .AddNarrative .card-title h5{
        display: flex;
        float: left;
    }

    .AddNarrative form{
        min-width: inherit;
        /*background-color: blue*/
    }
    /*card styling ends*/

    .AddNarrative .input-area{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
        /* background-color: pink */
    }

    .input-area label{
        margin-right: 100px;
        overflow: hidden;
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
        min-width: 13%
    }

    .AddNarrative .input-area input{
        /*margin-left: 100px;*/
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

    .AddNarrative .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .AddNarrative textarea{
        resize: none;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width: 75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .AddNarrative textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .add-narrative-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .AddNarrative .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .AddNarrative .submit-btn{
        /*display: inline;*/
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

     .AddNarrative .submit-btn:hover{
        background-color: #5a52c4;
     }


     .AddNarrative .cancel-btn{
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

    .AddNarrative .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .AddNarrative .cancel-btn a{
        text-decoration: none!important;
        color: white
    }
</style>
